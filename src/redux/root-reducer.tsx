import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import * as auth from '../app/pages/auth/_redux/auth-redux';
import { usersSlice } from '../app/pages/account/_redux/user/user-slice';
import { agencySlice } from '../app/pages/agency/agency-management/_redux/agency-slice';
import { agencyTypeSlice } from '../app/pages/agency/agency-type/_redux/agency-type-slice';

export const rootReducer = combineReducers({
  auth: auth.reducer,
  users: usersSlice.reducer,
  agency: agencySlice.reducer,
  agencyType: agencyTypeSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
