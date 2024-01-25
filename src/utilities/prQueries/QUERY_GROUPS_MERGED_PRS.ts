import { DocumentNode, gql } from "@apollo/client";

export const QUERY_GROUPS_MERGED_PRS: DocumentNode = gql`
  query AllMembersPRs($members: [String!]!) {
    users(usernames: $members) {
      nodes {
        authoredMergeRequests(state: merged, first: 20) {
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
            headPipeline {
              status
            }
          }
        }
      }
    }
  }
`;
