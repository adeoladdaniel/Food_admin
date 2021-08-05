/* eslint-disable indent */
export const orderReducer = (state = [], action) => {
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
            item?.invoice?.user?.name
              ?.toLowerCase()
              .includes(value.toLowerCase())
          ));
        state = filteredItems;
        return state;
      }
      state = data;
      return state;
    }
    case 'DELIVERY_STATUS': {
      const { value, data } = payload;
      if (value && data.length) {
        const filteredItems = data
          .filter((item) => (
            item.deliveryStatus
              .toLowerCase()
              .includes(value.toLowerCase())
          ));
        state = filteredItems;
        return state;
      }
      state = data;
      return state;
    }
    case 'GET_BY_COOP': {
      const {
        data, coopId,
        state: place
      } = payload;
      if (data.length && coopId && place) {
        const filteredItems = data
          .filter(({ cooperativeId, invoice }) => (
            cooperativeId === coopId
            && invoice?.delivery?.state === place
          ));
        state = filteredItems;
        return state;
      } if (coopId) {
        const filteredItems = data
          .filter(({ cooperativeId }) => (
            cooperativeId === coopId
          ));
        state = filteredItems;
        return state;
      }
      state = data;
      return state;
    }
    case 'GET_COOP_ORDERS':
      state = payload;
      return state;
    default:
      return state;
  }
};
