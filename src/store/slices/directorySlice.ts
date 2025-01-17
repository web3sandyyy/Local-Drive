import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DirectoryState } from "../../types";

const initialState: DirectoryState = {
  directory: [],
  selected: [],
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

    setSelected: (state, action: PayloadAction<string[]>) => {
      state.selected = action.payload;
    },
    pushSelected: (state, action: PayloadAction<string>) => {
      state.selected.push(action.payload);
    },
    popSelected: (state, action: PayloadAction<string>) => {
      const idToRemove = action.payload;

      const index = state.selected.findIndex((id) => id === idToRemove);

      if (index !== -1) {
        state.selected.splice(index, 1);
      }
    },
    resetSelected: (state) => {
      state.selected = [];
    },
  },
});

export const {
  setDirectory,
  pushDirectory,
  popDirectory,
  resetDirectory,
  setSelected,
  pushSelected,
  popSelected,
  resetSelected,
} = directorySlice.actions;
export default directorySlice.reducer;
