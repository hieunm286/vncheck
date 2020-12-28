import {createSlice} from '@reduxjs/toolkit';

export interface UserState {
  listLoading: boolean;
  actionsLoading: boolean;
  totalCount: number;
  entities: any;
  entitiesTag: any;
  userForEdit: any;
  lastError: any;
  transactionData: any;
  error: string | any;
}

const initialUsersState: UserState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  entitiesTag: null,
  userForEdit: undefined,
  lastError: null,
  transactionData: null,
  error: null,
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
      // console.log(action.payload);
      state.actionsLoading = false;
      state.userForEdit = action.payload.userForEdit;
      state.error = null;
    },
    usersFetched: (state, action) => {
      const {total, data} = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = data;
      state.totalCount = total;
    },
    usersFetchedTag: (state, action) => {
      const {total, data} = action.payload;
      state.listLoading = false;
      state.error = null;
      if (!state.entitiesTag) {
        state.entitiesTag = data;
        
      } else {
        const newTag = [...state.entitiesTag]
        data.forEach((el: any) => {
          newTag.push(el)
        })
        state.entitiesTag = newTag;
      }
      state.totalCount = total;
    },
    usersSearchTag: (state, action) => {
      const {total, data} = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entitiesTag = data;
      state.totalCount = total;
    },
    userCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.user);
    },
    userUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity: { username: any }) => {
        if (entity.username === action.payload.user.username) {
          return action.payload.user;
        }
        return entity;
      });
    },
    userDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter((el: { id: any }) => el.id !== action.payload.id);
    },
    transactionCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.transactionData = action.payload.dataSign;
    },
  },
});
