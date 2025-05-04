import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import { printCurrentPath } from '../service/printCurrentPath.js';

export const hash = (currentPath, pathToFile) => {
  if (!pathToFile) {
    throw new Error('Invalid Input');
  }

  const filePath = resolve(currentPath, pathToFile);

  const hash = createHash('sha256')
  const readStream = createReadStream(filePath);

  readStream.on('data', (chunk) => {
    hash.update(chunk);
  });

  readStream.on('end', () => {
    const hex = hash.digest('hex');
    console.log(hex);
    process.stdout.write(printCurrentPath(currentPath));
    process.stdout.write('Enter your command\n');
  });

  readStream.on('error', () => {
    console.error('FS operation failed');
    process.stdout.write(printCurrentPath(currentPath));
    process.stdout.write('Enter your command\n');
  });
};
