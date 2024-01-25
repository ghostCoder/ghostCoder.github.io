import { getAtlassianAccessTokenValue } from "./tokenValidationUtilities/getters/getAtlassianAccessTokenValue";
import { refreshAtlassianTokens } from "./tokenValidationUtilities/refreshAtlassianTokens";
import { validateGitLabToken } from "./tokenValidationUtilities/validateGitLabToken";
import { getIssueKeysFromPRTitle } from "./getIssueKeysFromPRTitle";
import { clientAtlassian, clientGitLab } from "./queryClients";
import { JIRA_LABELS_ENDPOINT, PR } from "./constants";
import { QUERY_PR_ASSIGNEES } from "./prQueries/QUERY_PR_ASSIGNEES";

const fetchJiraLabels = async (issueKey: string): Promise<string[]> => {
  try {
    const response = await fetch(
      JIRA_LABELS_ENDPOINT +
        issueKey +
        "?" +
        new URLSearchParams({
          fields: "labels",
        }),
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAtlassianAccessTokenValue()}`,
        },
      }
    );
    const data = await response.json();
    return data.fields === undefined ? [] : data.fields?.labels;
  } catch (error) {
    throw error;
  }
};

export const getAdditionalData = async (
  data: PR[],
  setAtlassianInCache: React.Dispatch<React.SetStateAction<boolean>>,
  setGitInCache: React.Dispatch<React.SetStateAction<boolean>>,
  setNetworkError: React.Dispatch<React.SetStateAction<boolean>>
): Promise<PR[] | void> => {
  try {
    const response = await validateGitLabToken();
    console.log("GitLab PAT validated: ", response);
  } catch (error) {
    console.log("GitLab PAT validation failed: ", error);
    if (String(error).startsWith("TypeError: Failed to fetch")) {
      setNetworkError(true);
    } else {
      setGitInCache(false);
    }
  }
  try {
    const response = await refreshAtlassianTokens();
    console.log("Atlassian access token refreshed: ", response);
    for (let pr of data) {
      const issueKeys = getIssueKeysFromPRTitle(pr.title);
      if (pr.assignees === undefined) {
        try {
          const response = await clientGitLab.query({
            query: QUERY_PR_ASSIGNEES,
            variables: {
              id: pr.id,
            },
            fetchPolicy: "cache-first",
          });
          pr.assignees =
            response.data.mergeRequest === null
              ? { nodes: [] }
              : response.data.mergeRequest.assignees;
        } catch (error) {
          pr.assignees = { nodes: [] };
          console.log(
            `Error fetching assignees for PR with ID ${pr.id}`,
            error
          );
        }
      }
      pr.jiraLabels = [];
      for (let issueKey of issueKeys) {
        try {
          const jiraLabels = await clientAtlassian.fetchQuery({
            queryKey: ["Jira Labels", issueKey],
            queryFn: () => fetchJiraLabels(issueKey),
            staleTime: 30000,
            cacheTime: 600000,
          });
          pr.jiraLabels = [...new Set([...pr.jiraLabels, ...jiraLabels])];
        } catch (error) {
          pr.jiraLabels = [];
          console.log(
            JSON.stringify({
              error_message: `Error retrieving Jira labels for issue with issue key: ${issueKey}`,
              error: error,
            })
          );
        }
      }
    }
    return data;
  } catch (error) {
    console.log("Error refreshing atlassian token from cache: ", error);
    if (String(error).startsWith("TypeError: Failed to fetch")) {
      setNetworkError(true);
    } else {
      setAtlassianInCache(false);
    }
  }
};
