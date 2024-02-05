export const formatTime = (milliseconds: number) => {
  const minutes = Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);

  const pad = (value: any) => (value < 10 ? `0${value}` : value);

  return `${pad(minutes)}:${pad(seconds)}`;
};