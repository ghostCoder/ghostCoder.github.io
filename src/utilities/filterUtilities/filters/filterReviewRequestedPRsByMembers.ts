import { PR } from "../../constants";

export const filterReviewRequestedPRsByMembers = (
  prs: PR[],
  memberUsernames: string[]
) => {
  return prs.filter((pr) => memberUsernames.includes(pr.author!.username));
};
