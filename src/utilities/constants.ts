import {
  Drafts24Regular,
  ErrorCircle24Regular,
  Checkmark24Regular,
  Timer24Regular,
  Merge24Regular,
  DismissCircle24Regular,
  Add24Regular,
  Circle24Regular,
  MoreCircle24Regular,
  PauseCircle24Regular,
  CircleHalfFill24Regular,
  CheckmarkCircle24Regular,
  CircleLine24Regular,
  ArrowCircleRight24Regular,
  Settings24Regular,
  Clock24Regular,
  FluentIcon,
} from "@fluentui/react-icons";
import { tokens } from "@fluentui/react-components";

// MS Teams and Graph API constants
// THIS CONSTANT NEEDS TO BE CHANGED ON CHANGING THE REGISTERED APP ON AZURE

export const TEAMS_CONFIG: { CLIENT_ID: string } = {
  CLIENT_ID: "7674fd74-8f6a-4ddd-870f-396349aa44d6",
};

export const TEAM_READ_SCOPES: string[] = [
  "GroupMember.Read.All",
  "User.ReadBasic.All",
];
export const CHAT_READ_SCOPES: string[] = [
  "ChatMember.Read",
  "User.ReadBasic.All",
];

// Atlassian Constants

export const ATL_CLIENT_ID: string = "oDw4QhW5t8135WXarJv2IdcfNTseeMdM";
export const ATL_CLIENT_SECRET: string =
  "ATOAYnRxygVWCgVBrIMPecAldDGzBo7dJWZyGyGrfgTvAy7txs_6NB7iS-ur2GKNBmeW86D34ECA";
export const ATL_HOST_SPRTEST: string = "https://sprtest.atlassian.net";
export const ATL_HOST_SPRINKLR: string = "https://sprinklr.atlassian.net";
export const ATL_ACCESS_TOKEN_URL: string =
  "https://auth.atlassian.com/oauth/token";
export const ATL_REFRESH_URL: string = ATL_ACCESS_TOKEN_URL;
export const ATLASSIAN_SPRTEST_CLOUD_ID: string =
  "fb18b6d9-86e0-4713-95e8-8c51ed24ef6d";
export const ATLASSIAN_SPRINKLR_CLOUD_ID: string =
  "95531a2e-c5af-4074-bf24-7cbaf74d4a25";
export const JIRA_LABELS_ENDPOINT: string = `https://api.atlassian.com/ex/jira/${ATLASSIAN_SPRINKLR_CLOUD_ID}/rest/api/3/issue/`;
export const JIRA_ISSUE_LINK: string = ATL_HOST_SPRINKLR + "/browse/";

// GitLab constants

export const GIT_VALIDATION_QUERY: string =
  "query currentUser {currentUser {name}}";
export const GIT_VALIDATION_URL: string =
  "https://prod-gitlab.sprinklr.com/api/graphql";
export const GIT_API_URL: string =
  "https://prod-gitlab.sprinklr.com/api/graphql";

export type TabNames =
  | "Review requested"
  | "My PR's"
  | "Group PR's"
  | "Group's merged PR's";

// Tab Types for PR Tabs
export const TAB_TYPE: {
  [key: string]: TabNames;
} = {
  reviewRequested: "Review requested",
  myPRs: "My PR's",
  groupPRs: "Group PR's",
  groupsMergedPRs: "Group's merged PR's",
};

// PR statuses
export type StatusObject = {
  status: string;
  Icon: FluentIcon;
  iconColor?: string;
};

export const PR_STATUS: {
  [key: string]: StatusObject;
} = {
  draft: { status: "Draft", Icon: Drafts24Regular },
  mergeConflicts: {
    status: "Merge conflicts",
    Icon: ErrorCircle24Regular,
    iconColor: tokens.colorPaletteDarkOrangeBorderActive,
  },
  readyToMerge: {
    status: "Ready to merge",
    Icon: Checkmark24Regular,
    iconColor: tokens.colorPaletteGreenBorderActive,
  },
  readyForReview: {
    status: "Ready for review",
    Icon: Timer24Regular,
    iconColor: tokens.colorPaletteMarigoldBorderActive,
  },
  setToMerge: { status: "Set to merge", Icon: Merge24Regular },
  pipelineFailed: {
    status: "Pipeline failed",
    Icon: DismissCircle24Regular,
    iconColor: tokens.colorPaletteRedBorderActive,
  },
  inProgress: {
    status: "In progress",
    Icon: MoreCircle24Regular,
    iconColor: tokens.colorPaletteLavenderBorderActive,
  },
};

// Pipeline status
export const PIPELINE_STATUS: { [key: string]: StatusObject } = {
  created: { status: "Created", Icon: Add24Regular },
  waitingForResource: {
    status: "Waiting for resource",
    Icon: Circle24Regular,
    iconColor: tokens.colorPaletteGoldBorderActive,
  },
  preparing: {
    status: "Preparing",
    Icon: MoreCircle24Regular,
  },
  pending: {
    status: "Pending",
    Icon: PauseCircle24Regular,
    iconColor: tokens.colorPaletteMarigoldBorderActive,
  },
  running: {
    status: "Running",
    Icon: CircleHalfFill24Regular,
    iconColor: tokens.colorPaletteBlueBorderActive,
  },
  failed: {
    status: "Failed",
    Icon: DismissCircle24Regular,
    iconColor: tokens.colorPaletteRedBorderActive,
  },
  success: {
    status: "Success",
    Icon: CheckmarkCircle24Regular,
    iconColor: tokens.colorPaletteGreenBorderActive,
  },
  canceled: {
    status: "Canceled",
    Icon: CircleLine24Regular,
  },
  skipped: {
    status: "Skipped",
    Icon: ArrowCircleRight24Regular,
  },
  manual: {
    status: "Manual",
    Icon: Settings24Regular,
  },
  scheduled: {
    status: "Scheduled",
    Icon: Clock24Regular,
  },
};

// Mutation types
export const MUTATION_TYPE: { [key: string]: string } = {
  setReviewers: "setReviewers",
  setAssignees: "setAssignees",
};

// Custom types
export type Person = {
  username: string;
  name: string;
};

export type HeadPipelineStatus =
  | "CREATED"
  | "WAITING_FOR_RESOURCE"
  | "PREPARING"
  | "WAITING_FOR_CALLBACK"
  | "PENDING"
  | "RUNNING"
  | "FAILED"
  | "SUCCESS"
  | "CANCELED"
  | "SKIPPED"
  | "MANUAL"
  | "SCHEDULED";

export type MemberPR = {
  authoredMergeRequests: {
    nodes: PR[];
  };
};

export type PR = {
  id: string;
  author?: Person;
  title: string;
  webUrl: string;
  reviewers: {
    nodes: Person[];
  };
  assignees:
    | {
        nodes: Person[];
      }
    | undefined;
  labels: {
    nodes: {
      title: string;
    }[];
  };
  draft: boolean;
  conflicts: boolean;
  approvedBy: {
    nodes: Person[];
  };
  project: {
    fullPath: string;
  };
  iid: string;
  autoMergeEnabled: boolean;
  approved: boolean;
  headPipeline: {
    status: HeadPipelineStatus;
  };
  jiraLabels?: string[];
};

export type option = {
  key: string;
  text: string;
  additional?: {
    Icon?: FluentIcon;
    iconColor?: string | undefined;
  };
};

export type PRItem = {
  key: string;
  title: string;
  webUrl: string;
  reviewers: Person[];
  prLabels: { title: string }[];
  assignees: Person[] | undefined;
  jiraLabels: string[] | undefined;
  pipelineStatus: StatusObject;
  projectPath: string;
  iid: string;
  approvedBy: Person[];
  prStatus?: StatusObject;
};
