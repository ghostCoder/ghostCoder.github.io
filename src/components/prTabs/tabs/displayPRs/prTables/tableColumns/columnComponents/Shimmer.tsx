import {
  Skeleton,
  SkeletonItem,
  TableCellLayout,
  makeStyles,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  skeleton: {
    width: "90px",
  },
});

export const Shimmer = ({ type }: { type: string }) => {
  const styles = useStyles();
  return (
    <TableCellLayout>
      <Skeleton className={styles.skeleton} appearance="opaque">
        <SkeletonItem />
      </Skeleton>
    </TableCellLayout>
  );
};
