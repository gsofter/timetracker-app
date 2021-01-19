export const formatDuration = (seconds: number) => {
  const hour = Math.floor(seconds / 3600);
  const minute = Math.floor((seconds % 3600) / 60);
  const second = seconds % 60;
  const format = (num: number) => (num < 10 ? '0' + num : num.toString());
  return format(hour) + ':' + format(minute) + ':' + format(second);
};
