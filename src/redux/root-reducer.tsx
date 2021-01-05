import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import * as auth from '../app/pages/auth/_redux/auth-redux';
import { usersSlice } from '../app/pages/account/_redux/user-slice';

export const rootReducer = combineReducers({
  auth: auth.reducer,
  users: usersSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
