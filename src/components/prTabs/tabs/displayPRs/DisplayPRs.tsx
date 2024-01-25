import { useState, useMemo } from "react";
import { Stack } from "@fluentui/react";
import { FilterBox } from "./FilterBox";
import { GroupedTable } from "./prTables/GroupedTable";
import { PRTable } from "./prTables/PRTable";
import { NoData } from "./NoData";
import { getStatusOfPR } from "../../../../utilities/getStatusOfPR";
import { getPipelineStatus } from "../../../../utilities/getPipelineStatus";
import { getPRLabelOptions } from "../../../../utilities/filterUtilities/optionsForFilterMenu/getPRLabelOptions";
import { getStatusOptions } from "../../../../utilities/filterUtilities/optionsForFilterMenu/getStatusOptions";
import { getJiraLabelOptions } from "../../../../utilities/filterUtilities/optionsForFilterMenu/getJiraLabelOptions";
import { filterByPRLabel } from "../../../../utilities/filterUtilities/filters/filterByPRLabel";
import { filterByPRStatus } from "../../../../utilities/filterUtilities/filters/filterByPRStatus";
import { filterByJiraLabel } from "../../../../utilities/filterUtilities/filters/filterByJiraLabel";
import { PR, PRItem, TAB_TYPE } from "../../../../utilities/constants";

export const DisplayPRs = ({
  data,
  tabType,
}: {
  data: PR[];
  tabType: string;
}) => {
  const [selectedPRLabels, setSelectedPRLabels] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedJiraLabels, setSelectedJiraLabels] = useState<string[]>([]);

  const PRlabelOptions = useMemo(() => getPRLabelOptions(data), [data]);
  const statusOptions = getStatusOptions();
  const jiraLabelOptions = useMemo(() => getJiraLabelOptions(data), [data]);

  const filteredByPRLabels = useMemo(
    () => filterByPRLabel(data, selectedPRLabels),
    [data, selectedPRLabels]
  );
  const filteredByPRStatus = useMemo(
    () =>
      filterByPRStatus(
        filteredByPRLabels,
        selectedStatuses,
        statusOptions.length
      ),
    [filteredByPRLabels, statusOptions.length, selectedStatuses]
  );
  const filteredData = useMemo(
    () => filterByJiraLabel(filteredByPRStatus, selectedJiraLabels),
    [filteredByPRStatus, selectedJiraLabels]
  );

  const finalFilteredData = useMemo(
    () =>
      tabType === TAB_TYPE.reviewRequested
        ? [...filteredData].sort((pr1, pr2) =>
            pr1.author!.username.localeCompare(pr2.author!.username)
          )
        : filteredData,
    [filteredData, tabType]
  );

  let groups: {
    key: string;
    name: string;
    startIndex: number;
    count: number;
  }[] = [];
  if (
    tabType === TAB_TYPE.reviewRequested ||
    tabType === TAB_TYPE.groupPRs ||
    tabType === TAB_TYPE.groupsMergedPRs
  ) {
    for (let index = 0; index < finalFilteredData.length; index++) {
      const user = finalFilteredData[index];
      if (
        groups.length === 0 ||
        groups[groups.length - 1].key !== user.author!.username
      ) {
        groups = [
          ...groups,
          {
            key: user.author!.username,
            name: `${user.author!.name}'s Pull requests`,
            startIndex: index,
            count: 1,
          },
        ];
      } else {
        groups[groups.length - 1].count += 1;
      }
    }
  }

  const items: PRItem[] = useMemo(() => {
    if (tabType === TAB_TYPE.groupsMergedPRs) {
      return finalFilteredData.map((pr) => ({
        key: pr.id,
        title: pr.title,
        webUrl: pr.webUrl,
        reviewers: pr.reviewers.nodes,
        prLabels: pr.labels.nodes,
        assignees: pr.assignees?.nodes,
        jiraLabels: pr.jiraLabels,
        pipelineStatus: getPipelineStatus(pr.headPipeline?.status),
        projectPath: pr.project.fullPath,
        iid: String(pr.iid),
        approvedBy: pr.approvedBy.nodes,
      }));
    } else {
      return finalFilteredData.map((pr) => ({
        key: pr.id,
        title: pr.title,
        webUrl: pr.webUrl,
        reviewers: pr.reviewers.nodes,
        prLabels: pr.labels.nodes,
        prStatus: getStatusOfPR(
          pr.headPipeline?.status === "FAILED" ? true : false,
          //pr.conflicts,
          pr.draft,
          pr.autoMergeEnabled,
          pr.approved,
          pr.reviewers.nodes.length ? true : false
        ),
        assignees: pr.assignees?.nodes,
        jiraLabels: pr.jiraLabels,
        pipelineStatus: getPipelineStatus(pr.headPipeline?.status),
        projectPath: pr.project.fullPath,
        iid: String(pr.iid),
        approvedBy: pr.approvedBy.nodes,
      }));
    }
  }, [finalFilteredData, tabType]);

  return (
    <Stack
      enableScopedSelectors
      tokens={{
        padding: "m",
      }}
    >
      <Stack
        enableScopedSelectors
        horizontal
        wrap
        styles={{
          root: {
            marginTop: "1em",
          },
        }}
      >
        <FilterBox
          options={PRlabelOptions}
          setSelectedOptions={setSelectedPRLabels}
          selectedOptions={selectedPRLabels}
          filterLabel="Select PR label"
        />
        {tabType !== TAB_TYPE.groupsMergedPRs && (
          <FilterBox
            options={statusOptions}
            setSelectedOptions={setSelectedStatuses}
            selectedOptions={selectedStatuses}
            filterLabel="Select PR status"
          />
        )}
        <FilterBox
          options={jiraLabelOptions}
          setSelectedOptions={setSelectedJiraLabels}
          selectedOptions={selectedJiraLabels}
          filterLabel="Select Jira label"
        />
      </Stack>
      {items.length === 0 ? (
        <NoData />
      ) : tabType === TAB_TYPE.myPRs ? (
        <PRTable items={items} tabType={tabType} />
      ) : (
        <GroupedTable groups={groups} items={items} tabType={tabType} />
      )}
    </Stack>
  );
};
