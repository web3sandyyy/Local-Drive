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
  const month = date.toLocaleString("default", { month: "long" }); // e.g., June
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}
