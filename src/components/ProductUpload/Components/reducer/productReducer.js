export const initialState = {
  step: {
    activeStep: 0
  },
  form: { }
};

export const productReducer = (state, action) => {
  switch (action.type) {
  case 'ADD_PRODUCT': {
    const { data } = action.payload;
    const prevFromData = state.form;
    const modifiedData = { ...prevFromData, ...data };
    state.form = modifiedData;
    return state;
  }
  case 'MOVE_STEP': {
    const { steps } = action.payload;
    const prevStep = state.step;
    state.step = { ...prevStep, activeStep: steps };
    return state;
  }
  case 'GET_ALL': {
    state.form = action.payload;
    return state;
  }
  default:
    return state;
  }
};
