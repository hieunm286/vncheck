import React, { useMemo } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '../../../../../_metronic/_partials/controls';
import { UsersTable } from './users-table/users-table.tsx';
import { UsersGrouping } from './users-grouping/users-grouping.tsx';
import { useUsersUIContext } from './users-ui-context';
import { UsersFilter } from './users-filter/users-filter.tsx';

export function UsersCard() {
  const usersUIContext = useUsersUIContext();
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
        <UsersFilter />
        {usersUIProps.ids.length > 0 && <UsersGrouping />}
        <UsersTable />
      </CardBody>
    </Card>
  );
}
