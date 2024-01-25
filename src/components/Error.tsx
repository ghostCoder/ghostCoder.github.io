import { useRef, useEffect } from "react";
import { Stack } from "@fluentui/react";
import { Button, Text, Image } from "@fluentui/react-components";
import errorImage from "../assets/404.svg";
import microsoftLogo from "../assets/microsoft-logo.png";

type ErrorProps = {
  errorMessage: string;
  reload?: () => void;
  autoReload?: boolean;
  error?: string;
  popupMicrosoft?: (
    setMSInCache: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  setMSInCache?: React.Dispatch<React.SetStateAction<boolean>>;
  setError?: React.Dispatch<React.SetStateAction<string>>;
};
export const Error = ({
  errorMessage,
  reload,
  autoReload,
  error,
  popupMicrosoft,
  setMSInCache,
  setError,
}: ErrorProps) => {
  const reloadRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  useEffect(() => {
    if (autoReload) {
      reloadRef.current?.click();
    }
  }, [autoReload, error]);

  return (
    <Stack
      enableScopedSelectors
      verticalAlign="center"
      horizontalAlign="center"
      verticalFill
      styles={{
        root: {
          height: "85vh",
        },
      }}
      tokens={{ childrenGap: "3.5em" }}
    >
      {autoReload ? (
        <Image
          alt="Microsoft Logo"
          src={microsoftLogo}
          height={100}
          width={440}
        />
      ) : (
        <Image alt="404 error image" src={errorImage} height={170} />
      )}
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
        enableScopedSelectors
        tokens={{ childrenGap: "2.7em" }}
      >
        <Stack
          enableScopedSelectors
          horizontalAlign="center"
          verticalAlign="center"
          tokens={{ childrenGap: "0.6em" }}
        >
          {!autoReload && (
            <Text size={700} block>
              Oops! Something went wrong.
            </Text>
          )}
          <Text size={500} block>
            {error}
          </Text>
          <Text size={500} block>
            {errorMessage}
          </Text>
        </Stack>
        {reload && (
          <Button
            ref={reloadRef}
            appearance="primary"
            onClick={
              popupMicrosoft
                ? () => popupMicrosoft(setMSInCache!, setError!)
                : reload
            }
          >
            {autoReload ? "Authorize" : "Reload"}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
