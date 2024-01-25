import { TEAMS_CONFIG } from "../../constants";

export const getMSAccessTokenKey = (): string => {
  return `${TEAMS_CONFIG.CLIENT_ID}:MS-access-token`;
};
