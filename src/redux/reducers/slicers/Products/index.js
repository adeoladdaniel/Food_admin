import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FoodCrowdyApi } from '../../../../services/config';

import _ from '../../../../utils/functions/appUtils';
import UserUtils from '../../../../utils/functions/utilsFunc';

const { userToken } = UserUtils;

const { headers } = userToken();

const STORAGE_NAME = 'product:categories';

const initialState = {
  products: [],
  searchValue: [],
  paginationPage: '',
  loading: false,
  categories: _.getLocalStoreItem({
    name: STORAGE_NAME,
    type: []
  }),
};

export const getCategories = createAsyncThunk('Products/getProductCategory', async () => {
  const response = await FoodCrowdyApi.get('/products/categories', { headers });
  return response.data.data;
});

const ProductActions = createSlice({
  name: 'Products',
  initialState,
  reducers: {
    getProductCategory(state, action) {
      const data = action.payload;
      state.categories = data || [];
      _.saveLocalStoreItem({
        name: STORAGE_NAME,
        data: action.payload
      });
      return state;
    }
  },
  extraReducers: {
    [getCategories.pending]: (state) => {
      state.loading = true;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      _.saveLocalStoreItem({
        name: STORAGE_NAME,
        data: action.payload
      });
    },
    [getCategories.rejected]: (state) => {
      state.loading = false;
    }
  }
});

export const {
  saveSearchResult,
  getAllProducts,
  saveCurrentPage,
  setLoader,
  getProductCategory
} = ProductActions.actions;

export default ProductActions.reducer;
