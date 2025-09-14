import { createReadStream, createWriteStream } from "fs";
import { createGzip } from "zlib";

const compress = async () => {
  const readStream = createReadStream("src/zip/files/fileToCompress.txt");
  const writeStream = createWriteStream("src/zip/files/archive.gz");
  const gzipStream = createGzip();

  readStream.pipe(gzipStream).pipe(writeStream);

  await new Promise((resolve, reject) => {
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });
};

await compress();