import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import * as auth from '../app/pages/auth/_redux/authRedux';
import { customersSlice } from '../_metronic/modules/ECommerce/_redux/customers/customersSlice';
import { productsSlice } from '../_metronic/modules/ECommerce/_redux/products/productsSlice';
import { remarksSlice } from '../_metronic/modules/ECommerce/_redux/remarks/remarksSlice';
import { specificationsSlice } from '../_metronic/modules/ECommerce/_redux/specifications/specificationsSlice';
import { usersSlice } from '../app/pages/account/_redux/user/userSlice';
import { agencySlice } from '../app/pages/agency/agency-management/_redux/agency-slice';
import { agencyTypeSlice } from '../app/pages/agency/agency-type/_redux/agencyTypeSlice';

export const rootReducer = combineReducers({
  auth: auth.reducer,
  customers: customersSlice.reducer,
  products: productsSlice.reducer,
  remarks: remarksSlice.reducer,
  specifications: specificationsSlice.reducer,
  users: usersSlice.reducer,
  agency: agencySlice.reducer,
  agencyType: agencyTypeSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
