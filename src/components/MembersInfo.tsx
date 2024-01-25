import { useContext } from "react";
import { useGraphWithCredential } from "@microsoft/teamsfx-react";
import { Stack } from "@fluentui/react";
import { PRTabsMenu } from "./prTabs/PRTabsMenu";
import { Loading } from "./Loading";
import { Error } from "./Error";
import { TeamsFxContext } from "../contexts/Context";
import { MembersContext } from "../contexts/Context";

type memberObject = {
  "@odata.type"?: string;
  id?: string;
  roles?: string[];
  displayName?: string;
  visibleHistoryStartDateTime?: string;
  userId?: string;
  email?: string;
  tenantId?: string;
  mail?: string;
};

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
  const { teamsUserCredential } = useContext(TeamsFxContext);
  const {
    loading,
    error,
    data: members,
    reload,
  } = useGraphWithCredential(
    async (graph) => {
      const membersInfo = await graph
        .api(`/${type}/${id}/members`)
        .select(`${type === "groups" ? "displayName,mail" : ""}`)
        .version(version)
        .get();
      if (type === "groups") {
        return membersInfo.value.map((member: memberObject) => ({
          name: member.displayName,
          username: member.mail?.slice(0, member.mail.indexOf("@")),
        }));
      } else {
        return membersInfo.value.map((member: memberObject) => ({
          name: member.displayName,
          username: member.email?.slice(0, member.email.indexOf("@")),
        }));
      }
    },
    {
      scope: scope,
      credential: teamsUserCredential,
    }
  );

  if (loading) {
    return <Loading loadingText="Getting members from teams..." />;
  }
  if (error || !members) {
    console.log("Error while gettting token to call MS Graph API:", error);
    return (
      <Error
        errorMessage="Please authorize using using your Microsoft account"
        reload={reload}
        autoReload
        error={String(error)}
      />
    );
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
