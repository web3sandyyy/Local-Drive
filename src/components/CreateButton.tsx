import { useState } from "react";
import plus from "../assets/icons/plus.svg";
import { motion, AnimatePresence } from "framer-motion";

const CreateButton = () => {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div>
      <div
        onClick={() => setShowCreate(!showCreate)}
        className={` cursor-pointer flex items-center  hover:bg-gray-100 duration-100 transition-all  border p-4  rounded-lg ${
          showCreate
            ? "border-b-0 rounded-b-none bg-gray-100"
            : "shadow-md bg-white "
        }`}
      >
        <img
          src={plus}
          alt="plus"
          className={` w-8 h-8   duration-200 transition-all ${
            showCreate && "rotate-[135deg]"
          }`}
        />

        <p className="font-semibold">Create</p>
      </div>

      <AnimatePresence>
        {showCreate && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-base flex flex-col divide-y border rounded-b-lg overflow-hidden cursor-pointer shadow-md bg-white"
          >
            <div className="w-full p-2">
              <p className="p-2 hover:bg-gray-200 duration-200 rounded-lg ">
                Create text file
              </p>
              <p className="hover:bg-gray-200 duration-200 p-2 rounded-lg ">
                Create folder
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateButton;
