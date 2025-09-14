import fs from "fs";
import path from "path";

export function obliterateSystemItem(filename, currentDirectory) {
  const filePath = path.join(currentDirectory, filename);
  fs.unlink(filePath, (err) => {
    if (err) console.log("Operation failed");
  });
}
