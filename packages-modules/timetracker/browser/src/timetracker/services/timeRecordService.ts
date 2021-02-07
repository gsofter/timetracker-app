import { parse } from "@babel/core";

/**
 * Format seconds to time
 * 
 * @param seconds 
 * @return hh:mm:ss
 */
export const formatDuration = (seconds: number) => {
  const hour = Math.floor(seconds / 3600);
  const minute = Math.floor((seconds % 3600) / 60);
  const second = seconds % 60;
  const format = (num: number) => (num < 10 ? '0' + num : Number(num).toString());
  return format(hour) + ':' + format(minute) + ':' + format(second);
};

/**
 * Get duration from time string formated hh:mm:ss
 * @param str
 * @return seconds
 */
export const stringToDuration = (str: string) => {
  const digits = str.split(':')
  const len = digits.length;
  let totalSeconds = 0;
  if(len === 1) totalSeconds = parseInt(digits[0])
  else if(len === 2) {
    totalSeconds = parseInt(digits[0]) * 60 + parseInt(digits[1])
  } else if(len === 3) {
    totalSeconds = parseInt(digits[0]) * 3600 + parseInt(digits[1]) * 60 + parseInt(digits[2])
  } else return 0;
  return totalSeconds;
}