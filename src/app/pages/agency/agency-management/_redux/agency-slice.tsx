import {createSlice} from '@reduxjs/toolkit';

export interface AgencyState {
  listLoading: boolean;
  actionsLoading: boolean;
  totalCount: number;
  entities: any;
  agencyForEdit: any;
  lastError: any;
  error: string | any;
}

const initialAgencyState: AgencyState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  agencyForEdit: undefined,
  lastError: null,
  error: null,
};

export const callTypes = {
  list: 'list',
  action: 'action',
};

export const agencySlice = createSlice({
  name: 'agency',
  initialState: initialAgencyState,
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
    agencyFetched: (state, action) => {
      console.log(action.payload);
      state.actionsLoading = false;
      state.agencyForEdit = action.payload.agencyForEdit;
      state.error = null;
    },
    agencysFetched: (state, action) => {
      const {total, data} = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = data;
      state.totalCount = total;
    },
    agencyCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.agency);
    },
    agencyUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity: { agency_id: any }) => {
        if (entity.agency_id === action.payload.agency.agency_id) {
          return action.payload.agency;
        }
        return entity;
      });
    },
    agencyDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter((el: { id: any }) => el.id !== action.payload.id);
    },
    agencyDeleteMany: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(function (el: any) {
        return !action.payload.arr.includes(el);
      });
    },
  },
});
