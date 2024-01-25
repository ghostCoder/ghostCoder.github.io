import { useEffect, useContext, useState } from "react";
import {
  Combobox,
  Option,
  OptionOnSelectData,
  SelectionEvents,
  ToastIntent,
} from "@fluentui/react-components";
import { getPeopleOptions } from "../../../../../../../utilities/getPeopleOptions";
import { validateGitLabToken } from "../../../../../../../utilities/tokenValidationUtilities/validateGitLabToken";
import {
  MembersContext,
  TokensInCacheContext,
} from "../../../../../../../contexts/Context";
import { clientGitLab } from "../../../../../../../utilities/queryClients";
import { MUTATION_SET_REVIEWERS } from "../../../../../../../utilities/prMutations/MUTATION_SET_REVIEWERS";
import { MUTATION_SET_ASSIGNEES } from "../../../../../../../utilities/prMutations/MUTATION_SET_ASSIGNEES";
import {
  MUTATION_TYPE,
  PRItem,
  Person,
} from "../../../../../../../utilities/constants";

export const EditorsCombobox = ({
  item,
  people,
  selectedPeople,
  setSelectedPeople,
  focusOnMount,
  notify,
  comboBoxRef,
  type,
  projectPath,
  iid,
  setEditMode,
}: {
  item: PRItem;
  people: Person[];
  selectedPeople: { key: string; text: string }[];
  setSelectedPeople: React.Dispatch<
    React.SetStateAction<
      {
        key: string;
        text: string;
      }[]
    >
  >;
  focusOnMount: boolean;
  notify: (intent: ToastIntent, message: string) => void;
  comboBoxRef: React.RefObject<HTMLInputElement>;
  type: string;
  projectPath: string;
  iid: string;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [value, setValue] = useState<string>(
    selectedPeople ? selectedPeople.map((person) => person.text).join(", ") : ""
  );
  const { reload, members } = useContext(MembersContext);
  const { setGitInCache } = useContext(TokensInCacheContext);

  useEffect(() => {
    if (focusOnMount) {
      comboBoxRef.current?.focus();
    }
  }, [comboBoxRef, focusOnMount]);

  const options = getPeopleOptions(members, people);

  const onSelect = async (event: SelectionEvents, data: OptionOnSelectData) => {
    try {
      const response = await validateGitLabToken();
      console.log("GitLab PAT validated: ", response);
    } catch (error) {
      console.log("GitLab PAT validation failed: ", error);
      if (String(error).startsWith("TypeError: Failed to fetch")) {
        notify("error", "offline or network does not have access to GitLab");
        reload();
      } else {
        setGitInCache(false);
      }
    }
    const newPeople = data.selectedOptions.map((option) => JSON.parse(option));
    console.log("newPeople", newPeople);
    const peopleUsernames = newPeople.map((person) => person.key);
    if (type === MUTATION_TYPE.setReviewers) {
      try {
        const result = await clientGitLab.mutate({
          mutation: MUTATION_SET_REVIEWERS,
          variables: { projectPath, iid, reviewerUsernames: peopleUsernames },
        });
        const newReviewers =
          result.data.mergeRequestSetReviewers.mergeRequest.reviewers.nodes;
        console.log("Updated reviewers to: ", newReviewers);
        console.log(item);
        item.reviewers = newReviewers;
        setSelectedPeople(() =>
          newReviewers.map((reviewer: Person) => ({
            key: reviewer.username,
            text: reviewer.name,
          }))
        );
        setValue(
          newReviewers
            ? newReviewers?.map((reviewer: Person) => reviewer.name).join(", ")
            : ""
        );
        notify("success", "Reviewers updated!");
      } catch (error) {
        console.log("Error while mutation: ", error);
        notify(
          "error",
          "Action unauthorized or scopes missing from token (required: 'api')."
        );
      }
    } else {
      try {
        const result = await clientGitLab.mutate({
          mutation: MUTATION_SET_ASSIGNEES,
          variables: { projectPath, iid, assigneeUsernames: peopleUsernames },
        });
        const newAssignees =
          result.data.mergeRequestSetAssignees.mergeRequest.assignees.nodes;
        console.log("Updated assignees to: ", newAssignees);
        item.assignees = newAssignees;
        setSelectedPeople(
          newAssignees.map((assignee: Person) => ({
            key: assignee.username,
            text: assignee.name,
          }))
        );
        setValue(
          newAssignees
            ? newAssignees?.map((assignee: Person) => assignee.name).join(", ")
            : ""
        );
        console.log(
          "Setting assignees to : ",
          newAssignees.map((assignee: Person) => ({
            key: assignee.username,
            text: assignee.name,
          }))
        );
        notify("success", "Reviewers updated!");
      } catch (error) {
        console.log("Error while mutation: ", error);
        notify(
          "error",
          "Action unauthorized or scopes missing from token (required: 'api')."
        );
      }
    }
  };

  const unMountIfPeopleSelected = () => {
    if (selectedPeople.length > 0) {
      setEditMode(false);
    }
  };

  return (
    <Combobox
      appearance="underline"
      ref={comboBoxRef}
      multiselect={true}
      placeholder={
        type === MUTATION_TYPE.setAssignees
          ? "Select assignees"
          : "Select reviewers"
      }
      defaultOpen={!!selectedPeople.length}
      selectedOptions={selectedPeople.map((person) => JSON.stringify(person))}
      size="small"
      value={value}
      onOptionSelect={onSelect}
      onOpenChange={unMountIfPeopleSelected}
      style={{ minWidth: "unset" }}
      input={{ style: { width: 190 } }}
    >
      {options.map((option) => (
        <Option text={JSON.stringify(option)} key={option.key}>
          {option.text}
        </Option>
      ))}
    </Combobox>
  );
};
