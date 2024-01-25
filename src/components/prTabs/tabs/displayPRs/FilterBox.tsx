import { useState } from "react";
import { Stack } from "@fluentui/react";
import {
  Combobox,
  Option,
  makeStyles,
  Label,
  Button,
  OptionOnSelectData,
  SelectionEvents,
} from "@fluentui/react-components";
import { DismissCircle16Regular } from "@fluentui/react-icons";
import { option } from "../../../../utilities/constants";

const useStyles = makeStyles({
  combobox: {
    marginRight: "1.5em",
    marginBottom: "3em",
  },
  button: {
    width: "0.3em",
  },
});

export const FilterBox = ({
  setSelectedOptions,
  selectedOptions,
  options,
  filterLabel,
}: {
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
  selectedOptions: string[];
  options: option[];
  filterLabel: string;
}) => {
  const [value, setValue] = useState<string>("");

  const onSelect = (event: SelectionEvents, data: OptionOnSelectData) => {
    console.log(data.selectedOptions);
    setValue(data.selectedOptions?.join(", ") ?? "");
    setSelectedOptions(data.selectedOptions);
  };

  const styles = useStyles();

  return (
    <Stack enableScopedSelectors tokens={{ childrenGap: "0.3em" }}>
      <Stack horizontal enableScopedSelectors tokens={{ childrenGap: "0.3em" }}>
        <Label weight="semibold">{filterLabel}</Label>
        <Button
          icon={<DismissCircle16Regular />}
          shape="circular"
          appearance="subtle"
          className={styles.button}
          onClick={(event) =>
            onSelect(event, {
              selectedOptions: [],
              optionValue: undefined,
              optionText: undefined,
            })
          }
          size="small"
        >
          Clear
        </Button>
      </Stack>
      <Combobox
        multiselect={true}
        placeholder="Select status"
        selectedOptions={selectedOptions}
        onOptionSelect={onSelect}
        className={styles.combobox}
        value={value}
      >
        {options.map((option) => (
          <Option text={option.text} key={option.key}>
            {option.additional?.Icon ? (
              <option.additional.Icon
                primaryFill={option.additional.iconColor}
              />
            ) : null}
            {option.text}
          </Option>
        ))}
      </Combobox>
    </Stack>
  );
};
