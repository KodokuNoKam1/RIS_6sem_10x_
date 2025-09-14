import fs from "fs";
import path from "path";

export function modifyResourceName(oldName, newName, currentDirectory) {
  const oldPath = path.join(currentDirectory, oldName);
  const newPath = path.join(currentDirectory, newName);

  fs.rename(oldPath, newPath, (err) => {
    if (err) console.log("Operation failed");
  });
}
