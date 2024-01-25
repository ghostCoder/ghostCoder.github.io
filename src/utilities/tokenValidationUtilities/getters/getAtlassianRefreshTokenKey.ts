import { TEAMS_CONFIG } from "../../constants";

export const getAtlassianRefreshTokenKey = (): string => {
  return `${TEAMS_CONFIG.CLIENT_ID}:atlassian-refresh-token`;
};
