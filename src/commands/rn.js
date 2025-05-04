import { rename, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export const rn = async (currentPath, pathToFile, newFileName) => {
  if (!pathToFile || ! newFileName) {
    throw new Error('Invalid Input');
  }

  const filePath = resolve(currentPath, pathToFile);
  try {
    await readFile(filePath);
    await rename(filePath, newFileName);
  } catch {
    throw Error('FS operation failed');
  }
};
