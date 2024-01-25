import { TEAMS_CONFIG } from "../../constants";

export const getMSCodeVerifierKey = (): string => {
  return `${TEAMS_CONFIG.CLIENT_ID}:MS-code-verifier`;
};
