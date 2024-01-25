import { useState, useEffect, useContext } from "react";
import { DisplayPRs } from "./displayPRs/DisplayPRs";
import { Error } from "../../Error";
import { getAdditionalData } from "../../../utilities/getAdditionalData";
import { TokensInCacheContext } from "../../../contexts/Context";
import { TAB_TYPE, PR } from "../../../utilities/constants";

export const AddData = ({
  data: dataNoJiraLabels,
  tabType,
}: {
  data: PR[];
  tabType: string;
}) => {
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const { setAtlassianInCache, setGitInCache, setNetworkError } =
    useContext(TokensInCacheContext);

  const [data, setData] = useState<PR[] | void>(dataNoJiraLabels);

  useEffect(() => {
    if (dataLoading) {
      (async () => {
        const response = await getAdditionalData(
          JSON.parse(JSON.stringify(dataNoJiraLabels)),
          setAtlassianInCache!,
          setGitInCache!,
          setNetworkError!
        );
        setData(response);
        setDataLoading(false);
      })();
    }
  }, [
    dataLoading,
    dataNoJiraLabels,
    setAtlassianInCache,
    setGitInCache,
    setNetworkError,
  ]);

  switch (tabType) {
    case TAB_TYPE.myPRs:
      return <DisplayPRs data={data as PR[]} tabType={tabType} />;
    case TAB_TYPE.reviewRequested:
      return <DisplayPRs data={data as PR[]} tabType={tabType} />;
    case TAB_TYPE.groupPRs:
      return <DisplayPRs data={data as PR[]} tabType={tabType} />;
    case TAB_TYPE.groupsMergedPRs:
      return <DisplayPRs data={data as PR[]} tabType={tabType} />;
    default:
      return <Error errorMessage="" />;
  }
};
