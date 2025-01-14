import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { FileData } from "../../types";
import { addFile } from "../slices/driveSlice";

const useDrive = () => {
  const dispatch = useAppDispatch();
  const { files } = useAppSelector((state) => state.drive);

  const addNewFile = (newFile: FileData) => {
    dispatch(addFile(newFile));
  };

  return { files, addNewFile };
};

export default useDrive;
