import fs from "fs";

export async function enumerateDirectoryContents(currentDirectory) {
  try {
    const files = await fs.promises.readdir(currentDirectory);
    console.log(files.join("\n"));
  } catch {
    console.log("Operation failed");
  }
}
