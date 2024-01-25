import { useState } from "react";
import { Stack } from "@fluentui/react";
import {
  Tab,
  TabList,
  SelectTabEvent,
  SelectTabData,
  TabValue,
} from "@fluentui/react-components";
import { ReviewRequestedPRs } from "./tabs/ReviewRequestedPRs";
import { GroupPRs } from "./tabs/GroupPRs";
import { MyPRs } from "./tabs/MyPRs";
import { GroupsMergedPRs } from "./tabs/GroupsMergedPRs";
import { TAB_TYPE } from "../../utilities/constants";

export const PRTabsMenu = () => {
  const [selectedValue, setSelectedValue] = useState<TabValue>(
    TAB_TYPE.reviewRequested
  );

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData): void => {
    setSelectedValue(data.value);
  };

  return (
    <Stack>
      <TabList
        selectedValue={selectedValue}
        defaultSelectedValue={TAB_TYPE.reviewRequested}
        onTabSelect={onTabSelect}
      >
        <Tab value={TAB_TYPE.reviewRequested}>{TAB_TYPE.reviewRequested}</Tab>
        <Tab value={TAB_TYPE.groupPRs}>{TAB_TYPE.groupPRs}</Tab>
        <Tab value={TAB_TYPE.myPRs}>{TAB_TYPE.myPRs}</Tab>
        <Tab value={TAB_TYPE.groupsMergedPRs}>{TAB_TYPE.groupsMergedPRs}</Tab>
      </TabList>
      {selectedValue === TAB_TYPE.reviewRequested && <ReviewRequestedPRs />}
      {selectedValue === TAB_TYPE.groupPRs && <GroupPRs />}
      {selectedValue === TAB_TYPE.myPRs && <MyPRs />}
      {selectedValue === TAB_TYPE.groupsMergedPRs && <GroupsMergedPRs />}
    </Stack>
  );
};
