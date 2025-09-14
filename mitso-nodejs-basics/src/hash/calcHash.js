import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const calculateHash = async () => {
  try {
    const filePath = path.join(
      __dirname,
      "files",
      "fileToCalculateHashFor.txt"
    );

    const hash = crypto.createHash("sha256");
    const fileBuffer = await fs.readFile(filePath);

    hash.update(fileBuffer);
    const result = hash.digest("hex");

    console.log(`SHA256 Hash: ${result}`);
  } catch (err) {
    console.error(`Error reading file: ${err.message}`);
  }
};

await calculateHash();