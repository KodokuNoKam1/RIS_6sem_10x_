import * as url from "url";
import { Worker } from "worker_threads";
import os from "os";
import path from "path";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const workerFiles = path.join(__dirname, "worker.js");

const performCalculations = async () => {
  const promises = [];

  for (let i = 0; i < os.cpus().length; i++) {
    promises.push(
      new Promise((resolve, _reject) => {
        const worker = new Worker(workerFiles, {
          workerData: { value: 10 + i },
        });

        worker.on("message", (result) =>
          resolve({
            status: "resolved",
            result,
          })
        );
        worker.on("error", () =>
          resolve({
            status: "error",
            result: null,
          })
        );
      })
    );
  }

  Promise.all(promises).then((result) => console.log(result));
};

await performCalculations();