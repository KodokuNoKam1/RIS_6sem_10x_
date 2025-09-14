import path from "path";

export function navigateUpward(_, currentDirectory, setDir) {
  const parentDir = path.dirname(currentDirectory);
  setDir(parentDir);
}
