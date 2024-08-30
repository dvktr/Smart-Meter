export const convertResultToNumber = (str: string) =>
  parseFloat((parseInt(str.match(/\d+/)[0]) / 100).toFixed(2));
