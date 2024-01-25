import { DocumentNode, gql } from "@apollo/client";

export const QUERY_PR_ASSIGNEES: DocumentNode = gql`
  query PRAssignees($id: MergeRequestID!) {
    mergeRequest(id: $id) {
      assignees {
        nodes {
          name
          username
        }
      }
    }
  }
`;
