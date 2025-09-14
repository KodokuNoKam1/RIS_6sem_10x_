import fs from "fs";
import path from "path";
import { brotliCompress, brotliDecompress } from "zlib";

export function transformFileWithBrotli(src, dest, mode, currentDirectory) {
  const srcPath = path.join(currentDirectory, src);
  const destPath = path.join(currentDirectory, dest);

  const input = fs.createReadStream(srcPath);
  const output = fs.createWriteStream(destPath);
  const transform = mode === "encode" ? brotliCompress() : brotliDecompress();

  input.pipe(transform).pipe(output).on("error", () => {
    console.log("Operation failed");
  });
}
