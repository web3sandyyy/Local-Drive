import { useState } from "react";
import driveIcon from "../assets/icons/drive.svg";
import upload from "../assets/icons/upload.svg";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const [showCreate, setShowCreate] = useState(false);
  return (
    <div className="h-screen min-w-[250px] bg-grey-200">
      <div className="flex justify-center items-center gap-2 text-2xl font-bold mt-4 px-4 py-2 text-center">
        <p className="w-fit">Drive</p>
        <img src={driveIcon} alt="drive" className="w-6 h-6" />
      </div>

      <div className="mt-6 pl-4 text-lg flex flex-col overflow-hidden">
        <div
          onClick={() => setShowCreate(!showCreate)}
          className={`relative z-10 cursor-pointer flex gap-2 items-center bg-white hover:bg-gray-100 duration-100 transition-all group border p-4  rounded-lg ${
            showCreate ? "border-b-0 rounded-b-none bg-gray-100" : "shadow-md "
          }`}
        >
          <div
            className={`h-5 w-5 flex justify-center items-center group-hover:scale-110 duration-200 transition-all ${
              showCreate && "rotate-[135deg]"
            }`}
          >
            <div className="min-h-[3px] min-w-5 bg-zinc-500 rounded-full absolute"></div>
            <div className="w-[3px] min-h-5 bg-zinc-500 rounded-full absolute"></div>
          </div>

          <p className="font-semibold">Create</p>
        </div>

        <AnimatePresence>
          {showCreate && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="text-base flex flex-col divide-y border p-2 rounded-b-lg overflow-hidden cursor-pointer"
            >
              <p className="p-1">Create text file</p>
              <p className="p-1">Create folder</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex cursor-pointer gap-2 mt-2 items-center bg-white hover:bg-gray-100 duration-100 transition-all group border p-4 shadow-md rounded-lg">
          <img
            src={upload}
            alt="drive"
            className="w-7 h-7 group-hover:scale-110 duration-100 transition-all"
          />
          <p className="font-semibold">Upload</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
