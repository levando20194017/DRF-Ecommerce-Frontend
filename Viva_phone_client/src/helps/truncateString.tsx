export const truncateString = (str: string, maxLength: number) => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + "...";
};