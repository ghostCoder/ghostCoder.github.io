import { TEAMS_CONFIG } from "../../constants";

export const getMSRefreshTokenKey = (): string => {
  return `${TEAMS_CONFIG.CLIENT_ID}:MS-refresh-token`;
};
