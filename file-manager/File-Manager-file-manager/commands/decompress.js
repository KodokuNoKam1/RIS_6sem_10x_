import fs from "fs";
import path from "path";
import { createBrotliCompress, createBrotliDecompress } from "zlib";

export function transformFileWithBrotli(src, dest, mode, currentDirectory) {
  const srcPath = path.join(currentDirectory, src);
  const destPath = path.join(currentDirectory, dest);

  const input = fs.createReadStream(srcPath);
  const output = fs.createWriteStream(destPath);
  const transform = mode === "encode" ? createBrotliCompress() : createBrotliDecompress();

  input.pipe(transform).pipe(output).on("error", () => {
    console.log("Operation failed");
  });
}
