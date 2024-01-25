import { HeadPipelineStatus, PIPELINE_STATUS, StatusObject } from "./constants";

export const getPipelineStatus = (status: HeadPipelineStatus): StatusObject => {
  switch (status) {
    case "CREATED":
      return PIPELINE_STATUS.created;
    case "WAITING_FOR_RESOURCE":
      return PIPELINE_STATUS.waitingForResource;
    case "PREPARING":
      return PIPELINE_STATUS.preparing;
    case "PENDING":
      return PIPELINE_STATUS.pending;
    case "RUNNING":
      return PIPELINE_STATUS.running;
    case "FAILED":
      return PIPELINE_STATUS.failed;
    case "SUCCESS":
      return PIPELINE_STATUS.success;
    case "CANCELED":
      return PIPELINE_STATUS.canceled;
    case "SKIPPED":
      return PIPELINE_STATUS.skipped;
    case "MANUAL":
      return PIPELINE_STATUS.manual;
    case "SCHEDULED":
      return PIPELINE_STATUS.scheduled;
    default:
      return {} as StatusObject;
  }
};
