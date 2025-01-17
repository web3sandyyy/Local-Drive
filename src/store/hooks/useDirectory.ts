import { useAppDispatch, useAppSelector } from "../../store/hooks";

import {
  setDirectory,
  pushDirectory,
  popDirectory,
  resetDirectory,
  setSelected,
  pushSelected,
  popSelected,  
  resetSelected,
} from "../slices/directorySlice";

const useDirectory = () => {
  const dispatch = useAppDispatch();
  const { directory, selected } = useAppSelector((state) => state.directory);

  const setNewDirector = (newDirectory: string[]) => {
    dispatch(setDirectory(newDirectory));
  };
  const pushNewDirectory = (directory: string) => {
    dispatch(pushDirectory(directory));
  };
  const popPreviousDirectory = () => {
    dispatch(popDirectory());
  };
  const reset = () => {
    dispatch(resetDirectory());
  };
  const setSelecteItem = (ids: string[]) => {
    dispatch(setSelected(ids));
  };
  const pushSelectedItem = (id: string) => {
    dispatch(pushSelected(id));
  };
  const popSelectedItem = (id: string) => {
    dispatch(popSelected(id));
  };
  const resetSelectedItem = () => {
    dispatch(resetSelected());
  };

  return {
    directory,
    selected,
    setNewDirector,
    pushNewDirectory,
    popPreviousDirectory,
    reset,
    setSelecteItem,
    pushSelectedItem,
    popSelectedItem,
    resetSelectedItem,
  };
};

export default useDirectory;
