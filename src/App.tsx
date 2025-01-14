import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { FileData } from "./types";
import localforage from "localforage";
import FileCard from "./components/FileCard";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [files, setFiles] = useState<FileData[]>([]);

  const loadFilesFromStorage = () => {
    localforage
      .getItem("files", function (err) {
        if (err) {
          console.error("Oh noes!");
        }
      })
      .then((value) => {
        if (value) {
          setFiles(JSON.parse(value));
        }
      });
  };

  useEffect(() => {
    loadFilesFromStorage();
  }, []);

  return (
    <div className="w-full min-h-screen md:flex">
      <Sidebar />

      <div className="w-full md:h-screen h-[calc(100vh-48px)] p-2 pt-0 md:pt-4 md:p-4 bg-gray-200">
        <div className="w-full h-full rounded-lg bg-white flex flex-col ">
          <div className="w-full h-fit px-2">
            <p className="text-sm font-semibold border-b p-2">Sort by Name</p>
          </div>

          <div className="flex-grow overflow-scroll rounded-b-lg">
            <div className="w-full min-h-fit mt-2 p-2  md:px-4 grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3  lg:grid-cols-4 overflow-auto ">
              {files.map((file, index) => (
                <FileCard key={index} file={file} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
