export const actionHandler = (data, selectedRowIds) => {
  Object.keys(selectedRowIds)
    .map((x) => Number(x))
    .filter((_, i, check) => check
      .includes(i));
};
