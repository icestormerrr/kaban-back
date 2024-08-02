export const findById = <T extends { _id: string }>(list: T[], _id: string) => {
  return list.find((entity) => entity._id.toString() === _id);
};
