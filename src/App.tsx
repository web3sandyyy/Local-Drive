import "./App.css";
import Sidebar from "./components/Sidebar";
import FileCard from "./components/FileCard";
import FolderCard from "./components/FolderCard";
import useDrive from "./store/hooks/useDrive";
import { ItemKind } from "./types";
import emptyIcon from "./assets/emptyFolder.png";
import { useState } from "react";

function App() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const { files } = useDrive();

  return (
    <div className="w-full min-h-screen md:flex">
      <Sidebar showMenu={showMenu} toggleMenu={toggleMenu} />

      <div className="w-full md:h-screen h-[calc(100vh-48px)] p-2 pt-0 md:pt-4 md:p-4 bg-gray-200">
        <div className="w-full h-full rounded-lg bg-white flex flex-col relative">
          <div className="w-full h-fit px-2">
            <p className="text-sm font-semibold border-b p-2 text-right">
              {files && files.length && `Total: ${files.length}`}
            </p>
          </div>

          <div className="flex-grow overflow-scroll rounded-b-lg ">
            {files.length > 0 ? (
              <div className="w-full min-h-fit mt-2 p-2  md:px-4 grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3  lg:grid-cols-4 overflow-auto ">
                {files.map((file, index) =>
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
                    No files found,{" "}
                    <span className="hidden md:inline">Try adding!</span>
                    <span
                      onClick={toggleMenu}
                      className="p-2 px-3 bg-gray-200 rounded md:hidden"
                    >
                      Add!
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
