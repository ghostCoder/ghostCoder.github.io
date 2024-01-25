import { TEAMS_CONFIG } from "../../constants";

export const getAtlassianAccessTokenValue = (): string | null => {
  return localStorage.getItem(
    `${TEAMS_CONFIG.CLIENT_ID}:atlassian-access-token`
  );
};
