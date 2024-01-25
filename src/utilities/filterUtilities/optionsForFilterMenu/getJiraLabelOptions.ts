import { PR, option } from "../../constants";

export const getJiraLabelOptions = (data: PR[]): option[] => {
  const options = [
    ...new Set(data.map((pr) => pr.jiraLabels ?? []).flat()),
  ].map((label) => ({
    key: label,
    text: label,
  }));
  return JSON.stringify(options) ===
    JSON.stringify([{ key: undefined, text: undefined }])
    ? []
    : options;
};
