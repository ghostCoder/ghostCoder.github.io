import { TEAMS_CONFIG } from "../../constants";

export const getAtlassianAccessTokenKey = (): string => {
  return `${TEAMS_CONFIG.CLIENT_ID}:atlassian-access-token`;
};
