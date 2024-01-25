import { useState, useCallback, useRef } from "react";
import { Stack } from "@fluentui/react";
import {
  Persona,
  useId,
  Link,
  Toaster,
  useToastController,
  ToastTitle,
  ToastTrigger,
  Toast,
  ToastBody,
  Text,
  ToastIntent,
} from "@fluentui/react-components";
import { EditorsCombobox } from "./EditorsCombobox";
import { PRItem, Person } from "../../../../../../../utilities/constants";

export const MutationComponent = ({
  item,
  people,
  projectPath,
  iid,
  type,
}: {
  item: PRItem;
  people: Person[];
  projectPath: string;
  iid: string;
  type: string;
}) => {
  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);
  const notify = (intent: ToastIntent, message: string) =>
    dispatchToast(
      <Toast>
        <ToastTitle
          action={
            <ToastTrigger>
              <Link appearance="subtle">
                <Text weight="bold">x</Text>
              </Link>
            </ToastTrigger>
          }
        >
          {intent}
        </ToastTitle>
        <ToastBody>{message}</ToastBody>
      </Toast>,
      { intent }
    );

  const [editMode, setEditMode] = useState<boolean>(!people.length);
  const [selectedPeople, setSelectedPeople] = useState<
    { key: string; text: string }[]
  >(() =>
    people.map((person) => ({
      key: person.username,
      text: person.name,
    }))
  );

  const comboBoxRef = useRef<HTMLInputElement>(null);
  const openComboBox = useCallback(() => {
    setEditMode(true);
  }, []);

  if (editMode === false) {
    return (
      <Stack
        enableScopedSelectors
        tokens={{ childrenGap: "0.5em" }}
        onClick={openComboBox}
      >
        <Toaster toasterId={toasterId} />
        {selectedPeople.map((person) => (
          <Persona
            name={person.text}
            size="small"
            textAlignment="center"
            avatar={{ color: "colorful" }}
          />
        ))}
      </Stack>
    );
  } else {
    return (
      <Stack>
        <Toaster toasterId={toasterId} />
        <EditorsCombobox
          item={item}
          people={people}
          selectedPeople={selectedPeople}
          setSelectedPeople={setSelectedPeople}
          notify={notify}
          comboBoxRef={comboBoxRef}
          type={type}
          projectPath={projectPath}
          iid={iid}
          setEditMode={setEditMode}
          focusOnMount={selectedPeople.length !== 0}
        />
      </Stack>
    );
  }
};
