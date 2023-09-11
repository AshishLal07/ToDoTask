import logger from "pino";

const timeElapsed: Date = new Date();

const log = logger({
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${timeElapsed}"`,
});

export default log;
