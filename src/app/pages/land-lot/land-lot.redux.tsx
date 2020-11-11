import { createSlice } from '@reduxjs/toolkit';

export interface LandLotState {
  listLoading: boolean;
  actionsLoading: boolean;
  editEntity: any;
  lastError: any;
  error: string | any;
}

const initialLandLotState: LandLotState = {
  listLoading: false,
  actionsLoading: false,
  editEntity: null,
  lastError: null,
  error: null,
};

export const callTypes = {
  list: 'list',
  action: 'action',
};

export const purchaseOrderSlice = createSlice({
  name: 'purchaseOrder',
  initialState: initialLandLotState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    entityFetched: (state, action) => {
      console.log(action.payload);
      state.actionsLoading = false;
      state.editEntity = action.payload.editEntity;
      state.error = null;
    },
  },
});
