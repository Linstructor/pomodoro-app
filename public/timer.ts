import "babel-polyfill";

let mustStop = false;
let generator: any;
let lastVal: number;

async function* run(end: Date) {
  const wait = () => new Promise(resolve => setTimeout(resolve, 1000));
  while (!mustStop && new Date().getTime() <= end.getTime()) {
    await wait();
    yield new Date().getTime();
  }
}


const show = async (callback: Callback, callBackEnd: CallBackEnd): Promise<void> => {
  const res = await generator.next();
  if (mustStop) return;
  if (!res.done) {
    callback(res.value, lastVal);
    lastVal = res.value;
    return show(callback, callBackEnd);
  }
  return callBackEnd();
};



export const start = (end: EndDate, callback: Callback, callbackEnd: CallBackEnd) => {
  mustStop = false;
  const date = new Date();
  lastVal = date.getTime();
  date.setMinutes(date.getMinutes() + end.minutes);
  if (end.seconds) date.setSeconds(date.getSeconds() + end.seconds);
  // console.log(new Date(), date, end);
  generator = run(date);
  show(callback, callbackEnd);
};

export const stop = () => {
  mustStop = true;
  console.log('Stop timer', mustStop);
  const temp = lastVal;
  lastVal = -1;
  return temp;
};

export default {
  start,
  stop
}

interface EndDate {
  minutes: number,
  seconds?: number
}

export type Callback = (val: number, savedValue: number) => void;
export type CallBackEnd = () => void;