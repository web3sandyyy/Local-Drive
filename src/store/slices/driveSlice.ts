import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DriveItem, FileData, FolderData, ItemKind } from "../../types";

interface DriveState {
  files: DriveItem[];
}

interface RenameFileProps {
  id: string;
  name: string;
  path: string;
  itemKind: ItemKind;
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
      if (index === -1) {
        console.log("File not found");
        return;
      }
      state.files.splice(index, 1);
    },

    deleteAllFiles(state) {
      state.files = [];
    },

    renameFile(state, action: PayloadAction<RenameFileProps>) {
      const { id, path, name, itemKind } = action.payload;

      const updateChildPaths = (
        children: DriveItem[],
        parentPath: string
      ): DriveItem[] => {
        return children.map((child) => {
          const updatedPath = `${parentPath}/${child.name}`;
          if (child.itemKind === ItemKind.FOLDER) {
            return {
              ...child,
              path: updatedPath,
              children: updateChildPaths(child.children, updatedPath),
            } as FolderData;
          }
          return { ...child, path: updatedPath } as FileData;
        });
      };

      const renameRecursively = (items: DriveItem[]): DriveItem[] => {
        return items.map((item) => {
          if (
            item.id === id &&
            item.path === path &&
            item.itemKind === itemKind
          ) {
            if (itemKind === ItemKind.FILE) {
              const parentPath =
                path?.substring(0, path.lastIndexOf("/")) || null;
              const updatedPath = parentPath ? `${parentPath}/${name}` : name;
              return {
                ...item,
                name,
                path: updatedPath,
              } as FileData;
            } else if (itemKind === ItemKind.FOLDER) {
              const parentPath =
                path?.substring(0, path.lastIndexOf("/")) || null;
              const updatedPath = parentPath ? `${parentPath}/${name}` : name;
              return {
                ...item,
                name,
                path: updatedPath,
                children: updateChildPaths(item.children, updatedPath),
              } as FolderData;
            }
          }

          if (item.itemKind === ItemKind.FOLDER) {
            return {
              ...item,
              children: renameRecursively(item.children),
            } as FolderData;
          }

          return item;
        });
      };

      state.files = renameRecursively(state.files);
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
