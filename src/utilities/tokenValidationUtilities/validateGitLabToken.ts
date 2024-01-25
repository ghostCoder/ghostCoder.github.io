import { getGitLabPATKey } from "./getters/getGitLabPATKey";
import { GIT_VALIDATION_QUERY, GIT_VALIDATION_URL } from "../constants";

export const validateGitLabToken = async function (
  gitLabToken?: string,
  setGitErrMsg?: React.Dispatch<React.SetStateAction<string>>,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    if (setLoading) {
      setLoading(true);
    }

    const token = gitLabToken || localStorage.getItem(getGitLabPATKey());

    const checkNetwork = setTimeout(() => {
      if (setGitErrMsg) {
        setGitErrMsg(
          "Its taking longer than ususal you might be offline or your network doesn't have access to GitLab"
        );
      }
    }, 7000);

    try {
      const response = await fetch(GIT_VALIDATION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: GIT_VALIDATION_QUERY,
        }),
      });
      clearTimeout(checkNetwork);
      console.log(
        "Response object returned for GitLab PAT validation: ",
        response
      );
      const data = await response.json();
      if (data.data.currentUser === null) {
        if (setGitErrMsg) {
          setGitErrMsg(
            "The token entered is not valid or does not have the required scopes ('api')."
          );
        }
        localStorage.removeItem(getGitLabPATKey());
        reject(data.data.currentUser);
      } else {
        localStorage.setItem(getGitLabPATKey(), token!);

        if (setGitErrMsg) {
          setGitErrMsg("");
        }
        resolve(data.data.currentUser);
      }
    } catch (error) {
      if (String(error).startsWith("TypeError: Failed to fetch")) {
        if (setGitErrMsg) {
          setGitErrMsg("Offline or GitLab not accessible on current network!");
        }
      } else {
        if (setGitErrMsg) {
          setGitErrMsg(
            "We encountered some error while validating your token please try again."
          );
        }
      }
      reject(error);
    }

    if (setLoading) {
      setLoading(false);
    }
  });
};
