/* eslint-disable indent */
export const invoiceReducer = (state = [], action) => {
  const { payload, type } = action;
  switch (type) {
    case 'GET_BY_STATES': {
      const { value, data } = payload;
      if (value) {
        const filteredItems = data
          .filter((item) => (
            item?.invoice?.delivery?.state === value
          ));
        state = filteredItems;
      }
      return state;
    }
    case 'QUERY': {
      const { value, data } = payload;
      if (value && data.length) {
        const filteredItems = data
          .filter((item) => (
            item.invoice.user?.name
              .toLowerCase()
              .includes(value.toLowerCase())
          ));
        state = filteredItems;
        return state;
      }
      state = data;
      return state;
    }
    case 'GET_ALL':
      state = payload;
      return state;
    default:
      return state;
  }
};
