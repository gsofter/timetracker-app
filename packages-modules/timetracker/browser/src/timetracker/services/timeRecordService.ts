import moment, { Moment } from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);
/**
 * Format seconds to time
 *
 * @param seconds
 * @return hh:mm:ss
 */
export const formatDuration = (sec: number, timeFormat?: string) => {
  const seconds = Math.abs(sec);
  const duration = moment.duration(seconds, 'seconds') as any;
  return duration.format('HH:mm:ss', { trim: false });
};

/**
 * Get duration from time string formated hh:mm:ss
 * @param str
 * @return seconds
 */
export const stringToDuration = (str: string) => {
  const digits = str.split(':');
  const len = digits.length;
  let totalSeconds = 0;
  if (len === 1) totalSeconds = parseInt(digits[0]);
  else if (len === 2) {
    totalSeconds = parseInt(digits[0]) * 60 + parseInt(digits[1]);
  } else if (len === 3) {
    totalSeconds = parseInt(digits[0]) * 3600 + parseInt(digits[1]) * 60 + parseInt(digits[2]);
  } else return 0;
  return totalSeconds;
};

/**
 *
 * @param date Moment
 * @param roundSeconds Number of seconds
 * @param method Enum of { "ceil", "floor", "round" }
 * @returns roundedDate
 */
export function roundDate(date: Moment, roundSeconds, method) {
  const duration = moment.duration(roundSeconds, 'seconds');
  return moment(Math[method](+date / +duration) * +duration);
}

/**
 *
 * @param duration Number of duration
 * @param roundSeconds Number of seconds
 * @param method Enum of { "ceil", "floor", "round" }
 * @returns roundedDuration
 */
export function roundDuration(duration, roundSeconds, method) {
  return Math[method](Math.abs(+duration) / +roundSeconds) * +roundSeconds;
}

/**
 * Return seconds from timestring
 * @param str:string
 * @returns
 */
export const getSecsFromString = (str: string) => {
  const [str1, str2, str3] = str.split(':');

  const val1 = Number(str1);
  const val2 = Number(str2);
  const val3 = Number(str3);

  if (!isNaN(val1) && isNaN(val2) && isNaN(val3)) {
    return val1 * 60;
  }

  if (!isNaN(val1) && !isNaN(val2) && isNaN(val3)) {
    return val1 * 60 * 60 + val2 * 60;
  }

  if (!isNaN(val1) && !isNaN(val2) && !isNaN(val3)) {
    return val1 * 60 * 60 + val2 * 60 + val3;
  }

  return 0;
};
