
import {
  createReadStream,
  createWriteStream,
} from 'node:fs';
import { resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';


export const compress = async (currentPath, pathToFile, pathToDestination) => {
  if (!pathToFile || !pathToDestination) {
    throw new Error('Invalid Input');
  }
  const filePath = resolve(currentPath, pathToFile);
  const fileOutputPath = resolve(currentPath, pathToDestination);

  const gzip = createGzip();
  const source = createReadStream(filePath);
  const destination = createWriteStream(fileOutputPath);

  await pipeline(source, gzip, destination);
};
