import { useContext } from "react";
import { app } from "@microsoft/teams-js";
import { useGraphWithCredential } from "@microsoft/teamsfx-react";
import { Stack } from "@fluentui/react";
import { PRTabsMenu } from "./prTabs/PRTabsMenu";
import { Loading } from "./Loading";
import { Error } from "./Error";
import { TeamsFxContext } from "../contexts/Context";
import { MembersContext } from "../contexts/Context";
import {
  CHAT_READ_SCOPES,
  TEAM_READ_SCOPES,
  CHANNEL_READ_SCOPES,
} from "../utilities/constants";

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
  user,
  context,
}: {
  user: string;
  context: app.Context;
}) => {
  const { teamsUserCredential } = useContext(TeamsFxContext);
  const type =
    context.chat === undefined
      ? context.team?.groupId === undefined
        ? "Teams"
        : "groups"
      : "chats";
  const scope =
    type === "Teams"
      ? CHANNEL_READ_SCOPES
      : type === "groups"
      ? TEAM_READ_SCOPES
      : CHAT_READ_SCOPES;
  const version = type === "groups" || type === "Teams" ? "v1.0" : "beta";
  const id =
    type === "Teams"
      ? `${context.channel?.ownerGroupId}/channels/${context.channel?.id}`
      : type === "groups"
      ? context.team?.groupId
      : context.chat?.id;

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
