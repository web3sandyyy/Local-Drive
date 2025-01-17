import { useState } from "react";
import { motion } from "framer-motion";
import { FileData, FolderData, ItemKind } from "../types";
import useDrive from "../store/hooks/useDrive";
import toast from "react-hot-toast";
import dustbin from "../assets/icons/dustbin.svg";
import rename from "../assets/icons/rename.svg";
import { formatFileSize, formatTimestampToDate } from "../helper";

interface ShowMoreDataProps {
  item: FileData | FolderData;
  onClose(): void;
}

const ShowMoreData = ({ item, onClose }: ShowMoreDataProps) => {
  const [showRename, setShowRename] = useState(false);
  const [newName, setNewName] = useState(item.name);
  const { delItem, editFileName } = useDrive();

  const handleNameUpdate = () => {
    if (!newName) {
      toast.dismiss();
      toast.error("Please enter a name");
      return;
    }

    if (item.name === newName) {
      toast.dismiss();
      toast.error("Please change the name");
      return;
    }
    editFileName({
      id: item.id,
      name: newName,
      path: item.path,
      itemKind: item.itemKind,
    });
    toast.dismiss();
    toast.success("File renamed successfully");
    setShowRename(false);
    onClose();
  };

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.2 }}
      key={item.id}
      className="md:absolute fixed z-10 bottom-0 right-0 w-full h-fit bg-gray-200 md:bg-white border border-white md:border-gray-200 rounded-b-lg max-h-full overflow-auto"
    >
      <div className="w-full p-2 flex flex-col divide-y-2 divide-white md:divide-gray-200 ">
        {showRename ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full p-1 text-sm font-semibold border rounded-md mb-1"
          />
        ) : (
          <div
            onClick={() => setShowRename(true)}
            className="flex items-center hover:bg-gray-200 hover:rounded-md active:bg-gray-200 active:rounded-md"
          >
            <p className="p-1 ">Rename</p>
            <img src={rename} alt="rename" className="w-4 h-4" />
          </div>
        )}

        <div
          onClick={() => delItem({ id: item.id, path: item.path })}
          className="flex items-center hover:bg-gray-200 hover:rounded-md active:bg-gray-200 active:rounded-md"
        >
          <p className="p-1 text-red-600">Delete</p>
          <img src={dustbin} alt="delete" className="w-5 h-5" />
        </div>

        <div className="text-sm px-1 pt-1">
          <p>Details</p>
          <div className="text-gray-500">
            <p>Name : {item.name}</p>
            {item.itemKind === ItemKind.FILE && (
              <>
                <p>Type : {item.fileType || "Unknown"}</p>
                <p>Size : {item.size && formatFileSize(item.size)}</p>
              </>
            )}
            {item.path && <p>Path : {item.path}</p>}
            <p>
              Last Modified :{" "}
              {item.lastModified && formatTimestampToDate(item.lastModified)}
            </p>
          </div>
        </div>
      </div>
      {showRename ? (
        <div className="flex rounded-b-lg">
          <button
            onClick={() => handleNameUpdate()}
            className="w-full text-center p-2 md:p-1 text-sm font-semibold bg-green-500 rounded-bl-lg"
          >
            Save
          </button>
          <button
            onClick={() => {
              setShowRename(false);
              onClose();
            }}
            className="w-full text-center p-2 md:p-1 text-sm font-semibold bg-red-500 rounded-br-lg"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          className="bg-white md:bg-gray-200 w-full p-2 md:p-1 text-sm font-semibold rounded-b-lg"
          onClick={() => {
            onClose();
            setShowRename(false);
          }}
        >
          Close
        </button>
      )}
    </motion.div>
  );
};

export default ShowMoreData;
