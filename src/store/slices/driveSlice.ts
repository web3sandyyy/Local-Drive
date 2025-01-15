import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DriveItem, FileData, FolderData } from "../../types";

interface DriveState {
  files: DriveItem[];
}

interface RenameFileProps {
  id: string;
  name: string;
}

const initialState: DriveState = {
  files: [],
};

const driveSlice = createSlice({
  name: "drive",
  initialState,
  reducers: {
    addSingleFile(state, action: PayloadAction<FileData>) {
      state.files.push(action.payload);
    },

    addMultipleFiles(state, action: PayloadAction<DriveItem[]>) {
      state.files.push(...action.payload);
    },

    deleteSingleFile(state, action: PayloadAction<string>) {
      const index = state.files.findIndex((file) => file.id === action.payload);
      state.files.splice(index, 1);
    },

    deleteAllFiles(state) {
      state.files = [];
    },

    renameFile(state, action: PayloadAction<RenameFileProps>) {
      const index = state.files.findIndex(
        (file) => file.id === action.payload.id
      );
      state.files[index].name = action.payload.name;
    },
  },
});

export const {
  addSingleFile,
  addMultipleFiles,
  deleteSingleFile,
  deleteAllFiles,
  renameFile,
} = driveSlice.actions;
export default driveSlice.reducer;
