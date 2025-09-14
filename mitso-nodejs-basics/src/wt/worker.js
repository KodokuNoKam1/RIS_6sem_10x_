import fs from "fs";
const write = async () => {
  const stream = fs.createWriteStream("src/streams/files/fileToWrite.txt");
  process.stdin.pipe(stream);
  await new Promise((resolve) => process.stdin.on("end", resolve));
};
await write();
import { workerData, parentPort } from "worker_threads";

const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = async () => {
  try {
    const result = await nthFibonacci(workerData);
    parentPort.postMessage(result);
  } catch (error) {
    parentPort.postMessage(null);
  }
};

sendResult();