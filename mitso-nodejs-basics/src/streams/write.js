import fs from "fs";
const write = async () => {
  const stream = fs.createWriteStream("src/streams/files/fileToWrite.txt");
  process.stdin.pipe(stream);
  await new Promise((resolve) => process.stdin.on("end", resolve));
};
await write();