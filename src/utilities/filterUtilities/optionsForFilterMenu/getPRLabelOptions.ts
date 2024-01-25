import { PR, option } from "../../constants";

export const getPRLabelOptions = (data: PR[]): option[] => {
  return [
    ...new Set(
      data
        .map((pr) => pr.labels.nodes)
        .flat()
        .map((label) => label.title)
    ),
  ].map((label) => ({ key: label, text: label }));
};
