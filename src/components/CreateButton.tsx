import { useState } from "react";
import plus from "../assets/icons/plus.svg";
import { motion, AnimatePresence } from "framer-motion";
import useDrive from "../store/hooks/useDrive";
import useDirectory from "../store/hooks/useDirectory";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const CreateButton = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showNameError, setShowNameError] = useState(false);
  const [name, setName] = useState("");
  const [showNameModal, setShowNameModal] = useState(false);
  const { createNewFolder } = useDrive();
  const { directory } = useDirectory();

  const handleCreate = () => {
    if (!name) {
      toast.dismiss();
      toast.error("Please enter a name");
      return;
    }
    try {
      setShowNameError(false);
      createNewFolder({ path: directory, name });
      setShowNameModal(false);
      toast.dismiss();
      toast.success("Folder created successfully");
    } catch (error: any) {
      setShowNameError(true);
      if (error.message === "FILE_ALREADY_EXISTS") {
        toast.dismiss();
        toast.error(
          "A folder with this name already exists. Try a different name."
        );
        return;
      } else {
        toast.dismiss();
        toast.error("Something went wrong. Please try again.");
        return;
      }
    }
  };

  return (
    <div>
      <div
        onClick={() => setShowCreate(!showCreate)}
        className={` cursor-pointer flex items-center active:bg-gray-100 hover:bg-gray-100 duration-100 transition-all  border p-4  rounded-lg ${
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
              <Link
                to="/create"
                className="p-2 block hover:bg-gray-200 active:bg-gray-200 duration-200 rounded-lg "
              >
                Create text file
              </Link>
              <p
                onClick={() => setShowNameModal(true)}
                className="hover:bg-gray-200 active:bg-gray-200 duration-200 p-2 rounded-lg "
              >
                Create folder
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showNameModal && (
        <div className="h-screen w-screen fixed top-0 left-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-4/5 max-w-[300px]">
            <p className="mb-4">Please enter folder name: </p>
            <input
              type="text"
              placeholder="Enter folder name"
              className="w-full p-2 text-center bg-gray-200 rounded-lg"
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex text-sm font-semibold gap-4 mt-4">
              <button
                onClick={() => handleCreate()}
                className="bg-green-400 active:bg-green-500 hover:bg-green-500 duration-200 p-2 rounded-lg w-full"
              >
                Create folder
              </button>
              <button
                onClick={() => {
                  setShowNameModal(false);
                }}
                className="bg-red-400 active:bg-red-500 hover:bg-red-500 duration-200 p-2 rounded-lg "
              >
                Cancel
              </button>
            </div>

            {showNameError && (
              <p className="text-xs text-red-500 font-semibold mt-2 ">
                Name already exist, Please try with different name;
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateButton;
