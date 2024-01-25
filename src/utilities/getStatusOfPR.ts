import { PR_STATUS, StatusObject } from "./constants";

export const getStatusOfPR = (
  pipelineFailed: boolean,
  draft: boolean,
  autoMergeEnabled: boolean,
  approved: boolean,
  reviewer: boolean
): StatusObject => {
  if (pipelineFailed) {
    return PR_STATUS.pipelineFailed;
  } else if (draft) {
    return PR_STATUS.draft;
  } else if (autoMergeEnabled) {
    return PR_STATUS.setToMerge;
  } else if (approved) {
    return PR_STATUS.readyToMerge;
  } else if (reviewer) {
    return PR_STATUS.readyForReview;
  } else {
    return PR_STATUS.inProgress;
  }
};
