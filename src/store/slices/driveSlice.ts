import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FileData } from '../../types'; 

interface DriveState {
  files: FileData[];
}

const initialState: DriveState = {
  files: [],
};

const driveSlice = createSlice({
  name: 'drive',
  initialState,
  reducers: {
    addFile(state, action: PayloadAction<FileData>) {
      state.files.push(action.payload);
    },
  },
});

export const { addFile } = driveSlice.actions;
export default driveSlice.reducer;
