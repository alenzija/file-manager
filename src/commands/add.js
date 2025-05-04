import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';


export const add = async (currentPath, fileName) => {
  if (!fileName) {
    throw new Error('Invalid Input');
  }

  const filePath = join(currentPath, fileName);
  try {
    await writeFile(join(filePath), ''); 
  } catch (e) {
    throw Error('FS operation failed');
  } 
};
