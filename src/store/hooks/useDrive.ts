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
  createFolder
} from "../slices/driveSlice";

const useDrive = () => {
  const dispatch = useAppDispatch();
  const { files } = useAppSelector((state) => state.drive);

  const addNewSingleFile = ({file, path} : {file: FileData, path: string[]}) => {
    dispatch(addSingleFile({ file, path }));
  };

  const addNewMultipleFiles = ({folder, path} : {folder: DriveItem[], path: string[]}) => {
    dispatch(addMultipleFiles({ folder, path }));
  };

  const createNewFolder = ({path, name} : {path: string[], name: string}) => {
    dispatch(createFolder({ name, path }));
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
    createNewFolder,
    delItem,
    delAllFiles,
    editFileName,
  };
};

export default useDrive;
