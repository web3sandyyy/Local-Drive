import { useState } from "react";
import { FileData } from "../types";
import { AnimatePresence } from "framer-motion";
import ShowMoreData from "./ShowMoreData";

const FileCard = ({ file }: { file: FileData }) => {
  const [showMore, setShowMore] = useState(false);

  const handleClose = () => {
    setShowMore(false);
  };

  return (
    <div className="w-full h-fit relative overflow-hidden">
      <div className="aspect-square border rounded-3xl p-1 md:p-2 overflow-hidden ">
        {file.fileType.startsWith("image/") && (
          <img
            src={file.content}
            alt={file.name}
            className="h-full w-full rounded-2xl object-cover object-center"
            onClick={() => {
              if (showMore) {
                setShowMore(false);
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
        {showMore && <ShowMoreData item={file} onClose={handleClose} />}
      </AnimatePresence>
    </div>
  );
};

export default FileCard;
