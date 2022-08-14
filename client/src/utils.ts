export function milliseconds2timerText(ms: number): string {
  let x = ms;
  const milli = x % 1000;
  x = (x - milli) / 1000;
  const seconds = x % 60;
  x = (x - seconds) / 60;
  const minutes = x % 60;
  const hours = (x - minutes) / 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
