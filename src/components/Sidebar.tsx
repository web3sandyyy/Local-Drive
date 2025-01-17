import driveIcon from "../assets/driveIcon.png";
import CreateButton from "./CreateButton";
import UploadButton from "./UploadButton";
import menuIcon from "../assets/icons/menu.svg";
import { AnimatePresence, motion } from "framer-motion";

interface SidebarProps {
  showMenu: boolean;
  toggleMenu: () => void;
}

const Sidebar = ({ showMenu, toggleMenu }: SidebarProps) => {

  return (
    <>
      <div className="hidden md:inline h-screen min-w-[150px] max-w-[250px] w-[30%] bg-gray-200">
        <div className="flex justify-center items-center gap-2 text-2xl font-bold mt-2 px-4 py-2 text-center">
          <p className="w-fit">Drive</p>
          <img src={driveIcon} alt="drive" className="w-8 h-8" />
        </div>

        <div className="mt-4 ml-4 text-lg flex flex-col shadow-bottom-only overflow-hidden rounded-lg">
          <CreateButton />
          <UploadButton />
        </div>
      </div>

      <div className="md:hidden flex justify-center items-center gap-2 text-2xl font-bold px-4 py-2 text-center bg-gray-200">
        <p className="w-fit">Drive</p>
        <img src={driveIcon} alt="drive" className="w-8 h-8" />
        <img
          onClick={() => toggleMenu()}
          src={menuIcon}
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
            onClick={() => toggleMenu()}
            className="md:hidden block fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 z-50"
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
                <img src={driveIcon} alt="drive" className="w-8 h-8" />
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
