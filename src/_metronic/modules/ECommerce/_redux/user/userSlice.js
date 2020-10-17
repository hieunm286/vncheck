import { createSlice } from '@reduxjs/toolkit';

const initialUsersState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  userForEdit: undefined,
  lastError: null,
};

export const callTypes = {
  list: 'list',
  action: 'action',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsersState,
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
    userFetched: (state, action) => {
      state.actionsLoading = false;
      state.userForEdit = action.payload.userForEdit;
      state.error = null;
    },
    usersFetched: (state, action) => {
      const { total, data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = data;
      state.totalCount = total;
    },
    userCreated: (state, action) => {
      console.log(action.payload.data);
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.user);
    },
    userUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.user.id) {
          return action.payload.user;
        }
        return entity;
      });
    },
    userDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
  },
});
