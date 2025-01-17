import { Link } from "react-router-dom";
import renameIcon from "../assets/icons/rename.svg";
import { useState } from "react";
import useDirectory from "../store/hooks/useDirectory";
import useDrive from "../store/hooks/useDrive";
import { FileData, ItemKind } from "../types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { findItemAtPath } from "../helper";

const CreateFile = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const { directory } = useDirectory();
  const { files, addNewSingleFile } = useDrive();
  const navigate = useNavigate();

  const checkIfFileExists = () => {
    const parentFolder =
      directory.length === 0
        ? { children: files }
        : findItemAtPath(files, directory);

    if (
      parentFolder &&
      "children" in parentFolder &&
      parentFolder.children.some(
        (child) =>
          child.name === `${name}.txt` && child.itemKind === ItemKind.FILE
      )
    ) {
      throw new Error("FILE_ALREADY_EXISTS");
    }
  };

  const handleCreate = () => {
    if (!name.trim()) {
      toast.error("File name cannot be empty!");
      return;
    }

    if (!content.trim()) {
      toast.error("File cannot be empty!");
      return;
    }

    try {
      checkIfFileExists();
    } catch (error) {
      toast.error("File with this name already exists");
      console.error("Error checking if file exists:", error);
      return;
    }

    const file: FileData = {
      id: crypto.randomUUID(),
      name: name.trim().endsWith(".txt") ? name.trim() : `${name.trim()}.txt`,
      fileType: "text/plain",
      size: content.length,
      content,
      lastModified: Date.now(),
      path: directory.join("/"),
      itemKind: ItemKind.FILE,
    };

    addNewSingleFile({ file, path: directory });
    toast.success("File created successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-[100dvh] w-full p-4 flex bg-gray-200">
      <div className="w-full md:w-4/5 lg:w-3/5 mx-auto flex flex-col border-2 border-black p-2 rounded-lg bg-white">
        <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-center w-full text-sm font-semibold">
          <div className="flex items-center w-full md:w-fit bg-gray-200 rounded-lg">
            <img src={renameIcon} alt="rename" className="w-5 h-5 ml-2" />
            <input
              type="text"
              placeholder="Enter file name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-gray-200 rounded-r-lg focus:outline-none"
            />
          </div>

          <div className="flex gap-2 w-full md:w-fit">
            <button
              onClick={handleCreate}
              className="bg-green-400 active:bg-green-500 hover:bg-green-500 duration-200 p-2 px-3 rounded-lg w-full md:w-fit"
            >
              Create file
            </button>
            <Link
              to="/"
              className="bg-red-400 active:bg-red-500 hover:bg-red-500 duration-200 p-2 px-3 rounded-lg w-full md:w-fit text-center"
            >
              Cancel
            </Link>
          </div>
        </div>
        <div
          contentEditable
          className="flex-grow mt-2 border-t p-2 focus:outline-none"
          onInput={(e) => setContent(e.currentTarget.textContent || "")}
        ></div>
      </div>
    </div>
  );
};

export default CreateFile;
