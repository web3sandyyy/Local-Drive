import "./App.css";
import File from "./components/File";
import Folder from "./components/Folder";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="w-full min-h-screen flex">
      <Sidebar />
      <div className="w-full h-screen p-4 bg-gray-200">
        <div className="w-full h-full rounded-lg bg-white flex flex-col max-h-full">
          <div className="w-full h-fit px-2">
            <p className="text-sm font-semibold border-b p-2">
              Sort by Name
            </p>
          </div>

          <div className="w-full flex-grow mt-2 p-2 px-4 grid grid-cols-4 gap-4 overflow-auto">
            <File />
            <File />
            <Folder/>
            <File />
            <File />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
