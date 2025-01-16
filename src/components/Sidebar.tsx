import { useState } from "react";
import driveIcon from "../assets/icons/drive.svg";
import CreateButton from "./CreateButton";
import UploadButton from "./UploadButton";
import menu from "../assets/icons/menu.svg";
import { AnimatePresence, motion } from "framer-motion";
import useDirectory from "../store/hooks/useDirectory";

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { directory } = useDirectory();
  return (
    <>
      <div className="hidden md:inline h-screen min-w-[150px] max-w-[250px] w-[30%] bg-gray-200">
        <div className="flex justify-center items-center gap-2 text-2xl font-bold mt-2 px-4 py-2 text-center">
          <p className="w-fit">Drive</p>
          <img src={driveIcon} alt="drive" className="w-6 h-6" />
        </div>

        <div className="mt-4 ml-4 text-lg flex flex-col shadow-bottom-only overflow-hidden rounded-lg">
          <CreateButton />
          <UploadButton />
          <p onClick={() => console.log(directory)}>director</p>
        </div>
      </div>

      <div className="md:hidden flex justify-center items-center gap-2 text-2xl font-bold px-4 py-2 text-center bg-gray-200">
        <p className="w-fit">Drive</p>
        <img src={driveIcon} alt="drive" className="w-6 h-6" />
        <img
          onClick={() => setShowMenu(true)}
          src={menu}
          alt="menu"
          className="w-6 h-6 absolute left-4"
        />
      </div>

      <AnimatePresence mode="wait">
        {showMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowMenu(false)}
            className="md:hidden block fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 z-10"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="h-full w-4/5 max-w-[300px] bg-gray-200"
            >
              <div className="flex justify-center items-center gap-2 text-xl font-bold p-4 ">
                <p className="w-fit">Drive</p>
                <img src={driveIcon} alt="drive" className="w-6 h-6" />
              </div>
              <div className="px-2 mt-4">
                <CreateButton />
                <UploadButton />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
