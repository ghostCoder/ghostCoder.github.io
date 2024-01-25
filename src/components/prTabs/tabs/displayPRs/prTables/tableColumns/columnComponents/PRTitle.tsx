import { Text, Link } from "@fluentui/react-components";
import { getIssueKeysFromPRTitle } from "../../../../../../../utilities/getIssueKeysFromPRTitle";
import { getPRTitleWithoutKeys } from "../../../../../../../utilities/getPRTitleWithoutKeys";
import { JIRA_ISSUE_LINK } from "../../../../../../../utilities/constants";

export const PRTitle = ({
  title,
  webUrl,
}: {
  title: string;
  webUrl: string;
}) => {
  const issueKeys = getIssueKeysFromPRTitle(title);
  const titleWithoutKeys = getPRTitleWithoutKeys(title);

  return (
    <Text>
      {issueKeys.length !== 0 ? "[ " : ""}
      {issueKeys.map((issueKey, index) => (
        <Text key={issueKey}>
          <Link href={JIRA_ISSUE_LINK + issueKey} target="_blank">
            {issueKey}
          </Link>
          {index !== issueKeys.length - 1 ? " | " : ""}
        </Text>
      ))}
      {issueKeys.length !== 0 ? " ] " : ""}
      <Link href={webUrl} target="_blank">
        {titleWithoutKeys}
      </Link>
    </Text>
  );
};
