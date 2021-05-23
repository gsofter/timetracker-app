
export const msToHMS = (milliseconds: number) => {
  const hours = milliseconds / (3600 * 1000);
  const absoluteHours = Math.floor(hours);
  const hoursString = absoluteHours > 9 ? `${absoluteHours}` : `0${absoluteHours}`;

  const minutes = (hours - absoluteHours) * 60;
  const absoluteMinutes = Math.floor(minutes);
  const minutesStrinig = absoluteMinutes > 9 ? `${absoluteMinutes}` : `0${absoluteMinutes}`;

  const seconds = (minutes - absoluteMinutes) * 60;
  const absoluteSeconds = Math.floor(seconds);
  const secondsString = absoluteSeconds > 9 ? `${absoluteSeconds}` : `0${absoluteSeconds}`;


  return `${hoursString}:${minutesStrinig}:${secondsString}`;
}