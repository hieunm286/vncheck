import {SignalCellularNull} from '@material-ui/icons';
import React from 'react';
import { Route } from 'react-router-dom';
import { UserDeleteDialog } from './users-delete-dialog/user-delete-dialog';
import { UserEditDialog } from './users-edit-dialog/user-edit-dialog';
import { UsersCard } from './users-card';
import { UsersUIProvider } from './users-ui-context';

function User({history}: { history: any }) {
  const usersUIEvents = {
    newUserButtonClick: () => {
      history.push('/account/user/new');
    },
    openEditUserDialog: (id: any) => {
      history.push(`/account/user/${id}/edit`);
    },
    openDeleteUserDialog: (id: any) => {
      history.push(`/account/user/${id}/delete`);
    },
    // openDeleteCustomersDialog: () => {
    //   history.push(`/e-commerce/customers/deleteCustomers`);
    // },
    // openFetchCustomersDialog: () => {
    //   history.push(`/e-commerce/customers/fetch`);
    // },
    // openUpdateCustomersStatusDialog: () => {
    //   history.push("/e-commerce/customers/updateStatus");
    // }
  };
  
  return (
    <UsersUIProvider usersUIEvents={usersUIEvents}>
      <Route path="/account/user/new">
        {({history, match}) => (
          <UserEditDialog
            id={null}
            show={match != null}
            onHide={() => {
              history.push('/account/user');
            }}
          />
        )}
      </Route>
      <Route path="/account/user/:id/edit">
        {({history, match}) => (
          <UserEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/account/user');
            }}
          />
        )}
      </Route>
      <Route path="/account/user/:id/delete">
        {({history, match}) => (
          <UserDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/account/user');
            }}
          />
        )}
      </Route>
      <UsersCard/>
    </UsersUIProvider>
  );
}

export default User;
