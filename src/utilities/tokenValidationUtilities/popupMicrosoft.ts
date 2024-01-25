import * as microsoftTeams from "@microsoft/teams-js";
import { getMSRefreshTokenKey } from "./getters/getMSRefreshTokenKey";
import { getMSAccessTokenKey } from "./getters/getMSAccessTokenKey";

export const popupMicrosoft = function (
  setMSInCache: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>
): void {
  microsoftTeams.app.initialize().then(async () => {
    microsoftTeams.authentication.authenticate({
      url:
        window.location.origin +
        (window.location.pathname.includes("configuration.html")
          ? window.location.pathname.slice(0, -21)
          : window.location.pathname.slice(0, -1)) +
        "/auth-start.html",
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
        localStorage.setItem(getMSRefreshTokenKey(), tokens.refresh_token);
        setMSInCache(true);
      },
      failureCallback: function (reason: string): void {
        console.log("MS authentication failed: ", reason);
        localStorage.removeItem(getMSRefreshTokenKey());
        localStorage.removeItem(getMSAccessTokenKey());
        setError(reason);
        setMSInCache(false);
      },
    });
  });
};
