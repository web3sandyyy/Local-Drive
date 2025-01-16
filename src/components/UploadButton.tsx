import { useRef, useState } from "react";
import upload from "../assets/icons/upload.svg";
import plus from "../assets/icons/plus.svg";
import { motion, AnimatePresence } from "framer-motion";
import { FileData, ItemKind } from "../types";
import useDrive from "../store/hooks/useDrive";
import { v4 as uuidv4 } from "uuid";
import { DriveItem, FolderData } from "../types";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  directory?: string;
  webkitdirectory?: string;
}

const UploadButton = () => {
  const [showUpload, setShowUpload] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { addNewSingleFile, addNewMultipleFiles } = useDrive();

  const handleFileRead = async (
    file: File,
    path: string = ""
  ): Promise<FileData> => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target?.result as string;
        const fileData: FileData = {
          id: uuidv4(),
          name: file.name,
          fileType: file.type,
          size: file.size,
          lastModified: file.lastModified,
          content: content,
          itemKind: ItemKind.FILE,
          path: path,
        };
        resolve(fileData);
      };

      if (
        file.type.startsWith("image/") ||
        file.type.startsWith("application/")
      ) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
    });
  };

  const createFolderStructure = (files: FileData[]): DriveItem[] => {
    const root: DriveItem[] = [];
    const folderMap = new Map<string, FolderData>();

    files.forEach((file) => {
      const pathParts = file.path.split("/").filter(Boolean);
      let currentPath = "";

      pathParts.forEach((part, index) => {
        const isLast = index === pathParts.length - 1;
        currentPath = currentPath ? `${currentPath}/${part}` : part;

        if (!isLast && !folderMap.has(currentPath)) {
          const folderData: FolderData = {
            id: uuidv4(),
            name: part,
            itemKind: ItemKind.FOLDER,
            lastModified: Date.now(),
            children: [],
            path: currentPath,
          };
          folderMap.set(currentPath, folderData);
        }
      });
    });

    files.forEach((file) => {
      const pathParts = file.path.split("/").filter(Boolean);
      const fileName = pathParts.pop()!;
      const folderPath = pathParts.join("/");

      if (folderPath) {
        const parentFolder = folderMap.get(folderPath);
        if (parentFolder) {
          parentFolder.children.push(file);
        }
      } else {
        root.push(file);
      }
    });

    folderMap.forEach((folder) => {
      const pathParts = folder.path.split("/").filter(Boolean);
      pathParts.pop();
      const parentPath = pathParts.join("/");

      if (parentPath) {
        const parentFolder = folderMap.get(parentPath);
        if (parentFolder) {
          parentFolder.children.push(folder);
        }
      } else {
        root.push(folder);
      }
    });

    return root;
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    try {
      const fileDataArray: FileData[] = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const path = (file as any).webkitRelativePath || "";
        const fileData = await handleFileRead(file, path);
        fileDataArray.push(fileData);
      }

      if (fileDataArray.length === 1 && !fileDataArray[0].path) {
        addNewSingleFile(fileDataArray[0]);
      } else {
        const organizedStructure = createFolderStructure(fileDataArray);
        addNewMultipleFiles(organizedStructure);
      }
    } catch (error) {
      console.error("Error storing files", error);
      alert(
        "Error storing files. The files might be too large for localStorage."
      );
    }
  };

  return (
    <div>
      <div
        onClick={() => setShowUpload(!showUpload)}
        className={`mt-2 md:mt-4 cursor-pointer flex items-center  hover:bg-gray-100 duration-100 transition-all  border p-4  rounded-lg ${
          showUpload
            ? "border-b-0 rounded-b-none bg-gray-100"
            : "shadow-md bg-white "
        }`}
      >
        <div
          className="relative h-8 w-8 cursor-pointer"
          onClick={() => setShowUpload(!showUpload)}
        >
          <AnimatePresence mode="wait">
            {!showUpload ? (
              <motion.img
                key="upload"
                src={upload}
                alt="upload"
                className="w-7 h-7 m-auto"
                initial={{ opacity: 0, rotate: 135 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 135 }}
                transition={{ duration: 0.1 }}
              />
            ) : (
              <motion.img
                key="plus"
                src={plus}
                alt="plus"
                className="w-8 h-8 absolute top-0 right-0 "
                initial={{ opacity: 0, rotate: -135 }}
                animate={{ opacity: 1, rotate: -45 }}
                exit={{ opacity: 0, rotate: -135 }}
                transition={{ duration: 0.1 }}
              />
            )}
          </AnimatePresence>
        </div>

        <p className="font-semibold">Upload</p>
      </div>

      <AnimatePresence mode="wait">
        {showUpload && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-base flex flex-col divide-y border rounded-b-lg overflow-hidden  bg-white"
          >
            <div className="w-full p-2 ">
              <div className="relative hover:bg-gray-200 duration-200 rounded-lg  ">
                <p className="p-2">Upload file</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  accept="*/*"
                  className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                />
              </div>

              <div className="relative w-full hover:bg-gray-200 duration-200 rounded-lg ">
                <p className="p-2">Upload folder</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  accept="*/*"
                  {...({ webkitdirectory: "" } as CustomInputProps)}
                  className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadButton;
