import { MS_REFRESH_URL, TEAMS_CONFIG } from "../constants";
import { getMSAccessTokenKey } from "./getters/getMSAccessTokenKey";
import { getMSRefreshTokenKey } from "./getters/getMSRefreshTokenKey";

export const refreshMSTokens = async function (): Promise<{
  refresh_token: string;
  access_token: string;
}> {
  return new Promise(async (resolve, reject) => {
    const refreshToken = localStorage.getItem(getMSRefreshTokenKey());
    console.log("MS refresh token found in local storage: ", refreshToken);
    try {
      if (refreshToken) {
        const response = await fetch(MS_REFRESH_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id: TEAMS_CONFIG.CLIENT_ID,
            refresh_token: refreshToken,
            grant_type: "refresh_token",
          }),
        });
        const json = await response.json();
        console.log("Refreshed tokens for MS: ", json);
        if (json.access_token) {
          localStorage.setItem(getMSAccessTokenKey(), json.access_token);
          localStorage.setItem(getMSRefreshTokenKey(), json.refresh_token);
          resolve({
            refresh_token: json.refresh_token,
            access_token: json.access_token,
          });
        } else {
          localStorage.removeItem(getMSAccessTokenKey());
          localStorage.removeItem(getMSRefreshTokenKey());
          reject("Refresh token invalid");
        }
      } else {
        localStorage.removeItem(getMSAccessTokenKey());
        localStorage.removeItem(getMSRefreshTokenKey());
        reject("No MS refresh token found in cache!");
      }
    } catch (error) {
      if (!String(error).startsWith("TypeError: Failed to fetch")) {
        localStorage.removeItem(getMSAccessTokenKey());
        localStorage.removeItem(getMSRefreshTokenKey());
      }
      reject(error);
    }
  });
};
