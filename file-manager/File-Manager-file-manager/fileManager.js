import readline from "readline";
import os from "os";
import { navigateUpward } from "./commands/navigateUpward.js";
import { navigateToSpecificDirectory } from "./commands/changeDirectory.js";
import { enumerateDirectoryContents } from "./commands/listDirectory.js";
import { streamResourceContentToConsole } from "./commands/cat.js";
import { generateNewEmptyFile } from "./commands/add.js";
import { modifyResourceName } from "./commands/rn.js";
import { transferResourceViaStream } from "./commands/transfer.js";
import { obliterateSystemItem } from "./commands/rm.js";
import { reportOperatingSystemProperty } from "./commands/os.js";
import { generateResourceChecksum } from "./commands/hash.js";
import { transformFileWithBrotli } from "./commands/compress.js";

let currentDirectory = os.homedir();

const commandRegistry = {
  up: navigateUpward,
  cd: navigateToSpecificDirectory,
  ls: enumerateDirectoryContents,
  cat: streamResourceContentToConsole,
  add: generateNewEmptyFile,
  rn: modifyResourceName,
  cp: (src, dest) => transferResourceViaStream(src, dest, false),
  mv: (src, dest) => transferResourceViaStream(src, dest, true),
  rm: obliterateSystemItem,
  os: reportOperatingSystemProperty,
  hash: generateResourceChecksum,
  compress: (src, dest) => transformFileWithBrotli(src, dest, "encode"),
  decompress: (src, dest) => transformFileWithBrotli(src, dest, "decode"),
  ".exit": () => {
    console.log(`\nThank you for using File Manager, goodbye!`);
    process.exit(0);
  },
};

export function startFileManager(username) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const promptUser = () => {
    console.log(`You are currently in ${currentDirectory}`);
    rl.question("> ", async (input) => {
      const [command, ...args] = input.trim().split(" ");

      if (commandRegistry.hasOwnProperty(command)) {
        try {
          const result = commandRegistry[command](
            ...args,
            currentDirectory,
            (newDir) => {
              if (newDir) currentDirectory = newDir;
            }
          );

          if (result instanceof Promise) await result;
        } catch (error) {
          console.log("Operation failed");
        }
      } else {
        console.log("Invalid input");
      }

      promptUser();
    });
  };

  console.log(`Welcome to the File Manager, ${username}!`);
  promptUser();
}
