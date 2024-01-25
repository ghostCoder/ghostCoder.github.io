import { useState, useEffect } from "react";
import { Stack } from "@fluentui/react";
import { PRTabsMenu } from "./prTabs/PRTabsMenu";
import { Loading } from "./Loading";
import { Error } from "./Error";
import { MembersContext } from "../contexts/Context";
import { getMSRefreshTokenKey } from "../utilities/tokenValidationUtilities/getters/getMSRefreshTokenKey";
import { refreshMSTokens } from "../utilities/tokenValidationUtilities/refreshMSTokens";
import { popupMicrosoft } from "../utilities/tokenValidationUtilities/popupMicrosoft";
import { getMembers } from "../utilities/getMembers";

export const MembersInfo = ({
  version,
  type,
  id,
  scope,
  user,
}: {
  version: "v1.0" | "beta";
  type: "groups" | "chats";
  id: string | undefined;
  scope: string[];
  user: string;
}) => {
  const [members, setMembers] = useState<{ name: string; username: string }[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [MSInCache, setMSInCache] = useState<boolean>(
    !!localStorage.getItem(getMSRefreshTokenKey())
  );

  const [refresh, setRefresh] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const reload = () => setRefresh((refresh) => !refresh);

  useEffect(() => {
    if (MSInCache) {
      setLoading(true);
      (async () => {
        try {
          const response = await refreshMSTokens();
          console.log("MS access token refreshed: ", response);
          const members = await getMembers(type, id);
          console.log("Members from Teams chat/channel: ", members);
          setMembers(members);
          setLoading(false);
        } catch (error) {
          console.log("Error refreshing MS token from cache: ", error);
          setMSInCache(false);
          setLoading(true);
          setError(error as string);
        }
      })();
    }
  }, [MSInCache, refresh, type, id]);

  if (!MSInCache) {
    console.log("Error while gettting token to call MS Graph API:", error);
    return (
      <Error
        errorMessage="Please authorize using using your Microsoft account so that the app can fetch chat/channel members"
        reload={reload}
        autoReload
        error={error}
        popupMicrosoft={popupMicrosoft}
        setMSInCache={setMSInCache}
        setError={setError}
      />
    );
  }

  if (loading) {
    return <Loading loadingText="Getting members from teams..." />;
  }

  console.log("Member usernames from Teams : ", members);
  console.log("Current user is: ", user);

  return (
    <Stack>
      <MembersContext.Provider value={{ members, user, reload }}>
        <PRTabsMenu />
      </MembersContext.Provider>
    </Stack>
  );
};
