import { useEffect, useState } from "react";
import "./App.css";
// import File from "./components/File";
// import Folder from "./components/Folder";
import Sidebar from "./components/Sidebar";
import { FileData } from "./types";

function App() {
  const [files, setFiles] = useState<FileData[]>([]);

  const loadFilesFromStorage = () => {
    const storedFiles = localStorage.getItem("uploadedFiles");

    if (storedFiles) {
      setFiles(JSON.parse(storedFiles));
    }
  };

  useEffect(() => {
    loadFilesFromStorage();
  }, []);

  return (
    <div className="w-full min-h-screen flex">
      <Sidebar />
      <div className="w-full h-screen p-4 bg-gray-200">
        <div className="w-full h-full rounded-lg bg-white flex flex-col max-h-full">
          <div className="w-full h-fit px-2">
            <p className="text-sm font-semibold border-b p-2">Sort by Name</p>
          </div>

          <div className="w-full flex-grow mt-2 p-2 px-4 grid grid-cols-4 gap-4 overflow-auto">
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li key={index} className="p-2 border rounded">
                  <p>Name: {file.name}</p>
                  <p>Type: {file.type || "Unknown"}</p>
                  <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
                  {file.type.startsWith("image/") && (
                    <img
                      src={file.content}
                      alt={file.name}
                      className="mt-2 max-w-xs"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
