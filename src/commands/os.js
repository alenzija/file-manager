import nodeOs from 'node:os';

export const os = (parameter) => {
  switch (parameter) {
    case '--EOL': {
      console.log({ EOL: nodeOs.EOL});
      break;
    }
    case '--cpus': {
      console.log(nodeOs.cpus());
      break;
    }
    case '--homedir': {
      console.log(nodeOs.homedir());
      break;
    }
    case '--username': {
      console.log(nodeOs.userInfo().username);
      break;
    }
    case '--architecture': {
      console.log(nodeOs.arch());
      break;
    }
    default: {
      console.log('Incorrect parameter ')
    }
  }
}