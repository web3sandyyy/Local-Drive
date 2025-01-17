import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FolderData, ItemKind } from "../types";
import FileCard from "./FileCard";
import useDirectory from "../store/hooks/useDirectory";
import angle from "../assets/icons/angle.svg";
import ShowMoreData from "./ShowMoreData";
import emptyIcon from "../assets/emptyFolder.png";

const FolderCard = ({ folder }: { folder: FolderData }) => {
  const [showMore, setShowMore] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  const { directory, pushNewDirectory, popPreviousDirectory } = useDirectory();

  const handleClose = () => {
    setShowMore(false);
  };

  return (
    <>
      <div className="w-full h-fit relative">
        <div
          onDoubleClick={() => {
            setShowFiles(true);
            pushNewDirectory(folder.name);
          }}
          onTouchStart={() => {
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
          {showMore && <ShowMoreData item={folder} onClose={handleClose} />}
        </AnimatePresence>
      </div>

      {showFiles && (
        <div className="absolute z-10 top-0 bottom-0 right-0 max-h-full w-full  bg-white flex flex-col rounded-lg">
          <div className="h-full w-full flex flex-col rounded-b-lg">
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

            <div
              style={{
                position: directory[-1] === folder.name ? "relative" : "static",
              }}
              className="flex-grow w-full  p-2  md:px-4  overflow-auto bg-white rounded-b-lg"
            >
              {folder.children.length > 1 ? (
                <div className="h-fit w-full grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3  lg:grid-cols-4">
                  {folder.children.map((file, index) =>
                    file.itemKind === ItemKind.FILE ? (
                      <FileCard key={index} file={file} />
                    ) : (
                      <FolderCard key={index} folder={file} />
                    )
                  )}
                </div>
              ) : (
                <div className="h-full w-full flex justify-center items-center">
                  <div className="w-4/5 max-w-[300px]">
                    <img src={emptyIcon} className="object-scale-down" />
                    <p className="text-center text-lg md:text-xl font-bold">
                      No files found
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FolderCard;
