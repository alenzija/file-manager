
import { homedir } from 'node:os';

import { up } from './commands/up.js';
import { cd } from './commands/cd.js';
import { ls } from './commands/ls.js';
import { cat } from './commands/cat.js';
import { add } from './commands/add.js';
import { mkdir } from './commands/mkdir.js';
import { rn } from './commands/rn.js';
import { cp } from './commands/cp.js';
import { mv } from './commands/mv.js';
import { rm } from './commands/rm.js';
import { os } from './commands/os.js';
import { hash } from './commands/hash.js';
import { printCurrentPath } from './service/printCurrentPath.js';

const argv = process.argv;

const userName = argv.find((item) => /^--username/.test(item))?.replace(/--username=/, '') ?? 'Anonymous';

let currentPath = homedir();

process.on('exit', () => {
  process.stdout.write(`\nThank you for using File Manager, ${userName}, goodbye!
  `);
});

process.on('SIGINT', () => {
  process.exit();
});

process.stdout.write(`Welcome to the File Manager, ${userName}!\n`);
process.stdout.write(printCurrentPath(currentPath));
process.stdout.write('Enter your command\n');

process.stdin.on('data', async (data) => {
  const stringData = data.toString().trim();
  if(/.exit/.test(stringData)) {
    process.exit();
  }
  const [command, ...args] = stringData.split(' ');
  try {
    switch(command) {
      case 'up': {
        currentPath = up(currentPath);
        break;
      }
      case 'cd': {
        currentPath = await cd(currentPath, args?.[0]);
        break;
      }
      case 'ls': {
        await ls(currentPath);
        break;
      }
      case 'cat': {
        cat(currentPath, args?.[0]);
        break;
      }
      case 'add': {
        await add(currentPath, args?.[0]);
        break;
      }
      case 'mkdir': {
        await mkdir(currentPath, args?.[0]);
        break;
      }
      case 'rn': {
        await rn(currentPath, args?.[0], args?.[1]);
        break;
      }
      case 'cp': {
        cp(currentPath, args?.[0], args?.[1]);
        break;
      }
      case 'mv': {
        mv(currentPath, args?.[0], args?.[1]);
        break;
      }
      case 'rm': {
        await rm(currentPath, args?.[0]);
        break;
      }
      case 'os': {
        os(args?.[0]);
        break;
      }
      case 'hash': {
        hash(currentPath, args?.[0]);
        break;
      }
      default: { 
        console.log('Incorrect command ', stringData)
      }
    }

  } catch (e) {
    process.stdout.write(`\n${e.message}\n\n`);
  }
  process.stdout.write(printCurrentPath(currentPath));
  process.stdout.write('Enter your command\n');
});
