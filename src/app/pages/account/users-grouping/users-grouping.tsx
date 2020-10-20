import React, {useMemo} from 'react';
import {useUsersUIContext} from '../users-ui-context';

export function UsersGrouping() {
  // Customers UI Context
  const usersUIContext: any = useUsersUIContext();
  const usersUIProps = useMemo(() => {
    return {
      ids: usersUIContext.ids,
      setIds: usersUIContext.setIds,
      //   openDeleteCustomersDialog: customersUIContext.openDeleteCustomersDialog,
      //   openFetchCustomersDialog: customersUIContext.openFetchCustomersDialog,
      //   openUpdateCustomersStatusDialog:
      //     customersUIContext.openUpdateCustomersStatusDialog,
    };
  }, [usersUIContext]);
  
  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{usersUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                // onClick={customersUIProps.openDeleteCustomersDialog}
              >
                <i className="fa fa-trash"/> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-danger font-weight-bolder font-size-sm"
                // onClick={customersUIProps.openFetchCustomersDialog}
              >
                <i className="fa fa-stream"/> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-danger font-weight-bolder font-size-sm"
                // onClick={customersUIProps.openUpdateCustomersStatusDialog}
              >
                <i className="fa fa-sync-alt"/> Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
