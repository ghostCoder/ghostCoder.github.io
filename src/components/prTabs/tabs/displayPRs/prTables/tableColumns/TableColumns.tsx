import { Stack } from "@fluentui/react";
import {
  TableCellLayout,
  createTableColumn,
  Text,
  Persona,
  Badge,
} from "@fluentui/react-components";
import { Shimmer } from "./columnComponents/Shimmer";
import { MutationComponent } from "./columnComponents/MutationComponent";
import { PRTitle } from "./columnComponents/PRTitle";
import { MUTATION_TYPE, PRItem } from "../../../../../../utilities/constants";

export const columnsForUnMergedPRs = [
  createTableColumn<PRItem>({
    columnId: "title",
    renderHeaderCell: () => (
      <Text weight="bold" align="center">
        Title
      </Text>
    ),
    renderCell: (item) => (
      <TableCellLayout truncate>
        <PRTitle title={item.title} webUrl={item.webUrl} />
      </TableCellLayout>
    ),
  }),
  createTableColumn<PRItem>({
    columnId: "assignees",
    renderHeaderCell: () => (
      <Text weight="bold" align="center">
        Assignees
      </Text>
    ),
    renderCell: (item) =>
      item.assignees === undefined ? (
        <Shimmer type="person" />
      ) : (
        <TableCellLayout truncate>
          <MutationComponent
            item={item}
            people={item.assignees}
            projectPath={item.projectPath}
            iid={item.iid}
            type={MUTATION_TYPE.setAssignees}
          />
        </TableCellLayout>
      ),
  }),
  createTableColumn<PRItem>({
    columnId: "reviewers",
    renderHeaderCell: () => (
      <Text weight="bold" align="center">
        Reviewers
      </Text>
    ),
    renderCell: (item) => (
      <TableCellLayout truncate>
        <MutationComponent
          item={item}
          people={item.reviewers}
          projectPath={item.projectPath}
          iid={item.iid}
          type={MUTATION_TYPE.setReviewers}
        />
      </TableCellLayout>
    ),
  }),
  createTableColumn<PRItem>({
    columnId: "approvedBy",
    renderHeaderCell: () => (
      <Text weight="bold" align="center">
        Approved By
      </Text>
    ),
    renderCell: (item) => (
      <TableCellLayout truncate>
        <Stack enableScopedSelectors tokens={{ childrenGap: "0.3em" }}>
          {item.approvedBy.map((approver) => (
            <Persona
              name={approver.name}
              size="small"
              avatar={{ color: "colorful" }}
              textAlignment="center"
            />
          ))}
        </Stack>
      </TableCellLayout>
    ),
  }),
  createTableColumn<PRItem>({
    columnId: "prStatus",
    renderHeaderCell: () => (
      <Text weight="bold" align="center">
        PR Status
      </Text>
    ),
    renderCell: (item) => (
      <TableCellLayout
        truncate
        media={
          item.prStatus && (
            <item.prStatus.Icon primaryFill={item.prStatus!.iconColor} />
          )
        }
      >
        <Text>{item.prStatus!.status}</Text>
      </TableCellLayout>
    ),
  }),
  createTableColumn<PRItem>({
    columnId: "pipelineStatus",
    renderHeaderCell: () => (
      <Text weight="bold" align="center">
        Pipeline Status
      </Text>
    ),
    renderCell: (item) => (
      <TableCellLayout
        truncate
        media={
          item.pipelineStatus?.Icon ? (
            <item.pipelineStatus.Icon
              primaryFill={item.pipelineStatus.iconColor}
            />
          ) : null
        }
      >
        <Text>{item.pipelineStatus.status}</Text>
      </TableCellLayout>
    ),
  }),
  createTableColumn<PRItem>({
    columnId: "jiraLabels",
    renderHeaderCell: () => (
      <Text weight="bold" align="center">
        Jira Labels
      </Text>
    ),
    renderCell: (item) =>
      item.jiraLabels === undefined ? (
        <Shimmer type="label" />
      ) : (
        <TableCellLayout>
          <Stack
            horizontal
            wrap
            enableScopedSelectors
            tokens={{ childrenGap: "0.4em" }}
          >
            {item.jiraLabels.map((jiraLabel) => (
              <Badge key={jiraLabel} appearance="tint" size="medium">
                {jiraLabel}
              </Badge>
            ))}
          </Stack>
        </TableCellLayout>
      ),
  }),
  createTableColumn<PRItem>({
    columnId: "prLabels",
    renderHeaderCell: () => (
      <Text weight="bold" align="center">
        PR Labels
      </Text>
    ),
    renderCell: (item) => (
      <TableCellLayout>
        <Stack
          horizontal
          wrap
          enableScopedSelectors
          tokens={{ childrenGap: "0.4em" }}
        >
          {item.prLabels.map((prLabel) => (
            <Badge key={prLabel.title} appearance="tint" size="medium">
              {prLabel.title}
            </Badge>
          ))}
        </Stack>
      </TableCellLayout>
    ),
  }),
];

export const columnsForMergedPRs = columnsForUnMergedPRs
  .slice(0, 4)
  .concat(columnsForUnMergedPRs.slice(5));

export const columnSizes = {
  title: {
    minWidth: 340,
  },
  assignees: {
    minWidth: 220,
  },
  reviewers: {
    minWidth: 220,
  },
  approvedBy: {
    minWidth: 115,
  },
  prStatus: {
    minWidth: 140,
  },
  pipelineStatus: {
    minWidth: 150,
  },
  jiraLabels: {
    minWidth: 425,
  },
  prLabels: {
    minWidth: 425,
  },
};
