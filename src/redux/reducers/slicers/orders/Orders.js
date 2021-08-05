import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cachedOrders: [],
  orders: [],
  paginationPage: '',
  loading: false
};
const Orders = createSlice({
  name: 'Orders',
  initialState,
  reducers: {
    getAllOrders(state, action) {
      const data = action.payload;
      state.cachedOrders = data;
      return state;
    },
    getSearchResult(state, action) {
      const data = action.payload;
      state.orders = data;
      return state;
    },
    saveCurrentPage(state, action) {
      const data = action.payload;
      state.paginationPage = data;
      return state;
    },
    getFilteredData(state, action) {
      const query = action.payload;
      const filteredResultState = state.frontline;

      if (query) {
        const filteredResult = filteredResultState.filter(
          (item) => item.firstName.toLowerCase().includes(query.toLowerCase())
            || item.lastName.toLowerCase().includes(query.toLowerCase())
        );
        if (filteredResultState) {
          state.frontline = filteredResult;
        }
      }
      return state;
    },
    setLoader(state) {
      state.loading = !state.loading;
      return state;
    }
  }
});

export const {
  getAllOrders,
  getSearchResult,
  saveCurrentPage, setLoader
} = Orders.actions;

export default Orders.reducer;
