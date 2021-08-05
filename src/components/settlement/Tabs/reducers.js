const status = [
  'OUTSTANDING',
  'PROCESSING',
  'DECLINE', 'PAID',
  'PROCESSING'
];
const getStatus = (statusType) => status.find((state) => state === statusType);

export const settlementReducer = (state = [], action) => {
  const { payload, type } = action;
  switch (type) {
  case getStatus(type): {
    const data = payload;
    const filteredItems = data
      .filter((item) => (item.status === type.toLowerCase()));
    state = filteredItems;
    return state;
  }
  case 'GET_ALL':
    state = payload;
    return state;
  default:
    return state;
  }
};

export const CSVsettlement = [
  { label: 'InoviceId', key: '_id' },
  { label: 'Amount', key: 'totalPrice' },
  { label: 'Order status', key: 'status' },
  { label: 'Order Date', key: 'createdAt' },
  { label: 'Orders', key: 'orderRef' },
];
