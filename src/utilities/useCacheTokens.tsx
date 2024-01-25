import { useState, useEffect } from "react";
import { validateGitLabToken } from "./tokenValidationUtilities/validateGitLabToken";
import { refreshAtlassianTokens } from "./tokenValidationUtilities/refreshAtlassianTokens";
import { getGitLabPATKey } from "./tokenValidationUtilities/getters/getGitLabPATKey";
import { getAtlassianRefreshTokenKey } from "./tokenValidationUtilities/getters/getAtlassianRefreshTokenKey";

export const useCacheTokens = () => {
  const [gitInCache, setGitInCache] = useState<boolean>(
    () => !!localStorage.getItem(getGitLabPATKey())
  );

  const [atlassianInCache, setAtlassianInCache] = useState<boolean>(
    () => !!localStorage.getItem(getAtlassianRefreshTokenKey())
  );

  const [networkError, setNetworkError] = useState<boolean>(false);

  useEffect(() => {
    if (gitInCache) {
      (async () => {
        try {
          const response = await validateGitLabToken();
          console.log("GitLab PAT validated: ", response);
        } catch (error) {
          console.log("GitLab PAT validation failed: ", error);
          if (String(error).startsWith("TypeError: Failed to fetch")) {
            if (networkError === false) {
              setNetworkError(true);
            }
          } else {
            setGitInCache(false);
          }
        }
      })();
    }
  }, [gitInCache, networkError]);

  useEffect(() => {
    if (atlassianInCache) {
      (async () => {
        try {
          const response = await refreshAtlassianTokens();
          console.log("Atlassian access token refreshed: ", response);
        } catch (error) {
          console.log("Error refreshing atlassian token from cache: ", error);
          if (String(error).startsWith("TypeError: Failed to fetch")) {
            if (networkError === false) {
              setNetworkError(true);
            }
          } else {
            setAtlassianInCache(false);
          }
        }
      })();
    }
  }, [atlassianInCache, networkError]);
  return {
    gitInCache,
    setGitInCache,
    atlassianInCache,
    setAtlassianInCache,
    networkError,
    setNetworkError,
  };
};
