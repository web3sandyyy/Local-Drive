import { useRef, useState } from "react";
import upload from "../assets/icons/upload.svg";
import plus from "../assets/icons/plus.svg";
import { motion, AnimatePresence } from "framer-motion";
import { FileData } from "../types";
import localforage from "localforage";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  directory?: string;
  webkitdirectory?: string;
}

const UploadButton = () => {
  const [showUpload, setShowUpload] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<FileData[]>([]);

  const handleFileRead = async (file: File): Promise<FileData> => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target?.result as string;
        const fileData: FileData = {
          name: file.name,
          type: file.type,
          size: file.size,
          lastModified: file.lastModified,
          content: content,
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

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const fileDataArray: FileData[] = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const fileData = await handleFileRead(file);
      fileDataArray.push(fileData);
    }

    const updatedFiles = [...files, ...fileDataArray];
    setFiles(updatedFiles);

    try {
      localforage.setItem(
        "files",
        JSON.stringify(updatedFiles),
        function (err) {
          if (err) {
            alert(err);
            console.log(err);
          } else {
            alert("completed");
          }
        }
      );
    } catch (error) {
      console.error("Error storing files in localStorage:", error);
      alert(
        "Error storing files. The files might be too large for localStorage."
      );
    }
  };

  return (
    <div>
      <div
        onClick={() => setShowUpload(!showUpload)}
        className={`mt-4 cursor-pointer flex items-center  hover:bg-gray-100 duration-100 transition-all  border p-4  rounded-lg ${
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
