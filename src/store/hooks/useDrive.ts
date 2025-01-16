import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  FileData,
  DriveItem,
  RenameFileProps,
  DeleteItemProps,
} from "../../types";
import {
  addSingleFile,
  addMultipleFiles,
  deleteItem,
  deleteAllFiles,
  renameFile,
} from "../slices/driveSlice";

const useDrive = () => {
  const dispatch = useAppDispatch();
  const { files } = useAppSelector((state) => state.drive);

  const addNewSingleFile = (newFile: FileData) => {
    dispatch(addSingleFile(newFile));
  };

  const addNewMultipleFiles = (newFile: DriveItem[]) => {
    dispatch(addMultipleFiles(newFile));
  };

  const delItem = ({ id, path }: DeleteItemProps) => {
    dispatch(deleteItem({ id, path }));
  };

  const delAllFiles = () => {
    dispatch(deleteAllFiles());
  };

  const editFileName = ({ id, name, path, itemKind }: RenameFileProps) => {
    dispatch(renameFile({ id, name, path, itemKind }));
  };

  return {
    files,
    addNewSingleFile,
    addNewMultipleFiles,
    delItem,
    delAllFiles,
    editFileName,
  };
};

export default useDrive;
