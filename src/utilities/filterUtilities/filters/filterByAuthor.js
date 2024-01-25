export const filterByAuthor = (data, selectedAuthors, totalOptions) => {
  return selectedAuthors.length !== 0 && selectedAuthors.length !== totalOptions
    ? data.filter((pr) => selectedAuthors.includes(pr.author.username))
    : data;
};
