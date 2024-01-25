import { PR } from "../../constants";
import { getStatusOfPR } from "../../getStatusOfPR";

export const filterByPRStatus = (
  data: PR[],
  selectedStatuses: string[],
  totalOptions: number
): PR[] => {
  return selectedStatuses.length !== 0 &&
    selectedStatuses.length !== totalOptions
    ? data.filter((pr) =>
        selectedStatuses.includes(
          getStatusOfPR(
            pr.headPipeline?.status === "FAILED" ? true : false,
            //pr.conflicts,
            pr.draft,
            pr.autoMergeEnabled,
            pr.approved,
            pr.reviewers.nodes.length ? true : false
          ).status
        )
      )
    : data;
};
