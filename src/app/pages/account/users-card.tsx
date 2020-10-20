import React, {useMemo} from 'react';
import {useUsersUIContext} from './users-ui-context';
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../components/card";
import {UsersFilter} from "./users-filter/users-filter";
import {UsersGrouping} from "./users-grouping/users-grouping";
import {UsersTable} from "./users-table/users-table";

export function UsersCard() {
  const usersUIContext: any = useUsersUIContext();
  const usersUIProps = useMemo(() => {
    return {
      ids: usersUIContext.ids,
      newUserButtonClick: usersUIContext.newUserButtonClick,
    };
  }, [usersUIContext]);
  
  return (
    <Card>
      <CardHeader title="Users list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-danger"
            onClick={usersUIProps.newUserButtonClick}>
            New User
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <UsersFilter/>
        {usersUIProps.ids.length > 0 && <UsersGrouping/>}
        <UsersTable/>
      </CardBody>
    </Card>
  );
}
