import { DocumentNode, gql } from "@apollo/client";

export const QUERY_REVIEW_REQUESTED_PRS: DocumentNode = gql`
  query ReviewRequested($user: String!) {
    user(username: $user) {
      reviewRequestedMergeRequests(state: opened) {
        nodes {
          id
          author {
            username
            name
          }
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
