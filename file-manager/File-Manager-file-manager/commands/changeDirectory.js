import path from "path";
 import fs from "fs";
 
 export function changeDirectory(targetPath, currentDirectory, updateDirectory) {
   const newPath = path.resolve(currentDirectory, targetPath);
   if (fs.existsSync(newPath) && fs.lstatSync(newPath).isDirectory()) {
     updateDirectory(newPath);
   } else {
     console.log("Operation failed");
   }
 }