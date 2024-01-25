import { useMemo, useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { Loading } from "../../Loading";
import { Error } from "../../Error";
import { AddData } from "./AddData";
import { validateGitLabToken } from "../../../utilities/tokenValidationUtilities/validateGitLabToken";
import {
  MembersContext,
  TokensInCacheContext,
} from "../../../contexts/Context";
import { QUERY_GROUPS_PRS } from "../../../utilities/prQueries/QUERY_GROUPS_PRS";
import { MemberPR, PR, TAB_TYPE } from "../../../utilities/constants";

export const GroupPRs = () => {
  // CHANGE THIS IN PROD
  const { members, reload } = useContext(MembersContext);
  const { setGitInCache } = useContext(TokensInCacheContext);

  const [networkError, setNetworkError] = useState(false);

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

  const {
    data: unFlattenedData,
    error,
    loading,
  } = useQuery(QUERY_GROUPS_PRS, {
    variables: {
      members: members.map((member) => member.username),
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });
  const data = useMemo(
    () =>
      unFlattenedData?.users.nodes.reduce((acc: PR[], user: MemberPR) => {
        acc.push(...user.authoredMergeRequests.nodes);
        return acc;
      }, []),
    [unFlattenedData]
  );

  if (networkError) {
    return (
      <Error
        errorMessage="Failed to fetch: offline or your network doesn't have access to gitLab"
        reload={reload}
      />
    );
  }

  if (loading) {
    return <Loading loadingText="Fetching PR's from GitLab..." />;
  }

  // ADD ERROR SCREEN HERE
  if (error) {
    <Error errorMessage={String(error)} reload={reload} />;
  }

  if (data === undefined) {
    setGitInCache(false);
    return null;
  } else {
    return <AddData data={data} tabType={TAB_TYPE.groupPRs} />;
  }
};
