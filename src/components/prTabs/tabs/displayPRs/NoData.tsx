import { Stack } from "@fluentui/react";
import { Text, Image } from "@fluentui/react-components";
import noDataImage from "../../../../assets/no-data.svg";

export const NoData = () => {
  return (
    <Stack
      enableScopedSelectors
      verticalAlign="center"
      horizontalAlign="center"
      verticalFill
      styles={{
        root: {
          height: "65vh",
        },
      }}
      tokens={{ childrenGap: "1em" }}
    >
      <Image alt="No data image" src={noDataImage} height={170} />
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
        enableScopedSelectors
        tokens={{ childrenGap: "2.7em" }}
      >
        <Text size={500} block>
          No PR's to show
        </Text>
      </Stack>
    </Stack>
  );
};
