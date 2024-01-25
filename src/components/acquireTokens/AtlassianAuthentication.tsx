import { useState } from "react";
import { popupAtlassian } from "../../utilities/tokenValidationUtilities/popupAtlassian";
import { Button, Text, Image } from "@fluentui/react-components";
import { Stack } from "@fluentui/react";
import { CheckmarkCircle24Regular } from "@fluentui/react-icons";
import atlassianLogoBlue from "../../assets/atlassian-logo-blue.svg";

export const AtlassianAuthentication = ({
  setAtlassianInCache,
  atlassianInCache,
}: {
  setAtlassianInCache: React.Dispatch<React.SetStateAction<boolean>>;
  atlassianInCache: boolean;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Stack
      verticalAlign="center"
      horizontalAlign="center"
      enableScopedSelectors
      tokens={{ childrenGap: "1.8em" }}
    >
      <Image
        alt="Atlassian logo"
        src={atlassianLogoBlue}
        height={60}
        width={350}
      />
      <Stack
        verticalAlign="center"
        horizontalAlign="center"
        enableScopedSelectors
        tokens={{ childrenGap: "1.5em" }}
      >
        <Text size={400}>
          {atlassianInCache === false
            ? "In order to fetch data from Jira we need you to do authentication by pressing the button:"
            : "Atlassian account authenticated!"}
        </Text>
        <Stack
          horizontal
          enableScopedSelectors
          tokens={{ childrenGap: "1em" }}
          verticalAlign="center"
        >
          <Button
            disabled={loading || atlassianInCache}
            appearance="primary"
            onClick={() => {
              popupAtlassian(setAtlassianInCache, setLoading);
            }}
          >
            Authenticate
          </Button>
          {atlassianInCache && <CheckmarkCircle24Regular />}
        </Stack>
      </Stack>
    </Stack>
  );
};
