import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FoodCrowdyApi } from '../../../../services/config';
import _ from '../../../../utils/functions/appUtils';

const STORAGE_NAME = '__cptAdmin:collection';
const coops = _.getLocalStoreItem({
  name: STORAGE_NAME,
  type: []
});
const initialState = {
  coops,
  isOpen: false,
  platformById: {},
  loading: false,
  error: '',
  location: 'Rivers'
};

export const getData = createAsyncThunk('Cooperatives/getAllCooperatives', async () => {
  const response = await FoodCrowdyApi.get('/platform');
  return response.data.data;
});

const cooperatives = createSlice({
  initialState,
  name: 'Cooperatives',
  reducers: {
    getPlatformById(state, action) {
      state.platformById = action.payload;
      state.isOpen = !state.isOpen;
    },
    toggler(state, /* _ */) {
      state.isOpen = !state.isOpen;
    }
  },
  extraReducers: {
    [getData.pending]: (state) => {
      state.loading = true;
    },
    [getData.fulfilled]: (state, action) => {
      state.loading = false;
      state.coops = action.payload;
      state.location = 'Lagos';
      _.saveLocalStoreItem({
        name: STORAGE_NAME,
        data: action.payload
      });
    },
    [getData.rejected]: (state) => {
      state.loading = false;
    }
  }
});

export const { getPlatformById, toggler } = cooperatives.actions;

export default cooperatives.reducer;
