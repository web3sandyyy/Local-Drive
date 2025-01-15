export type ItemKind = "file" | "folder";

export interface BaseItem {
  id: string;
  name: string;
  itemKind: ItemKind;
  lastModified: number;
  path: string;
}

export interface FileData extends BaseItem {
  itemKind: "file";
  fileType: string;
  size: number;
  content: string;
}

export interface FolderData extends BaseItem {
  itemKind: "folder";
  folderName: string;
  children: DriveItem[];
}

export type DriveItem = FileData | FolderData;
