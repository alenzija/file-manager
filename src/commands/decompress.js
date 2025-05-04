import {
    createReadStream,
    createWriteStream,
  } from 'node:fs';
  import { resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { createUnzip } from 'node:zlib';


export const decompress = async (currentPath, pathToFile, pathToDestination) => {
  if (!pathToFile || !pathToDestination) {
    throw new Error('Invalid Input');
  }
  const filePath = resolve(currentPath, pathToFile);
  const fileOutputPath = resolve(currentPath, pathToDestination);
  const input = createReadStream(filePath);    
  const output = createWriteStream(fileOutputPath);

  const unzip = createUnzip();

  await pipeline(input, unzip, output)
};
