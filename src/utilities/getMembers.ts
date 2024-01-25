import { GRAPH_CHAT_MEMBERS, GRAPH_GROUP_MEMBERS } from "./constants";
import { getMSAccessTokenKey } from "./tokenValidationUtilities/getters/getMSAccessTokenKey";

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

export const getMembers = async (type: string, id?: string) => {
  const headers = new Headers();
  const accessToken = localStorage.getItem(getMSAccessTokenKey());
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };
  const ENDPOINT =
    type === "groups"
      ? GRAPH_GROUP_MEMBERS +
        "/" +
        id +
        "/" +
        "members/?$select=displayName,mail"
      : GRAPH_CHAT_MEMBERS + "/" + id + "/members";
  try {
    const response = await fetch(ENDPOINT, options);
    const membersInfo = await response.json();
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
  } catch (error) {
    console.log("Error getting members info from Graph API: ", error);
    throw String(error);
  }
};
