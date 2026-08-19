import colors from 'colors';
import config from '../config';

const getTimestamp = (): string => {
  const now = new Date();
  return now.toISOString();
};

const log = {
  info: (message: string) => {
    console.log(`${colors.gray(getTimestamp())} ${colors.blue('[INFO] ' + message)}`);
  },
  success: (message: string) => {
    console.log(`${colors.gray(getTimestamp())} ${colors.green('[SUCCESS] ' + message)}`);
  },
  warn: (message: string) => {
    console.log(`${colors.gray(getTimestamp())} ${colors.yellow('[WARN] ' + message)}`);
  },
  error: (message: string) => {
    console.log(`${colors.gray(getTimestamp())} ${colors.red('[ERROR] ' + message)}`);
  },
};

export default log;
