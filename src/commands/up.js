import { resolve } from 'node:path';

export const up = (currentPath) => resolve(currentPath, '..');
