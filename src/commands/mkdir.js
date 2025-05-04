import { mkdir as fsMkdir } from 'node:fs/promises';
import { join } from 'node:path';


export const mkdir = async (currentPath, dirName) => {
  if (!dirName) {
    throw new Error('Invalid Input');
  }

  const dirPath = join(currentPath, dirName);

  try {
    await fsMkdir(dirPath); 
  } catch (e) {
    throw Error('FS operation failed');
  } 
};
