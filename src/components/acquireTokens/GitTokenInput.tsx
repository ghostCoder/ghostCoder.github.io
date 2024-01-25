import { useState, useContext } from "react";
import {
  Text,
  Button,
  Divider,
  Input,
  makeStyles,
  Image,
  tokens,
  Link,
  Tooltip,
} from "@fluentui/react-components";
import { useId } from "@fluentui/react-utilities";
import { Stack } from "@fluentui/react";
import { CheckmarkCircle24Regular } from "@fluentui/react-icons";
import { TeamsFxContext } from "../../contexts/Context";
import { validateGitLabToken } from "../../utilities/tokenValidationUtilities/validateGitLabToken";
import gitLabLogoLight from "../../assets/gitlab-logo-light.svg";
import gitLabLogoDark from "../../assets/gitlab-logo-dark.svg";

const useStyles = makeStyles({
  input: {
    width: "35em",
  },
  error: {
    //color: tokens.colorPaletteRedBackground3,
    color: tokens.colorPaletteRedBorderActive,
  },
});

export const GitTokenInput = ({
  setGitInCache,
  gitInCache,
}: {
  setGitInCache: React.Dispatch<React.SetStateAction<boolean>>;
  gitInCache: boolean;
}) => {
  const [gitErrMsg, setGitErrMsg] = useState<string>("");
  const [gitLabToken, setGitLabToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const errorMessageId = useId("error-message");

  const { themeString } = useContext(TeamsFxContext);

  const styles = useStyles();

  return (
    <Stack enableScopedSelectors tokens={{ childrenGap: "4em" }}>
      <Stack
        enableScopedSelectors
        tokens={{ childrenGap: "2.5em" }}
        verticalAlign="center"
        horizontalAlign="center"
      >
        <Image
          alt="GitLab logo"
          src={themeString === "default" ? gitLabLogoDark : gitLabLogoLight}
          height={53}
          width={240}
        />
        <Stack enableScopedSelectors tokens={{ childrenGap: "1em" }}>
          <Stack enableScopedSelectors tokens={{ childrenGap: "0.3em" }}>
            <Text size={400} align="center">
              {gitInCache === false
                ? "Looks like we don't have your GitLab personal access token. Enter your Personal access token below:"
                : "GitLab personal access token validated!"}
            </Text>
            <Text size={300} align="center">
              To create a token visit the link. The required scopes ('api') are
              pre-selected.{" "}
              <Tooltip
                content="Please save the token in case its lost from cache and still alive."
                relationship="description"
                withArrow
              >
                <Link
                  href="https://prod-gitlab.sprinklr.com/-/profile/personal_access_tokens?name=Teams+PR+manager&scopes=api"
                  target="_blank"
                >
                  Create token
                </Link>
              </Tooltip>
            </Text>
          </Stack>
          <Stack
            enableScopedSelectors
            tokens={{ childrenGap: "1.7em" }}
            //verticleAlign="center"
            horizontalAlign="center"
          >
            <Stack
              enableScopedSelectors
              //verticleAlign="center"
              horizontalAlign="center"
            >
              <Input
                aria-describedby={errorMessageId}
                type="password"
                onChange={(event) => setGitLabToken(event.target.value)}
                disabled={gitInCache}
                className={styles.input}
              />
              <Text id={errorMessageId} size={200} className={styles.error}>
                {gitErrMsg}
              </Text>
            </Stack>
            <Stack
              horizontal
              enableScopedSelectors
              verticalAlign="center"
              tokens={{ childrenGap: "1em" }}
            >
              <Button
                appearance="primary"
                disabled={loading || gitInCache}
                onClick={async () => {
                  try {
                    const response = await validateGitLabToken(
                      gitLabToken,
                      setGitErrMsg,
                      setLoading
                    );
                    console.log("GitLab PAT validated: ", response);
                    setGitInCache(true);
                  } catch (error) {
                    console.log("GitLab PAT validation failed: ", error);
                    setGitInCache(false);
                  }
                }}
              >
                Validate
              </Button>
              {gitInCache && (
                <CheckmarkCircle24Regular
                  primaryFill={tokens.colorPaletteGreenBorderActive}
                />
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Divider
        appearance={themeString === "default" ? themeString : "subtle"}
        inset
      />
    </Stack>
  );
};
