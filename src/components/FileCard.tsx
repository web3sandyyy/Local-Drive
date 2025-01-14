import { useState } from "react";
import { FileData } from "../types";
import dustbin from "../assets/icons/dustbin.svg";
import rename from "../assets/icons/rename.svg";
import { formatFileSize, formatTimestampToDate } from "../helper";
import { motion, AnimatePresence } from "framer-motion";

const FileCard = ({ file }: { file: FileData }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="w-full relative overflow-hidden">
      <div className="aspect-square border rounded-3xl p-2 overflow-hidden ">
        {file.type.startsWith("image/") && (
          <img
            src={file.content}
            alt={file.name}
            className="h-full w-full rounded-2xl object-cover object-center"
            onClick={() => showMore && setShowMore(false)}
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
        <p className="text-gray-500">{file.type || "Unknown"}</p>
      </div>

      <AnimatePresence mode="wait">
        {showMore && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 right-0 w-full h-fit bg-white border rounded-b-lg"
          >
            <div className="w-full p-2 flex flex-col divide-y-2">
              <div className="flex items-center hover:bg-gray-200 hover:rounded-md">
                <p className="p-1 ">Rename</p>
                <img src={rename} alt="rename" className="w-4 h-4" />
              </div>

              <div className="flex items-center hover:bg-gray-200 hover:rounded-md">
                <p className="p-1 text-red-600">Delete</p>
                <img src={dustbin} alt="delete" className="w-5 h-5" />
              </div>

              <div className="text-sm px-1 pt-1">
                <p>Details</p>
                <div className="text-gray-500">
                  <p>Name : {file.name}</p>
                  <p>Type : {file.type || "Unknown"}</p>
                  <p>Size : {file.size && formatFileSize(file.size)}</p>
                  <p>
                    Last Modified :{" "}
                    {file.lastModified &&
                      formatTimestampToDate(file.lastModified)}
                  </p>
                </div>
              </div>
            </div>
            <button
              className="bg-gray-200 w-full p-1 text-sm font-semibold rounded-b-lg"
              onClick={() => setShowMore(false)}
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileCard;
