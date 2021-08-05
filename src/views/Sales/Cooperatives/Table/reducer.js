export const giftsReducer = (state = [], action) => {
  const { payload, type } = action;
  switch (type) {
  case 'GET_BY_STATES': {
    const { value, coopId, data } = payload;
    if (payload.value === 'All') {
      state = data;
      return state;
    }
    const filteredItems = data
      .filter((item) => (
        item?.delivery?.state === value
       && item?.cooperativeId === coopId
      ));
    state = filteredItems;
    return state;
  }
  case 'DELIVERY_STATUS': {
    const { value, coopId, data } = payload;
    if (payload.value === 'All') {
      state = data;
      return state;
    }
    const filteredItems = data
      .filter((item) => (
        item?.status === value
       && item?.cooperativeId === coopId
      ));
    state = filteredItems;
    return state;
  }
  case 'QUERY': {
    const { value, data } = payload;
    if (value && data.length) {
      const filteredItems = data
        .filter((item) => (
          item.user?.name
            .toLowerCase()
            .includes(value.toLowerCase())
        ));
      state = filteredItems;
      return state;
    }
    state = data;
    return state;
  }
  case 'GET_COOP_GIFT':
    state = payload;
    return state;
  default:
    return state;
  }
};

export const CSVheaders = [
  { label: 'Code', key: 'code' },
  { label: 'Name', key: 'user.name' },
  { label: 'Email', key: 'user.email' },
  { label: 'Phone Number', key: 'user.phoneNumber' },
  { label: 'Delivery Fee', key: 'delivery.price' },
  { label: 'Address', key: 'delivery.address' },
  { label: 'State', key: 'delivery.state' },
  { label: 'Type', key: 'delivery.type' },
  { label: 'Order status', key: 'status' },
  { label: 'Order Date', key: 'createdAt' },
];
