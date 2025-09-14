import * as fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
const pipelineAsync = promisify(pipeline);

const read = async () => {
  try {
    const stream = fs.createReadStream(
      "src/streams/files/fileToRead.txt",
      "utf-8"
    );
    await pipelineAsync(stream, process.stdout);

    console.log("File reading completed.");
  } catch (error) {
    console.log(error);
  }
};

read();