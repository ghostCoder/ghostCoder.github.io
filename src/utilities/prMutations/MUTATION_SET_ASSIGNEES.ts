import { DocumentNode, gql } from "@apollo/client";

export const MUTATION_SET_ASSIGNEES: DocumentNode = gql`
  mutation SetMergeRequestAssignees(
    $projectPath: ID!
    $iid: String!
    $assigneeUsernames: [String!]!
  ) {
    mergeRequestSetAssignees(
      input: {
        projectPath: $projectPath
        iid: $iid
        assigneeUsernames: $assigneeUsernames
        operationMode: REPLACE
      }
    ) {
      errors
      mergeRequest {
        assignees {
          nodes {
            username
            name
          }
        }
      }
    }
  }
`;
