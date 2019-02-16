const status = {
  RUN: 'r',
  PAUSE: 'p',
  WAIT: 'w',
};

const actions = {
  CHANGE: 'change',
  RESET: 'reset'
};

const targets = {
  STATUS: 'status'
};

let currentSate = status.WAIT;

onmessage = (event) => {
  if (event.data.action === actions.RESET) return reset();

  if (event.data.action === actions.CHANGE) {
    if (event.data.target === targets.STATUS) {
      if (event.data.value === status.PAUSE) return pause();
      if (event.data.value === status.RUN) return run();
    }
  } 
};

const pause = () => {
  currentSate = status.PAUSE;
};

const run = () => {
  currentSate = status.RUN;
};

const reset = () => {
  currentSate = status.WAIT;
};