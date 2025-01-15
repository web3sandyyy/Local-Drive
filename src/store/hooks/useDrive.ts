import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { FileData, DriveItem } from "../../types";
import { addSingleFile, addMultipleFiles, deleteSingleFile, deleteAllFiles, renameFile } from "../slices/driveSlice";

const useDrive = () => {
  const dispatch = useAppDispatch();
  const { files } = useAppSelector((state) => state.drive);

  const addNewSingleFile = (newFile: FileData) => {
    dispatch(addSingleFile(newFile));
  };

  const addNewMultipleFiles = (newFile: DriveItem[]) => {
    dispatch(addMultipleFiles(newFile));
  };

  const delSingleFile = (fileId: string) => {
    dispatch(deleteSingleFile(fileId));
  };

  const delAllFiles = () => {
    dispatch(deleteAllFiles());
  };

  const editFileName = (fileId: string, newName: string) => {
    dispatch(renameFile({ id: fileId, name: newName }));
  };

  return {
    files,
    addNewSingleFile,
    addNewMultipleFiles,
    delSingleFile,
    delAllFiles,
    editFileName,
  };
};

export default useDrive;
