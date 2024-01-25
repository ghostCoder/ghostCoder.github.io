import { TEAMS_CONFIG } from "../../constants";

export const getGitLabPATKey = (): string => {
  return `${TEAMS_CONFIG.CLIENT_ID}:gitlab-access-token`;
};
