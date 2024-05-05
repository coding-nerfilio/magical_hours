import fs from "fs";
import path from "path";
import { promisify } from "util";

const pCopyFile = promisify(fs.copyFile);
const pMkDir = promisify(fs.mkdir);
const root = path.resolve(__dirname, "../");
const dest = path.resolve(root, "dist");

const filesToCopy = [
  "package.json",
  "package-lock.json",
  "./assets/languages/es.json",
];

const start = async () => {
  await await pMkDir(path.resolve(root, "dist/assets"));
  await await pMkDir(path.resolve(root, "dist/assets/languages"));
  for (const file of filesToCopy) {
    const fullSource = path.resolve(root, file);
    const fullDest = path.resolve(dest, file);
    console.log(`Copy ${fullSource} -> ${fullDest}`);
    await pCopyFile(fullSource, fullDest);
  }
};

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
