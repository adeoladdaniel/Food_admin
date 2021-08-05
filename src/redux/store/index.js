/*eslint-disable*/
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import rootReducer from '../reducers';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['ProductUpload/pictureUpload'],
      ignoredActionPaths: ['meta.arg', 'ProductUpload/pictureUpload']
    }
  })
});

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('../reducers', () => {
    const newRootReducer = require('../reducers').default;
    store.replaceReducer(newRootReducer);
  });
}

export default store;
