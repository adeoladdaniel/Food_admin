import { createSlice } from '@reduxjs/toolkit';

const insertObjectFields = (state, action) => {
  const details = action.payload;
  const data = state.form;
  return { ...data, ...details };
};

const initialState = {
  form: {},
  costs: {},
  picture: {},
  measurement: [],
  productInfo: [],
  step: {
    activeStep: 0
  }
};
const ProductUploadModel = createSlice({
  name: 'ProductUpload',
  initialState,
  reducers: {
    getDetails(state, action) {
      state.form = insertObjectFields(state, action);
      return state;
    },
    saveDataForCostCalc(state, action) {
      const details = action.payload;
      const data = state.costs;
      state.costs = { ...data, ...details };
      // state.costs = insertObjectFields(state, action);
      return state;
    },
    pictureUpload(state, action) {
      const details = action.payload.files.file;
      // const data = state.picture;
      // state.picture = { ...data, ...details };
      state.picture = { files: details };
      // state.picture = insertObjectFields(state, action);
      return state;
    },
    saveMeasurement(state, action) {
      const { conversionType } = action.payload;
      const data = action.payload;
      const productsValues = state.measurement.filter(
        (item) => item.conversionType === conversionType
      );
      if (productsValues.length) {
        const products = state.measurement.map((item) => (
          (item.conversionType === conversionType
            ? { ...data } : item)
        ));
        state.measurement = products;
      } else {
        state.measurement.push(action.payload);
      }
      return state;
    },

    removeMeasurement(state, action) {
      const conversionType = action.payload;
      const productsValues = state.measurement.filter(
        (item) => item.conversionType !== conversionType
      );
      state.measurement = productsValues;
      return state;
    },

    storeMeasurementfromDB(state, action) {
      const data = action.payload;
      state.measurement = data;
      return state;
    },
    getProductInfo(state, action) {
      state.productInfo = action.payload;
      return state;
    },
    handleNext(state, action) {
      const activeState = state.step;
      state.step = { ...activeState, activeStep: action.payload };
      return state;
    },
    clearState(state, /* action */) {
      state.form = {};
      return state;
    }
  }
});

export const {
  clearState,
  handleNext,
  getDetails,
  saveDataForCostCalc,
  saveMeasurement,
  pictureUpload,
  getProductInfo,
  removeMeasurement,
  storeMeasurementfromDB
} = ProductUploadModel.actions;

export default ProductUploadModel.reducer;
