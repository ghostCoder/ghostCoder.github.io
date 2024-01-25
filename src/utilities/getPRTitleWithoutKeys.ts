export const getPRTitleWithoutKeys = (prTitle: string): string => {
  return prTitle.indexOf("]", 0) === -1
    ? prTitle
    : prTitle.slice(prTitle.indexOf("]", 0) + 1);
};
