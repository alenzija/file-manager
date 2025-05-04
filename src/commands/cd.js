import { access } from 'node:fs/promises';
import { resolve } from 'node:path';

export const cd = async (currentPath, path) => {
  if (!path) {
    throw new Error('Invalid Input');
  }
  const newPath = resolve(currentPath, path);

  await access(newPath);

  return newPath;

};
