import fs from "fs";
import path from "path";

export function transferResourceViaStream(source, dest, isMove, currentDirectory) {
  const srcPath = path.join(currentDirectory, source);
  const destPath = path.join(currentDirectory, dest);

  const readStream = fs.createReadStream(srcPath);
  const writeStream = fs.createWriteStream(destPath);

  readStream.on("error", () => console.log("Operation failed"));
  writeStream.on("error", () => console.log("Operation failed"));

  readStream.pipe(writeStream).on("finish", () => {
    if (isMove) {
      fs.unlink(srcPath, (err) => {
        if (err) console.log("Operation failed");
      });
    }
  });
}
