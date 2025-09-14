import fs from "fs";
import path from "path";
import crypto from "crypto";

export function generateResourceChecksum(filename, currentDirectory) {
  const filePath = path.join(currentDirectory, filename);
  const hash = crypto.createHash("sha256");
  const stream = fs.createReadStream(filePath);

  stream.on("error", () => console.log("Operation failed"));
  stream.on("data", (chunk) => hash.update(chunk));
  stream.on("end", () => console.log(hash.digest("hex")));
}
