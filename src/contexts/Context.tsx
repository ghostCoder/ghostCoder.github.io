import { createContext } from "react";
import { TeamsContextWithCredential } from "@microsoft/teamsfx-react";
import { Theme } from "@fluentui/react-components";

type TeamsFxContextObject = {
  theme: Theme | undefined;
  themeString: string;
  teamsUserCredential: TeamsContextWithCredential["teamsUserCredential"];
};

type TokensInCacheContextObject = {
  setAtlassianInCache: React.Dispatch<React.SetStateAction<boolean>>;
  setGitInCache: React.Dispatch<React.SetStateAction<boolean>>;
  setNetworkError: React.Dispatch<React.SetStateAction<boolean>>;
  atlassianInCache: boolean;
  gitInCache: boolean;
};

type MembersContextObject = {
  members: { name: string; username: string }[];
  user: string;
  reload: () => void;
};

export const TeamsFxContext = createContext<TeamsFxContextObject>({
  theme: undefined,
  themeString: "",
  teamsUserCredential: undefined,
});

export const TokensInCacheContext = createContext<TokensInCacheContextObject>(
  {} as TokensInCacheContextObject
);

export const MembersContext = createContext<MembersContextObject>(
  {} as MembersContextObject
);

export const queryClients = createContext({} as MembersContextObject);
