import { useAppDispatch, useAppSelector } from "../../store/hooks";

import {
  setDirectory,
  pushDirectory,
  popDirectory,
  resetDirectory,
} from "../slices/directorySlice";

const useDirectory = () => {
  const dispatch = useAppDispatch();
  const { directory } = useAppSelector((state) => state.directory);

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

  return {
    directory,
    setNewDirector,
    pushNewDirectory,
    popPreviousDirectory,
    reset,
  };
};

export default useDirectory;
