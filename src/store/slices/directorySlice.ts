import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DirectoryState } from "../../types";

const initialState: DirectoryState = {
  directory: [],
};

const directorySlice = createSlice({
  name: "directory",
  initialState,
  reducers: {
    setDirectory: (state, action: PayloadAction<string[]>) => {
      state.directory = action.payload;
    },

    pushDirectory: (state, action: PayloadAction<string>) => {
      state.directory.push(action.payload);
    },

    popDirectory: (state) => {
      state.directory.pop();
    },

    resetDirectory: (state) => {
      state.directory = [];
    },
  },
});

export const { setDirectory, pushDirectory, popDirectory, resetDirectory } =
  directorySlice.actions;
export default directorySlice.reducer;
