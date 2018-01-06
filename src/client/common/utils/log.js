import minilog from 'minilog';

minilog.enable();

const log =
  typeof window !== 'undefined' ? minilog('frontend') : minilog('backend');

/*
if (__DEV__ && __SERVER__) {
  const consoleLog = global.console.log;
  global.console.log = () => {
    if (
      arguments.length === 1 &&
      typeof arguments[0] === 'string' &&
      arguments[0].match(/^\[(HMR|WDS)\]/)
    ) {
      consoleLog(`backend ${arguments[0]}`);
    } else {
      consoleLog.apply(consoleLog, arguments);
    }
  };
}
*/

export default log;
