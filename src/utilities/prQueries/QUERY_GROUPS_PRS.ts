import { DocumentNode, gql } from "@apollo/client";

export const QUERY_GROUPS_PRS: DocumentNode = gql`
  query AllMembersPRs($members: [String!]!) {
    users(usernames: $members) {
      nodes {
        authoredMergeRequests(state: opened) {
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
  }
`;
