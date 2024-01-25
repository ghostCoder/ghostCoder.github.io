export const getIssueKeysFromPRTitle = (prTitle: string) => {
  let issueKeys: string[] = [];

  if (prTitle[0] === "[") {
    let start = 0;
    do {
      let flag = 0;
      start += 1;
      if (prTitle[start] === "|") {
        start++;
      }
      while (prTitle[start] === " ") {
        start++;
        if (start === prTitle.length || prTitle[start] === "]") {
          flag = 2;
          break;
        } else if (prTitle[start] === "|") {
          flag = 1;
        }
      }
      if (flag === 2) {
        break;
      } else if (flag === 1) {
        continue;
      }
      let end = start + 1;
      while (
        prTitle[end] !== " " &&
        prTitle[end] !== "|" &&
        prTitle[end] !== "]"
      ) {
        end++;
      }
      issueKeys = [...issueKeys, prTitle.slice(start, end)];
      start = end;
    } while (prTitle[start] !== "]");
  }
  return issueKeys;
};
