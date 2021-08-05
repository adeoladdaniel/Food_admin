import { createSlice } from '@reduxjs/toolkit';
import UserUtils from '../../../../utils/functions/utilsFunc';

const { getUserData, saveAuthToken, saveAdminDetails } = UserUtils;

const initialState = {
  user: getUserData(),
  error: '',
};

const userAuth = createSlice({
  initialState,
  name: 'userAuth',
  reducers: {
    onSuccess(state, action) {
      const { userData, token } = action.payload;
      const currentUser = saveAdminDetails(userData?.data);
      saveAuthToken(token);
      state.user = currentUser;
      return state;
    },
    onError(state, action) {
      const error = action.payload;
      state.error = error;
      return state;
    }
  }
});

export const { onError, onSuccess } = userAuth.actions;

export default userAuth.reducer;
