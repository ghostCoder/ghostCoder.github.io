import { useState, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  useTableColumnSizing_unstable,
  useTableFeatures,
  makeStyles,
  TableColumnId,
  TableColumnSizingOptions,
} from "@fluentui/react-components";
import {
  columnsForUnMergedPRs,
  columnsForMergedPRs,
  columnSizes,
} from "./tableColumns/TableColumns";
import { TAB_TYPE, PRItem } from "../../../../../utilities/constants";

const useStyles = makeStyles({
  row: {
    paddingTop: "1em",
    paddingBottom: "1em",
  },
  tableHeader: {
    textAlign: "center",
    verticalAlign: "middle",
  },
});

export const PRTable = ({
  items,
  tabType,
}: {
  items: PRItem[];
  tabType: string;
}) => {
  const [columnSizingOptions, setColumnSizingOptions] =
    useState<TableColumnSizingOptions>(columnSizes);

  const onColumnResize = useCallback(
    (
      e: KeyboardEvent | TouchEvent | MouseEvent | undefined,
      { columnId, width }: { columnId: TableColumnId; width: number }
    ) => {
      setColumnSizingOptions((state) => ({
        ...state,
        [columnId]: {
          ...state[columnId],
          idealWidth: width,
        },
      }));
    },
    []
  );

  const columns =
    tabType === TAB_TYPE.groupsMergedPRs
      ? columnsForMergedPRs
      : columnsForUnMergedPRs;

  const { columnSizing_unstable: columnSizing, tableRef } = useTableFeatures(
    {
      columns,
      items,
    },
    [useTableColumnSizing_unstable({ columnSizingOptions, onColumnResize })]
  );

  const styles = useStyles();
  return (
    <Table ref={tableRef}>
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHeaderCell
              key={column.columnId}
              {...columnSizing.getTableHeaderCellProps(column.columnId)}
            >
              {column.renderHeaderCell()}
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.key}>
            {columns.map((column) => (
              <TableCell
                key={column.columnId}
                className={styles.row}
                {...columnSizing.getTableCellProps(column.columnId)}
              >
                {column.renderCell(item)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
