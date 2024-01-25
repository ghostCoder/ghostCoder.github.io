import React, { useState, Suspense } from "react";
import { Stack } from "@fluentui/react";
import {
  Tab,
  TabList,
  SelectTabEvent,
  SelectTabData,
  TabValue,
} from "@fluentui/react-components";
import { ReviewRequestedPRs } from "./tabs/ReviewRequestedPRs";
import { TAB_TYPE } from "../../utilities/constants";
import { Loading } from "../Loading";

export const PRTabsMenu = () => {
  const [selectedValue, setSelectedValue] = useState<TabValue>(
    TAB_TYPE.reviewRequested
  );

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData): void => {
    setSelectedValue(data.value);
  };

  const GroupPRs = React.lazy(() =>
    import("./tabs/GroupPRs").then((module) => ({ default: module.GroupPRs }))
  );

  const GroupsMergedPRs = React.lazy(() =>
    import("./tabs/GroupsMergedPRs").then((module) => ({
      default: module.GroupsMergedPRs,
    }))
  );

  const MyPRs = React.lazy(() =>
    import("./tabs/MyPRs").then((module) => ({
      default: module.MyPRs,
    }))
  );

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
      {selectedValue === TAB_TYPE.groupPRs && (
        <Suspense fallback={<Loading loadingText="Loading Group PR's tab" />}>
          <GroupPRs />
        </Suspense>
      )}
      {selectedValue === TAB_TYPE.myPRs && (
        <Suspense fallback={<Loading loadingText="Loading My PR's tab" />}>
          <MyPRs />
        </Suspense>
      )}
      {selectedValue === TAB_TYPE.groupsMergedPRs && (
        <Suspense
          fallback={<Loading loadingText="Loading Groups merged PR's tab" />}
        >
          <GroupsMergedPRs />
        </Suspense>
      )}
    </Stack>
  );
};
