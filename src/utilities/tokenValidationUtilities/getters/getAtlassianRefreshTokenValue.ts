import { TEAMS_CONFIG } from "../../constants";

export const getAtlassianRefreshTokenValue = (): string | null => {
  return localStorage.getItem(
    `${TEAMS_CONFIG.CLIENT_ID}:atlassian-refresh-token`
  );
};
