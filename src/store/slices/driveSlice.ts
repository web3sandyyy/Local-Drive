import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DeleteItemProps,
  DriveItem,
  DriveState,
  FileData,
  FolderData,
  ItemKind,
  RenameFileProps,
} from "../../types";

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

    deleteItem(state, action: PayloadAction<DeleteItemProps>) {
      const { id, path } = action.payload;

      const deleteRecursively = (items: DriveItem[]): DriveItem[] => {
        return items
          .map((item) => {
            if (item.id === id && item.path === path) {
              return null;
            }

            if (item.itemKind === ItemKind.FOLDER) {
              return {
                ...item,
                children: deleteRecursively(item.children),
              } as FolderData;
            }

            return item;
          })
          .filter((item) => item !== null);
      };

      state.files = deleteRecursively(state.files);
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
  deleteItem,
  deleteAllFiles,
  renameFile,
} = driveSlice.actions;
export default driveSlice.reducer;
