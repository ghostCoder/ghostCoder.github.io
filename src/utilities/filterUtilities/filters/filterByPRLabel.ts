import { PR } from "../../constants";

export const filterByPRLabel = (data: PR[], selectedLabels: string[]): PR[] => {
  return selectedLabels.length !== 0
    ? data.filter((pr) => {
        const labels = pr.labels.nodes.map((label) => label.title);
        return labels.some((label) => selectedLabels.includes(label));
      })
    : data;
};
