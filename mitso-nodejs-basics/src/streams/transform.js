import { Transform } from "stream";

const transform = async () => {
  const invertStream = new Transform({
    transform(chunk, _encoding, callback) {
      const invertedChunk = chunk.toString().split("").reverse().join("");
      this.push(invertedChunk);
      callback();
    },
  });

  process.stdin.pipe(invertStream).pipe(process.stdout);

  return new Promise((resolve, reject) => {
    process.stdout.on("finish", resolve);
    process.stdout.on("error", reject);
  });
};

await transform();