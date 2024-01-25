import { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { Loading } from "../../Loading";
import { Error } from "../../Error";
import { AddData } from "./AddData";
import { validateGitLabToken } from "../../../utilities/tokenValidationUtilities/validateGitLabToken";
import { filterReviewRequestedPRsByMembers } from "../../../utilities/filterUtilities/filters/filterReviewRequestedPRsByMembers";
import { QUERY_REVIEW_REQUESTED_PRS } from "../../../utilities/prQueries/QUERY_REVIEW_REQUESTED_PRS";
import { TAB_TYPE } from "../../../utilities/constants";
import {
  MembersContext,
  TokensInCacheContext,
} from "../../../contexts/Context";

export const ReviewRequestedPRs = () => {
  const { user, members, reload } = useContext(MembersContext);
  const { setGitInCache } = useContext(TokensInCacheContext);
  const [networkError, setNetworkError] = useState<boolean>(false);

  (async () => {
    try {
      const response = await validateGitLabToken();
      console.log("GitLab PAT validated: ", response);
    } catch (error) {
      console.log("GitLab PAT validation failed: ", error);
      if (String(error).startsWith("TypeError: Failed to fetch")) {
        if (networkError === false) {
          setNetworkError(true);
        }
      } else {
        setGitInCache(false);
      }
    }
  })();

  const { data, error, loading } = useQuery(QUERY_REVIEW_REQUESTED_PRS, {
    variables: {
      user: user,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });

  if (networkError) {
    return (
      <Error
        errorMessage="Failed to fetch: offline or your network doesn't have access to GitLab"
        reload={reload}
      />
    );
  }

  if (loading) {
    return <Loading loadingText="Fetching PR's from GitLab..." />;
  }

  if (error) {
    return <Error errorMessage={String(error)} reload={reload} />;
  }

  if (data === undefined) {
    setGitInCache(false);
    return null;
  } else {
    const memberUsernames = members.map((member) => member.username);

    const prsFilteredByMembers = filterReviewRequestedPRsByMembers(
      data.user.reviewRequestedMergeRequests.nodes,
      memberUsernames
    );

    return (
      <AddData data={prsFilteredByMembers} tabType={TAB_TYPE.reviewRequested} />
    );
  }
};
