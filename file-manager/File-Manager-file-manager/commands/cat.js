import fs from "fs";
import path from "path";

export function streamResourceContentToConsole(filename, currentDirectory) {
  const filePath = path.join(currentDirectory, filename);
  const stream = fs.createReadStream(filePath, "utf-8");

  stream.on("data", (chunk) => process.stdout.write(chunk));
  stream.on("error", () => console.log("Operation failed"));
}
