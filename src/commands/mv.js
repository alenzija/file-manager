import { createWriteStream , createReadStream, unlink } from 'node:fs';
import { resolve, basename } from 'node:path';

export const mv = (currentPath, pathToFile, pathToNewDirectory) => {
  if (!pathToFile || !pathToNewDirectory) {
    throw new Error('Invalid Input');
  }

  const filePath = resolve(currentPath, pathToFile);

  const copyFilePath = resolve(currentPath, pathToNewDirectory, basename(filePath));
  const readStream = createReadStream(filePath);
  const writeStream = createWriteStream(copyFilePath);

  readStream.on('data', (chunk) => {
    writeStream.write(chunk, (err) => {
      if (err) {
        throw new Error('FS operation failed');
      }
    });    
  });

  readStream.on('close', () => {
    unlink(filePath, (err) => {
      if (err) {
        throw new Error('FS operation failed');
      }
    });
  })

  readStream.on('error', () => {
    throw new Error('FS operation failed');
  });
};
