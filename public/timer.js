import "babel-polyfill";

let mustStop = false;
let generator;
let lastVal;

async function* run(end) {
  const wait = () => new Promise(resolve => setTimeout(resolve, 1000));
  while (!mustStop && new Date().getTime() <= end.getTime()) {
    await wait();
    yield new Date().getTime();
  }
}


const show = async (callback, callBackEnd) => {
  const res = await generator.next();
  if (mustStop) return;
  if (!res.done) {
    callback(res.value);
    lastVal = res.value;
    return show(callback, callBackEnd);
  }
  return callBackEnd();
};



const start = (end, callback, callbackEnd) => {
  mustStop = false;
  const date = new Date();
  date.setMinutes(date.getMinutes() + end.minutes);
  if (end.seconds) date.setSeconds(date.getSeconds() + end.seconds);
  console.log(new Date(), date);
  generator = run(date);
  show(callback, callbackEnd);
};

const stop = () => {
  mustStop = true;
  console.log('Stop timer', mustStop);
  const temp = lastVal;
  lastVal = undefined;
  return temp;
};

module.exports = {
  start,
  stop
};