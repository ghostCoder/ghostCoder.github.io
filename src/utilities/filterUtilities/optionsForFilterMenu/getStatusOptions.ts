import { PR_STATUS, option } from "../../constants";

export const getStatusOptions = (): option[] => {
  return [
    {
      key: PR_STATUS.draft.status,
      text: PR_STATUS.draft.status,
      additional: {
        Icon: PR_STATUS.draft.Icon,
        iconColor: PR_STATUS.draft.iconColor,
      },
    },
    {
      key: PR_STATUS.pipelineFailed.status,
      text: PR_STATUS.pipelineFailed.status,
      additional: {
        Icon: PR_STATUS.pipelineFailed.Icon,
        iconColor: PR_STATUS.pipelineFailed.iconColor,
      },
    },
    {
      key: PR_STATUS.setToMerge.status,
      text: PR_STATUS.setToMerge.status,
      additional: {
        Icon: PR_STATUS.setToMerge.Icon,
        iconColor: PR_STATUS.setToMerge.iconColor,
      },
    },
    {
      key: PR_STATUS.readyToMerge.status,
      text: PR_STATUS.readyToMerge.status,
      additional: {
        Icon: PR_STATUS.readyToMerge.Icon,
        iconColor: PR_STATUS.readyToMerge.iconColor,
      },
    },
    {
      key: PR_STATUS.readyForReview.status,
      text: PR_STATUS.readyForReview.status,
      additional: {
        Icon: PR_STATUS.readyForReview.Icon,
        iconColor: PR_STATUS.readyForReview.iconColor,
      },
    },
    {
      key: PR_STATUS.inProgress.status,
      text: PR_STATUS.inProgress.status,
      additional: {
        Icon: PR_STATUS.inProgress.Icon,
        iconColor: PR_STATUS.inProgress.iconColor,
      },
    },
  ];
};
