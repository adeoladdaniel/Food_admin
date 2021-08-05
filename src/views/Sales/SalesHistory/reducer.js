/* eslint-disable */
export const giftsReducer = (state = { totalProfit: '', details: [] }, action) => {
  const { payload, type } = action;
  switch (type) {
    case 'QUERY': {
      const { value, data } = payload;
      if (value && data?.details.length) {
        const filteredItems = data?.details
          .filter(({ title }) => (
            title
              .toLowerCase()
              .includes(value.toLowerCase())
          ));
        state = {
          ...state,
          details: filteredItems
        };
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

export const CSVheaders = [
  { label: 'id', key: 'id' },
  { label: 'title', key: 'title' },
  { label: 'qtySold', key: 'qtySold' },
  { label: 'profit', key: 'profit' },
];
