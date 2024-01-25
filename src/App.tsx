import { useState, useEffect } from "react";
import { app } from "@microsoft/teams-js";
import {
  useTeamsUserCredential,
  TeamsContextWithCredential,
} from "@microsoft/teamsfx-react";
import { ApolloProvider } from "@apollo/client";
import {
  FluentProvider,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  tokens,
} from "@fluentui/react-components";
import { Stack } from "@fluentui/react";
import { TeamsFxContext } from "./contexts/Context";
import { TEAMS_CONFIG } from "./utilities/constants";
import { PRsManager } from "./components/PRsManager";
import { clientGitLab } from "./utilities/queryClients";

export default function App() {
  const {
    loading,
    themeString,
    teamsUserCredential,
    theme,
  }: TeamsContextWithCredential = useTeamsUserCredential({
    //initiateLoginEndpoint: TEAMS_CONFIG.INITIATE_LOGIN_ENDPOINT,
    initiateLoginEndpoint:
      window.location.origin +
      (window.location.pathname.includes("configuration.html")
        ? window.location.pathname.slice(0, -21)
        : window.location.pathname.slice(0, -1)) +
      "/auth-start.html",
    clientId: TEAMS_CONFIG.CLIENT_ID,
  });

  const [context, setContext] = useState<app.Context>();
  useEffect(() => {
    loading &&
      app.initialize().then(async () => {
        if (loading) {
          app.notifySuccess();
        }
        app
          .getContext()
          .then((contextObject: app.Context) => setContext(contextObject));
      });
  }, [loading]);

  console.log("From App.jsx", context, !loading);

  return (
    <TeamsFxContext.Provider
      value={{ theme, themeString, teamsUserCredential }}
    >
      <FluentProvider
        theme={
          themeString === "dark"
            ? teamsDarkTheme
            : themeString === "contrast"
            ? teamsHighContrastTheme
            : {
                ...teamsLightTheme,
              }
        }
        style={{ background: tokens.colorNeutralBackground3 }}
      >
        {!loading && context && (
          <Stack>
            <ApolloProvider client={clientGitLab}>
              <PRsManager context={context} />
            </ApolloProvider>
          </Stack>
        )}
      </FluentProvider>
    </TeamsFxContext.Provider>
  );
}
