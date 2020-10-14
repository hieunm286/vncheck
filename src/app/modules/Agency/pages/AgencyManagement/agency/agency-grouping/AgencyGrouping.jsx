import React, { useMemo } from 'react';
import { useAgencyUIContext } from '../AgencyUIContext';

export function AgencyGrouping() {
  // Customers UI Context
  const agencyUIContext = useAgencyUIContext();
  const agencyUIProps = useMemo(() => {
    return {
      ids: agencyUIContext.ids,
      setIds: agencyUIContext.setIds,
      //   openDeleteCustomersDialog: customersUIContext.openDeleteCustomersDialog,
      //   openFetchCustomersDialog: customersUIContext.openFetchCustomersDialog,
      //   openUpdateCustomersStatusDialog:
      //     customersUIContext.openUpdateCustomersStatusDialog,
    };
  }, [agencyUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{agencyUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                // onClick={customersUIProps.openDeleteCustomersDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-danger font-weight-bolder font-size-sm"
                // onClick={customersUIProps.openFetchCustomersDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-danger font-weight-bolder font-size-sm"
                // onClick={customersUIProps.openUpdateCustomersStatusDialog}
              >
                <i className="fa fa-sync-alt"></i> Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
