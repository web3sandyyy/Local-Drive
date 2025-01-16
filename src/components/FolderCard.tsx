import { formatTimestampToDate } from "../helper";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import dustbin from "../assets/icons/dustbin.svg";
import rename from "../assets/icons/rename.svg";
import { FolderData, ItemKind } from "../types";
import FileCard from "./FileCard";
import useDrive from "../store/hooks/useDrive";

const FolderCard = ({ folder }: { folder: FolderData }) => {
  const [showMore, setShowMore] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  const [newName, setNewName] = useState(folder.name);
  const [showRename, setShowRename] = useState(false);

  const { delSingleFile, editFileName } = useDrive();

  const handleNameUpdate = () => {
    const id = folder.id;
    const name = newName;
    editFileName(id, name, folder.path, folder.itemKind);
    setShowRename(false);
    setShowMore(false);
  };

  return (
    <>
      <div className="w-full relative">
        <div onClick={() => setShowFiles(true)} className="w-full relative">
          <div className="w-full aspect-square rounded-2xl  md:rounded-3xl flex items-end">
            <div className="h-full w-1/2 bg-gray-200 rounded-l-2xl rounded-tr-2xl md:rounded-l-3xl md:rounded-tr-3xl"></div>

            <div className="h-full w-1/2 ">
              <div className="h-1/5 bg-gray-200 flex ">
                <div className="h-full w-1/2 bg-white rounded-bl-2xl  md:rounded-bl-3xl"></div>
                <div className="h-full w-1/2 bg-white"></div>
              </div>
              <div className="h-4/5 w-full bg-gray-200 rounded-r-2xl md:rounded-r-3xl"></div>
            </div>
          </div>

          <div className="h-[65%] shadow-md inset-shadow-lg absolute bottom-0 left-0 right-0 flex justify-center items-center w-full bg-white border rounded-2xl md:rounded-3xl">
            <p className="text-2xl font-black text-gray-600">
              {folder.children.length}
            </p>
          </div>
        </div>

        <div className="p-2 pb-0 text-sm">
          <div className="flex gap-1">
            <p className="font-semibold flex-grow truncate">{folder.name}</p>
            <div
              onClick={() => setShowMore(true)}
              className="flex items-center gap-[2px]"
            >
              <div className="bg-black rounded-full w-1 h-1 "></div>
              <div className="bg-black rounded-full w-1 h-1 "></div>
              <div className="bg-black rounded-full w-1 h-1 "></div>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {showMore && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.2 }}
              className="md:absolute fixed z-10 bottom-0 right-0 w-full h-fit bg-gray-200 md:bg-white border border-white md:border-gray-200 rounded-b-lg"
            >
              <div className="w-full p-2 flex flex-col divide-y-2 divide-white md:divide-gray-200 ">
                {showRename ? (
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full p-1 text-sm font-semibold border rounded-md mb-1"
                  />
                ) : (
                  <div
                    onClick={() => setShowRename(true)}
                    className="flex items-center hover:bg-gray-200 hover:rounded-md"
                  >
                    <p className="p-1 ">Rename</p>
                    <img src={rename} alt="rename" className="w-4 h-4" />
                  </div>
                )}

                <div
                  onClick={() => delSingleFile(folder.id)}
                  className="flex items-center hover:bg-gray-200 hover:rounded-md"
                >
                  <p className="p-1 text-red-600">Delete</p>
                  <img src={dustbin} alt="delete" className="w-5 h-5" />
                </div>

                <div className="text-sm px-1 pt-1">
                  <p>Details</p>
                  <div className="text-gray-500">
                    <p>Name : {folder.name}</p>
                    <p>
                      Last Modified :{" "}
                      {folder.lastModified &&
                        formatTimestampToDate(folder.lastModified)}
                    </p>
                    {folder.path && <p>Path : {folder.path}</p>}
                  </div>
                </div>
              </div>
              {showRename ? (
                <div className="flex rounded-b-lg">
                  <button
                    onClick={() => handleNameUpdate()}
                    className="w-full text-center p-2 md:p-1 text-sm font-semibold bg-green-500 rounded-bl-lg"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setShowRename(false);
                      setShowMore(false);
                    }}
                    className="w-full text-center p-2 md:p-1 text-sm font-semibold bg-red-500 rounded-br-lg"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="bg-white md:bg-gray-200 w-full p-2 md:p-1 text-sm font-semibold rounded-b-lg"
                  onClick={() => {
                    setShowRename(false);
                    setShowMore(false);
                  }}
                >
                  Close
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showFiles && (
        <div className="absolute z-10 bottom-0 right-0 h-full w-full bg-white flex flex-col rounded-lg">
          <p
            onClick={() => setShowFiles(false)}
            className=" w-fit font-semibold p-2 px-4 bg-gray-200 rounded-lg mt-2 ml-4"
          >
            Back
          </p>

          <div className="flex-grow w-full relative p-2  md:px-4 grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3  lg:grid-cols-4 overflow-auto bg-white">
            {folder.children.map((file, index) =>
              file.itemKind === ItemKind.FILE ? (
                <FileCard key={index} file={file} />
              ) : (
                <FolderCard key={index} folder={file} />
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FolderCard;
