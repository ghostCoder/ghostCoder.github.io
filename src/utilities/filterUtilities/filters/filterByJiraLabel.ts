import { PR } from "../../constants";

export const filterByJiraLabel = (
  data: PR[],
  selectedLabels: string[]
): PR[] => {
  return selectedLabels.length !== 0
    ? data.filter((pr) => {
        const labels = pr.jiraLabels;
        return labels?.some((label) => selectedLabels.includes(label));
      })
    : data;
};
