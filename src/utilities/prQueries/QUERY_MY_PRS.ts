import { DocumentNode, gql } from "@apollo/client";

export const QUERY_MY_PRS: DocumentNode = gql`
  query MyPRs($user: String!) {
    user(username: $user) {
      authoredMergeRequests(state: opened) {
        nodes {
          id
          title
          webUrl
          reviewers {
            nodes {
              username
              name
            }
          }
          assignees {
            nodes {
              name
              username
            }
          }
          labels {
            nodes {
              title
            }
          }
          draft
          conflicts
          approvedBy {
            nodes {
              name
              username
            }
          }
          project {
            fullPath
          }
          iid
          autoMergeEnabled
          approved
          headPipeline {
            status
          }
        }
      }
    }
  }
`;
