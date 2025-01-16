import "./App.css";
import Sidebar from "./components/Sidebar";
import FileCard from "./components/FileCard";
import FolderCard from "./components/FolderCard";
import useDrive from "./store/hooks/useDrive";
import { ItemKind } from "./types";

function App() {
  const { files } = useDrive();

  return (
    <div className="w-full min-h-screen md:flex">
      <Sidebar />

      <div className="w-full md:h-screen h-[calc(100vh-48px)] p-2 pt-0 md:pt-4 md:p-4 bg-gray-200">
        <div className="w-full h-full rounded-lg bg-white flex flex-col relative">
          <div className="w-full h-fit px-2">
            <p className="text-sm font-semibold border-b p-2 text-right">Sort by Name</p>
          </div>

          <div className="flex-grow overflow-scroll rounded-b-lg ">
            <div className="w-full min-h-fit mt-2 p-2  md:px-4 grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3  lg:grid-cols-4 overflow-auto ">
              {files.map((file, index) =>
                file.itemKind === ItemKind.FILE ? (
                  <FileCard key={index} file={file} />
                ) : (
                  <FolderCard key={index} folder={file} />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
