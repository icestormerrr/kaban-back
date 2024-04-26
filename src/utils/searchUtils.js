export const findEntityById = (list, _id) => {
  return list.find((entity) => entity._id.toString() === _id);
};
