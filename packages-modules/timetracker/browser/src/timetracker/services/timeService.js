import * as moment from 'moment';
// import { store } from '../store/configureStore';

export function getDateInString(seconds, durationTimeFormat) {
  if (!seconds) {
    return getTimeDurationByGivenTimestamp(0, durationTimeFormat);
  }

  return getTimeDurationByGivenTimestamp(seconds, durationTimeFormat);
}

export function getTimeDiff(timeFrom, inString, durationTimeFormat) {
  const { serverClientTimediff } = store.getState().mainPageReducer;
  const timeDiff = +moment() - timeFrom + serverClientTimediff;

  return inString ? getTimeDurationByGivenTimestamp(+timeDiff, durationTimeFormat) : moment(timeDiff).utc();
}

export function getTimeInSecondFromString(string) {
  const a = string.split(':');
  const seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];

  return seconds;
}

export function createArrTimeAndDate(arr, key, firstKey, secondKey) {
  const arrDates = [];
  const arrTime = [];
  for (let i = 0; i < arr.length; i++) {
    const index = arrDates.indexOf(arr[i][firstKey]);
    if (index === -1) {
      arrDates.push(arr[i][firstKey]);
      arrTime.push(arr[i][secondKey]);
    } else {
      arrTime[index] += arr[i][secondKey];
    }
  }
  if (key === 'secondArr') {
    return arrTime;
  }
  if (key === 'firstArr') {
    return arrDates;
  }
}

export function changeDate(arr) {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(moment(arr[i]).format('dddd DD.MM.YYYY'));
  }

  return newArr;
}

export function getTimeDurationByGivenTimestamp(milliseconds, durationTimeFormat = 'improved') {
  const decimal = (time) => {
    const h = time / 1000 / 60 / 60;
    return `${h.toFixed(2)} h`;
  };

  const classic = (time) => {
    let hour;
    let minute;
    let seconds;
    seconds = Math.floor(time / 1000);
    minute = Math.floor(seconds / 60);
    seconds %= 60;
    hour = Math.floor(minute / 60);
    minute %= 60;

    if (hour === 0 && minute === 0) {
      return `${padTime(seconds)} s`;
    }
    if (hour === 0 && minute !== 0) {
      return `${padTime(minute)}:${padTime(seconds)} min`;
    }
    if (hour !== 0) {
      return `${padTime(hour)}:${padTime(minute)}:${padTime(seconds)}`;
    }
  };

  const improved = (time) => {
    let hour;
    let minute;
    let seconds;
    seconds = Math.floor(time / 1000);
    minute = Math.floor(seconds / 60);
    seconds %= 60;
    hour = Math.floor(minute / 60);
    minute %= 60;

    return `${padTime(hour)}:${padTime(minute)}:${padTime(seconds)}`;
  };

  if (durationTimeFormat === 'improved') {
    return improved(milliseconds);
  }
  if (durationTimeFormat === 'decimal') {
    return decimal(milliseconds);
  }
  if (durationTimeFormat === 'classic') {
    return classic(milliseconds);
  }
}

export function convertDateToISOString(date) {
  return moment(date).utc().toISOString();
}

export function convertDateToShiftedISOString(date, shiftTimestamp) {
  return moment(date).add(shiftTimestamp, 'ms').utc().toISOString();
}

export function convertUTCDateToLocalISOString(date) {
  const user = { ...store.getState().userReducer.user };
  const { timezoneOffset } = user;

  return moment(date).subtract(timezoneOffset).utc().toISOString();
}

export function convertUTCDateToShiftedLocalISOString(date, shiftTimestamp) {
  const user = { ...store.getState().userReducer.user };
  const { timezoneOffset } = user;

  return moment(date).subtract(timezoneOffset).add(shiftTimestamp, 'ms').utc().toISOString();
}

export function getDate(date) {
  return new Date(date);
}

export function getCurrentDate() {
  return new Date();
}

export function getTimestamp() {
  return new Date().getTime();
}

export function getDateTimestamp(date) {
  return new Date(date).getTime();
}

function padTime(item) {
  if (!item) {
    return '00';
  }

  if (`${item}`.length === 1) {
    return `0${item}`;
  }

  return item;
}

export function getDataStorageDateByPlan(days = 0) {
  const date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + days);

  return moment(date).format('YYYY-MM-DD');
}
