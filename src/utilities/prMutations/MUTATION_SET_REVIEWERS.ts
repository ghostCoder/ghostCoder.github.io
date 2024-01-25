import { DocumentNode, gql } from "@apollo/client";

export const MUTATION_SET_REVIEWERS: DocumentNode = gql`
  mutation SetMergeRequestReviewers(
    $projectPath: ID!
    $iid: String!
    $reviewerUsernames: [String!]!
  ) {
    mergeRequestSetReviewers(
      input: {
        projectPath: $projectPath
        iid: $iid
        reviewerUsernames: $reviewerUsernames
        operationMode: REPLACE
      }
    ) {
      errors
      mergeRequest {
        reviewers {
          nodes {
            username
            name
          }
        }
      }
    }
  }
`;
