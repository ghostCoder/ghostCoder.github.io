import { TEAMS_CONFIG } from "../../constants";

export const getGitLabPATValue = (): string | null => {
  return localStorage.getItem(`${TEAMS_CONFIG.CLIENT_ID}:gitlab-access-token`);
};
