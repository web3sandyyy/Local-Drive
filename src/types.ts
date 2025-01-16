

export enum ItemKind {
  FILE = "FILE",
  FOLDER = "FOLDER",
}

export interface BaseItem {
  id: string;
  name: string;
  itemKind: ItemKind;
  lastModified: number;
  path: string;
}

export interface FileData extends BaseItem {
  itemKind: ItemKind.FILE;
  fileType: string;
  size: number;
  content: string;
}

export interface FolderData extends BaseItem {
  itemKind: ItemKind.FOLDER;
  children: DriveItem[];
}

export type DriveItem = FileData | FolderData;
