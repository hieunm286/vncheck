import {createSlice} from '@reduxjs/toolkit';

export interface AgencyTypeState {
  listLoading: boolean;
  actionsLoading: boolean;
  totalCount: number;
  entities: any;
  agencyTypeForEdit: any;
  agencyTypeForView: any;
  lastError: any;
  error: string | any;
}

const initialAgencyTypeState: AgencyTypeState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  agencyTypeForEdit: undefined,
  agencyTypeForView: undefined,
  lastError: null,
  error: null,
};

export const callTypes = {
  list: 'list',
  action: 'action',
};

export const agencyTypeSlice = createSlice({
  name: 'agencyType',
  initialState: initialAgencyTypeState,
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
    agencyTypeFetched: (state, action) => {
      console.log(action.payload);
      state.actionsLoading = false;
      state.agencyTypeForEdit = action.payload.agencyTypeForEdit;
      state.error = null;
    },
    agencyTypesFetched: (state, action) => {
      const { results } = action.payload;
      console.log(action.payload);
      state.listLoading = false;
      state.error = null;
      state.entities = results;
      state.totalCount = results.length;
    },
    agencyTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.agencyType);
    },
    agencyTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity: { code: string }) => {
        if (entity.code === action.payload.agencyType.code) {
          return action.payload.agencyType;
        }
        return entity;
      });
    },
    agencyTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      console.log(action.payload);
      state.entities = state.entities.filter((el: { code: string }) => el.code !== action.payload.code);
    },
    agencyTypeViewFetched: (state, action) => {
      console.log(action.payload);
      state.actionsLoading = false;
      state.agencyTypeForView = action.payload.agencyTypeForView;
      state.error = null;
    },
  },
});
