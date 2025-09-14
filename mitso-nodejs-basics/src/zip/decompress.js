import { createReadStream, createWriteStream } from "fs";
import { createGunzip } from "zlib";

const decompress = async () => {
  const readStream = createReadStream("src/zip/files/archive.gz");
  const writeStream = createWriteStream("src/zip/files/fileToCompress.txt");
  const gunzipStream = createGunzip();

  readStream.pipe(gunzipStream).pipe(writeStream);

  await new Promise((resolve, reject) => {
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });
};

await decompress();