import { formatTimestampToDate } from "../helper";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import dustbin from "../assets/icons/dustbin.svg";
import rename from "../assets/icons/rename.svg";
import { FolderData, ItemKind } from "../types";
import FileCard from "./FileCard";
import useDrive from "../store/hooks/useDrive";
import useDirectory from "../store/hooks/useDirectory";
import angle from "../assets/icons/angle.svg";

const FolderCard = ({ folder }: { folder: FolderData }) => {
  const [showMore, setShowMore] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  const [newName, setNewName] = useState(folder.name);
  const [showRename, setShowRename] = useState(false);

  const { delItem, editFileName } = useDrive();
  const { directory, pushNewDirectory, popPreviousDirectory } = useDirectory();

  const handleNameUpdate = () => {
    const id = folder.id;
    const name = newName;
    editFileName({ id, name, path: folder.path, itemKind: folder.itemKind });
    setShowRename(false);
    setShowMore(false);
  };

  return (
    <>
      <div className="w-full h-fit relative">
        <div
          onClick={() => {
            setShowFiles(true);
            pushNewDirectory(folder.name);
          }}
          className="w-full relative"
        >
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
                    className="flex items-center hover:bg-gray-200 hover:rounded-md active:bg-gray-200 active:rounded-md"
                  >
                    <p className="p-1 ">Rename</p>
                    <img src={rename} alt="rename" className="w-4 h-4" />
                  </div>
                )}

                <div
                  onClick={() => delItem({ id: folder.id, path: folder.path })}
                  className="flex items-center hover:bg-gray-200 hover:rounded-md active:bg-gray-200 active:rounded-md"
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
        <div className="absolute z-10 top-0 bottom-0 right-0 max-h-full h-full w-full overflow-auto bg-white flex flex-col rounded-lg" >
          <div className="h-full w-full flex flex-col">
            <div className="w-full pl-2 flex border-b items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "auto" }}
                  exit={{ width: "0%" }}
                  transition={{ duration: 0.2 }}
                  onClick={() => {
                    setShowFiles(false);
                    popPreviousDirectory();
                  }}
                  className="flex items-center w-fit h-fit font-semibold  gap-1 bg-gray-200 rounded-lg p-1 overflow-hidden"
                >
                  <img src={angle} alt="angle" className="w-4 h-4 ml-2" />
                  <p className="text-sm  pr-3">Back</p>
                </motion.div>

                {directory.length > 0 && (
                  <div className="flex items-center border-2 px-2 rounded-md">
                    {directory.map((dir, index) => (
                      <div className="flex items-center" key={index}>
                        <p>{dir}</p>
                        {index < directory.length - 1 && (
                          <img
                            src={angle}
                            alt="angle"
                            className="w-4 h-4 rotate-180 mx-1"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <p className="text-sm font-semibold p-2 ">Sort by Name</p>
            </div>

            <div style={{position: directory[-1] === folder.name ? "relative" : "static"}} className="flex-grow w-full h-full p-2  md:px-4 grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3  lg:grid-cols-4 overflow-auto bg-white">
              {folder.children.map((file, index) =>
                file.itemKind === ItemKind.FILE ? (
                  <FileCard key={index} file={file} />
                ) : (
                  <FolderCard key={index} folder={file} />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FolderCard;
