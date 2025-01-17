import toast from "react-hot-toast";
import { DriveItem, FileData, FolderData, ItemKind } from "./types";
import JSZip from "jszip";

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const units = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, i);
  return `${size.toFixed(2)} ${units[i]}`;
}

export function formatTimestampToDate(timestamp: number): string {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export const getFileContent = (file: FileData): BlobPart => {
  if (
    file.fileType.startsWith("image/") ||
    file.fileType === "application/pdf" ||
    file.fileType.includes("audio/") ||
    file.fileType.includes("video/")
  ) {
    const base64Content = file.content.split(",")[1] || file.content;
    return Uint8Array.from(atob(base64Content), (c) => c.charCodeAt(0));
  }
  return file.content;
};

export const downloadFile = (file: FileData) => {
  try {
    const blobContent = getFileContent(file);
    const blob = new Blob([blobContent], { type: file.fileType });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);

    toast.dismiss();
    toast.success("File downloaded successfully");
    return true;
  } catch (error) {
    toast.dismiss();
    toast.error("Error downloading folder");
    console.error("Error downloading file:", error);
    return false;
  }
};

const addToZip = async (
  item: DriveItem,
  zip: JSZip,
  currentPath: string = ""
) => {
  if (item.itemKind === ItemKind.FILE) {
    const content = getFileContent(item);
    zip.file(currentPath + item.name, content);
  } else {
    const folderZip = zip.folder(item.name);
    if (folderZip && item.children) {
      for (const child of item.children) {
        await addToZip(child, folderZip);
      }
    }
  }
};

const downloadFolder = async (folder: FolderData) => {
  try {
    const zip = new JSZip();

    await Promise.all(folder.children.map((item) => addToZip(item, zip)));

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${folder.name}.zip`;
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);

    toast.dismiss();
    toast.success("Folder downloaded successfully");
    return true;
  } catch (error) {
    toast.dismiss();
    toast.error("Error downloading folder");
    console.error("Error downloading folder:", error);
    return false;
  }
};

export const downloadDriveItem = async (item: DriveItem) => {
  if (item.itemKind === ItemKind.FILE) {
    return downloadFile(item);
  } else {
    return downloadFolder(item);
  }
};
