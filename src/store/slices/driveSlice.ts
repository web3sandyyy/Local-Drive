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
import { v4 as uuidv4 } from "uuid";

const initialState: DriveState = {
  files: [],
};

const addItemAtPath = (
  items: DriveItem[],
  path: string[],
  newItem: DriveItem
): DriveItem[] => {
  if (path.length === 0) {
    return [...items, newItem];
  }

  return items.map((item) => {
    if (item.itemKind === ItemKind.FOLDER && item.name === path[0]) {
      return {
        ...item,
        children: addItemAtPath(item.children, path.slice(1), newItem),
      };
    }
    return item;
  });
};

const findItemAtPath = (
  items: DriveItem[],
  path: string[]
): FolderData | null => {
  let current = items;

  for (const segment of path) {
    const next = current.find(
      (item) => item.name === segment && item.itemKind === ItemKind.FOLDER
    );
    if (next && next.itemKind === ItemKind.FOLDER) {
      current = next.children;
    } else {
      return null;
    }
  }

  return current as unknown as FolderData;
};

const driveSlice = createSlice({
  name: "drive",
  initialState,
  reducers: {
    addSingleFile(
      state,
      action: PayloadAction<{ file: FileData; path: string[] }>
    ) {
      const { file, path } = action.payload;
      state.files = addItemAtPath(state.files, path, file);
    },

    addMultipleFiles(
      state,
      action: PayloadAction<{ folder: DriveItem[]; path: string[] }>
    ) {
      const { folder, path } = action.payload;
      folder.forEach((file) => {
        state.files = addItemAtPath(state.files, path, file);
      });
    },

    createFolder(
      state,
      action: PayloadAction<{ path: string[]; name: string }>
    ) {
      const { path, name } = action.payload;

      const parentFolder =
        path.length === 0
          ? { children: state.files }
          : findItemAtPath(state.files, path);

      if (
        parentFolder &&
        "children" in parentFolder &&
        parentFolder.children.some(
          (child) => child.name === name && child.itemKind === ItemKind.FOLDER
        )
      ) {
        throw new Error("FILE_ALREADY_EXISTS");
      }

      state.files = addItemAtPath(state.files, path, {
        id: uuidv4(),
        name,
        itemKind: ItemKind.FOLDER,
        lastModified: Date.now(),
        path: path.join("/"),
        children: [],
      });
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
            const parentPath =
              path?.substring(0, path.lastIndexOf("/")) || null;
            const updatedPath = parentPath ? `${parentPath}/${name}` : name;
            if (itemKind === ItemKind.FILE) {
              return {
                ...item,
                name,
                path: updatedPath,
              } as FileData;
            } else if (itemKind === ItemKind.FOLDER) {
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
  createFolder,
  deleteItem,
  deleteAllFiles,
  renameFile,
} = driveSlice.actions;
export default driveSlice.reducer;
