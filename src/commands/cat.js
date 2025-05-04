import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import { printCurrentPath } from '../service/printCurrentPath.js';

export const cat = (currentPath, path) => {
  if (!path) {
    throw new Error('Invalid Input');
  }

  const filePath = resolve(currentPath, path);
  const readStream = createReadStream(filePath);

  readStream.on('data', (chunk) => {
    process.stdout.write(`${chunk}\n`);
    if (!chunk) {
      readStream._destroy();
    }
  });

  readStream.on('error', () => {
    console.error('FS operation failed');
    process.stdout.write(printCurrentPath(currentPath));
    process.stdout.write('Enter your command\n');
  });

  readStream.on('end', () => {
    process.stdout.write(printCurrentPath(currentPath));
    process.stdout.write('Enter your command\n');
  })
};
