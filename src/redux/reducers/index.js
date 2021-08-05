import { combineReducers } from '@reduxjs/toolkit';
import orders from './slicers/orders/Orders';
import cooperatives from './slicers/cooperatives';
import productUpload from './slicers/productUpload';
import product from './slicers/Products';
import userAuth from './slicers/auth';

const rootReducer = combineReducers({
  orders,
  product,
  userAuth,
  cooperatives,
  productUpload
});

export default rootReducer;
