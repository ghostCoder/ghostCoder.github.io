import React, { Suspense } from "react";
import { app } from "@microsoft/teams-js";
import { Stack } from "@fluentui/react";
import { Text } from "@fluentui/react-components";
import { InfoLabel } from "@fluentui/react-components/unstable";
import { MembersInfo } from "./MembersInfo";
import { TokensInCacheContext } from "../contexts/Context";
import { TEAM_READ_SCOPES, CHAT_READ_SCOPES } from "../utilities/constants";
import { useCacheTokens } from "../utilities/useCacheTokens";
import { Loading } from "./Loading";

export const PRsManager = ({ context }: { context: app.Context }) => {
  console.log("Context object from teams: ", context);

  const {
    gitInCache,
    atlassianInCache,
    networkError,
    setNetworkError,
    setGitInCache,
    setAtlassianInCache,
  } = useCacheTokens();

  const type = context.chat === undefined ? "groups" : "chats";
  const scope = type === "groups" ? TEAM_READ_SCOPES : CHAT_READ_SCOPES;
  const version = type === "groups" ? "v1.0" : "beta";
  const id = type === "groups" ? context.team?.groupId : context.chat?.id;
  const user =
    context.user && context.user.loginHint
      ? context.user.loginHint.slice(0, context.user.loginHint.indexOf("@"))
      : "";

  const GitTokenInput = React.lazy(() =>
    import("./acquireTokens/GitTokenInput").then((module) => ({
      default: module.GitTokenInput,
    }))
  );

  const Error = React.lazy(() =>
    import("./Error").then((module) => ({
      default: module.Error,
    }))
  );

  const AtlassianAuthentication = React.lazy(() =>
    import("./acquireTokens/AtlassianAuthentication").then((module) => ({
      default: module.AtlassianAuthentication,
    }))
  );

  if (networkError) {
    return (
      <Suspense fallback={<Loading loadingText="" />}>
        <Error
          errorMessage="Failed to fetch: offline or your network doesn't have access to GitLab"
          reload={() => setNetworkError(false)}
        />
      </Suspense>
    );
  }

  if (!gitInCache || !atlassianInCache) {
    return (
      <Stack
        verticalAlign="space-evenly"
        tokens={{ childrenGap: "7.2em", padding: "2.5em" }}
      >
        <InfoLabel
          size="large"
          info={
            <Text>
              This setup is needed so the app can fetch your PR's and their Jira
              data.
            </Text>
          }
        >
          <Text size={900} weight="bold">
            App Setup
          </Text>
        </InfoLabel>
        <Stack verticalAlign="space-evenly" tokens={{ childrenGap: "3.5em" }}>
          <Suspense
            fallback={<Loading loadingText="Loading Gitlab authentication" />}
          >
            <GitTokenInput
              setGitInCache={setGitInCache}
              gitInCache={gitInCache}
            />
          </Suspense>
          <Suspense
            fallback={
              <Loading loadingText="Loading Atlassian authentication" />
            }
          >
            <AtlassianAuthentication
              setAtlassianInCache={setAtlassianInCache}
              atlassianInCache={atlassianInCache}
            />
          </Suspense>
        </Stack>
      </Stack>
    );
  }
  return (
    <TokensInCacheContext.Provider
      value={{
        setAtlassianInCache,
        setGitInCache,
        setNetworkError,
        atlassianInCache,
        gitInCache,
      }}
    >
      <MembersInfo
        version={version}
        id={id}
        type={type}
        scope={scope}
        user={user}
      />
    </TokensInCacheContext.Provider>
  );
};
