import driveIcon from "../assets/icons/drive.svg";
import CreateButton from "./CreateButton";
import UploadButton from "./UploadButton";

const Sidebar = () => {
  return (
    <div className="h-screen min-w-[250px] bg-gray-200">
      <div className="flex justify-center items-center gap-2 text-2xl font-bold mt-4 px-4 py-2 text-center">
        <p className="w-fit">Drive</p>
        <img src={driveIcon} alt="drive" className="w-6 h-6" />
      </div>

      <div className="mt-6 ml-4 text-lg flex flex-col shadow-bottom-only overflow-hidden rounded-lg">
        <CreateButton />
        <UploadButton />
      </div>
    </div>
  );
};

export default Sidebar;
