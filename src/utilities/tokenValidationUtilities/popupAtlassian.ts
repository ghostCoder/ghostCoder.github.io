import { getAtlassianRefreshTokenKey } from "./getters/getAtlassianRefreshTokenKey";
import { getAtlassianAccessTokenKey } from "./getters/getAtlassianAcessTokenKey";
import * as microsoftTeams from "@microsoft/teams-js";

export const popupAtlassian = function (
  setAtlassianInCache: React.Dispatch<React.SetStateAction<boolean>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
): void {
  setLoading(true);
  microsoftTeams.app.initialize().then(async () => {
    microsoftTeams.authentication.authenticate({
      url:
        window.location.origin +
        (window.location.pathname.includes("configuration.html")
          ? window.location.pathname.slice(0, -21)
          : window.location.pathname.slice(0, -1)) +
        "/atlassian-auth-start.html",
      width: 600,
      height: 900,
      successCallback: function (result: string): void {
        const tokens: {
          access_token: string;
          refresh_token: string;
          expires_in: number;
          scope: string;
          token_type: string;
        } = JSON.parse(result);
        localStorage.setItem(
          getAtlassianRefreshTokenKey(),
          tokens.refresh_token
        );
        setAtlassianInCache(true);
        setLoading(false);
      },
      failureCallback: function (reason: string): void {
        console.log("Atlassian authentication failed: ", reason);
        localStorage.removeItem(getAtlassianRefreshTokenKey());
        localStorage.removeItem(getAtlassianAccessTokenKey());
        setLoading(false);
      },
    });
  });
};
