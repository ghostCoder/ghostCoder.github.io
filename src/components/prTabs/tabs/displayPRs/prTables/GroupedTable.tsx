import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Divider,
  makeStyles,
} from "@fluentui/react-components";
import { Stack } from "@fluentui/react";
import { PRTable } from "./PRTable";
import { PRItem } from "../../../../../utilities/constants";

const useStyles = makeStyles({
  accordianItem: {
    marginBottom: "3em",
  },
});

export const GroupedTable = ({
  groups,
  items,
  tabType,
}: {
  groups: {
    key: string;
    name: string;
    startIndex: number;
    count: number;
  }[];
  items: PRItem[];
  tabType: string;
}) => {
  const styles = useStyles();

  return (
    <Accordion multiple collapsible defaultOpenItems={[groups[0]?.key]}>
      {groups.map((group) => (
        <Stack key={group.key} enableScopedSelectors>
          <AccordionItem value={group.key} className={styles.accordianItem}>
            <AccordionHeader size="extra-large">
              {group.name} ({group.count})
            </AccordionHeader>
            <AccordionPanel>
              <PRTable
                items={items.slice(
                  group.startIndex,
                  group.startIndex + group.count
                )}
                tabType={tabType}
              />
            </AccordionPanel>
            <Divider appearance="subtle" />
          </AccordionItem>
        </Stack>
      ))}
    </Accordion>
  );
};
