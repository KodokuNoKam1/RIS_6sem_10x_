import fs from "fs";
import path from "path";

export function generateNewEmptyFile(filename, currentDirectory) {
  const filePath = path.join(currentDirectory, filename);
  fs.writeFile(filePath, "", (err) => {
    if (err) console.log("Operation failed");
  });
}
