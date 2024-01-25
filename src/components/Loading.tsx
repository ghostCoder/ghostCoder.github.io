import { Stack } from "@fluentui/react";
import { Spinner } from "@fluentui/react-components";

export const Loading = ({ loadingText }: { loadingText: string }) => {
  console.log("Loading Text: ", loadingText);
  return (
    <Stack
      verticalAlign="center"
      horizontalAlign="center"
      verticalFill
      styles={{
        root: {
          height: "90vh",
        },
      }}
    >
      <Spinner size="medium" label={loadingText} labelPosition="below" />
    </Stack>
  );
};
