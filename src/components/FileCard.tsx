import { useState } from "react";
import { FileData } from "../types";
import dustbin from "../assets/icons/dustbin.svg";
import rename from "../assets/icons/rename.svg";
import { formatFileSize, formatTimestampToDate } from "../helper";
import { motion, AnimatePresence } from "framer-motion";
import useDrive from "../store/hooks/useDrive";
import useDirectory from "../store/hooks/useDirectory";

const FileCard = ({ file }: { file: FileData }) => {
  const [showMore, setShowMore] = useState(false);
  const [showRename, setShowRename] = useState(false);
  const [newName, setNewName] = useState(file.name);
  const { delItem, editFileName } = useDrive();
  const { selected, pushSelectedItem, popSelectedItem } = useDirectory();

  const handleNameUpdate = () => {
    editFileName({
      id: file.id,
      name: newName,
      path: file.path,
      itemKind: file.itemKind,
    });
    setShowRename(false);
    setShowMore(false);
  };

  return (
    <div
      onClick={() => {
        if (selected.includes(file.id)) {
          popSelectedItem(file.id);
        } else {
          pushSelectedItem(file.id);
        }
      }}
      style={{
        backgroundColor: selected.includes(file.id) ? "#D1D5DB" : "",
      }}
      className="w-full h-fit relative overflow-hidden p-1 rounded-lg "
    >
      <div  className="aspect-square border rounded-3xl p-1 md:p-2 overflow-hidden ">
        {file.fileType.startsWith("image/") && (
          <img
            src={file.content}
            alt={file.name}
            className="h-full w-full rounded-2xl object-cover object-center"
            onClick={() => {
              if (showMore) {
                setShowMore(false);
                setShowRename(false);
              }
            }}
          />
        )}
      </div>

      <div className="p-2 pb-0 text-sm">
        <div className="flex gap-1">
          <p className="font-semibold flex-grow truncate">{file.name}</p>
          <div
            onClick={() => setShowMore(true)}
            className="flex items-center gap-[2px]"
          >
            <div className="bg-black rounded-full w-1 h-1 "></div>
            <div className="bg-black rounded-full w-1 h-1 "></div>
            <div className="bg-black rounded-full w-1 h-1 "></div>
          </div>
        </div>
        <p className="text-gray-500 w-full truncate">
          {file.fileType || "Unknown"}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {showMore && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.2 }}
            className="md:absolute fixed z-10 bottom-0 right-0 w-full h-fit bg-gray-200 md:bg-white border border-white md:border-gray-200 rounded-b-lg max-h-full overflow-auto"
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
                onClick={() => delItem({ id: file.id, path: file.path })}
                className="flex items-center hover:bg-gray-200 hover:rounded-md active:bg-gray-200 active:rounded-md"
              >
                <p className="p-1 text-red-600">Delete</p>
                <img src={dustbin} alt="delete" className="w-5 h-5" />
              </div>

              <div className="text-sm px-1 pt-1">
                <p>Details</p>
                <div className="text-gray-500">
                  <p>Name : {file.name}</p>
                  <p>Type : {file.fileType || "Unknown"}</p>
                  <p>Size : {file.size && formatFileSize(file.size)}</p>
                  {file.path && <p>Path : {file.path}</p>}
                  <p>
                    Last Modified :{" "}
                    {file.lastModified &&
                      formatTimestampToDate(file.lastModified)}
                  </p>
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
  );
};

export default FileCard;
