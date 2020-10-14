import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import * as auth from '../app/modules/Auth/_redux/authRedux';
import { customersSlice } from '../app/modules/ECommerce/_redux/customers/customersSlice';
import { productsSlice } from '../app/modules/ECommerce/_redux/products/productsSlice';
import { remarksSlice } from '../app/modules/ECommerce/_redux/remarks/remarksSlice';
import { specificationsSlice } from '../app/modules/ECommerce/_redux/specifications/specificationsSlice';
import { usersSlice } from '../app/modules/Account/_redux/user/userSlice';
import { agencySlice } from '../app/modules/Agency/pages/AgencyManagement/_redux/agencySlice';
import { agencyTypeSlice } from '../app/modules/Agency/pages/AgencyType/_redux/agencyTypeSlice';

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
