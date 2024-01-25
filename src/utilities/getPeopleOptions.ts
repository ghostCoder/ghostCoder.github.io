import { Person, option } from "./constants";

export const getPeopleOptions = (
  members: Person[],
  reviewers: Person[]
): option[] => {
  return [
    ...new Map(
      [
        ...members.map((member) => ({
          key: member.username,
          text: member.name,
        })),
        ...reviewers.map((reviewer) => ({
          key: reviewer.username,
          text: reviewer.name,
        })),
      ].map((reviewerOption) => [reviewerOption.key, reviewerOption])
    ).values(),
  ];
};
