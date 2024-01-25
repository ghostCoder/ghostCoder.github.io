import { getAtlassianAccessTokenKey } from "./getters/getAtlassianAcessTokenKey";
import { getAtlassianRefreshTokenKey } from "./getters/getAtlassianRefreshTokenKey";
import {
  ATL_CLIENT_ID,
  ATL_CLIENT_SECRET,
  ATL_REFRESH_URL,
} from "../constants";

export const refreshAtlassianTokens = async function (): Promise<{
  refresh_token: string;
  access_token: string;
}> {
  return new Promise(async (resolve, reject) => {
    const refreshToken = localStorage.getItem(getAtlassianRefreshTokenKey());
    console.log(
      "Atlassian refresh token found in local storage: ",
      refreshToken
    );
    try {
      if (refreshToken) {
        const response = await fetch(ATL_REFRESH_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            grant_type: "refresh_token",
            client_id: ATL_CLIENT_ID,
            client_secret: ATL_CLIENT_SECRET,
            refresh_token: refreshToken,
          }),
        });
        const json = await response.json();
        console.log("Refreshed tokens for Jira API: ", json);
        if (json.access_token) {
          localStorage.setItem(getAtlassianAccessTokenKey(), json.access_token);
          localStorage.setItem(
            getAtlassianRefreshTokenKey(),
            json.refresh_token
          );
          resolve({
            refresh_token: json.refresh_token,
            access_token: json.access_token,
          });
        } else {
          localStorage.removeItem(getAtlassianAccessTokenKey());
          localStorage.removeItem(getAtlassianRefreshTokenKey());
          reject("Refresh token invalid");
        }
      } else {
        localStorage.removeItem(getAtlassianAccessTokenKey());
        localStorage.removeItem(getAtlassianRefreshTokenKey());
        reject("No Atlassian refresh token found in cache!");
      }
    } catch (error) {
      if (!String(error).startsWith("TypeError: Failed to fetch")) {
        localStorage.removeItem(getAtlassianAccessTokenKey());
        localStorage.removeItem(getAtlassianRefreshTokenKey());
      }
      reject(error);
    }
  });
};
