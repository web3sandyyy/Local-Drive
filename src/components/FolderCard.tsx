import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import dustbin from "../assets/icons/dustbin.svg";
import rename from "../assets/icons/rename.svg";

const FolderCard = () => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="w-full relative">
      <div className="w-full relative">
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
          <p className="text-2xl font-black text-gray-600">+5</p>
        </div>
      </div>

      <div className="p-2 pb-0 text-sm">
        <div className="flex gap-1">
          <p className="font-semibold flex-grow truncate">folder name</p>
          <div
          onClick={()=>setShowMore(true)}
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
                {/* <div className="text-gray-500">
                  <p>Name : {file.name}</p>
                  <p>Size : {file.size && formatFileSize(file.size)}</p>
                  <p>
                    Last Modified :{" "}
                    {file.lastModified &&
                      formatTimestampToDate(file.lastModified)}
                  </p>
                </div> */}
              </div>
            </div>
            <button
              className="bg-white md:bg-gray-200 w-full p-2 md:p-1 text-sm font-semibold rounded-b-lg"
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

export default FolderCard;
