
import { resolve } from 'node:path';
import { up } from './commands/up.js';
import { cd } from './commands/cd.js';
import { ls } from './commands/ls.js';

const argv = process.argv;

const userName = argv.find((item) => /^--username/.test(item))?.replace(/--username=/, '') ?? 'Anonymous';

let currentPath = resolve();

const printPath = (path) =>  `You are currently in ${path}\n`;

process.on('exit', () => {
  process.stdout.write(`\nThank you for using File Manager, ${userName}, goodbye!
  `);
});

process.on('SIGINT', () => {
  process.exit();
});

process.stdout.write(`Welcome to the File Manager, ${userName}!\n`);
process.stdout.write(printPath(currentPath));
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
      default: { 
        console.log('Incorrect command ', stringData)
      }
    }

  } catch (e) {
    process.stdout.write(`\n${e.message}\n\n`);
  }
  process.stdout.write(printPath(currentPath));
  process.stdout.write('Enter your command\n');
});
