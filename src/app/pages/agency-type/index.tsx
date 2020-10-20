import React from 'react';
import { AgencyTypeUIProvider } from './agency-type-ui-context';
import { Route } from 'react-router-dom';
import { AgencyTypeEditDialog } from './agency-type-edit-dialog/agency-type-edit-dialog';
import { AgencyTypeDeleteDialog } from './agency-type-delete-dialog/agency-type-delete-dialog';
import AgencyTypeDetailDialog from './agency-type-detail-dialog/agency-type-detail-dialog';
import { AgencyTypeCard } from './agency-type-card';
import { AgencyUIProvider } from './agency-ui-context';
import { AgencyDeleteDialog } from './agency-delete-dialog/agency-delete-dialog';
import { AgencyCard } from './agency-card';

function AgencyType({history}: { history: any }) {
  const agencyTypeUIEvents = {
    newAgencyTypeButtonClick: () => {
      history.push('/agency-type/new');
    },
    openEditAgencyTypeDialog: (id: any) => {
      history.push(`/agency-type/${id}/edit`);
    },
    openDeleteAgencyTypeDialog: (id: any) => {
      history.push(`/agency-type/${id}/delete`);
    },
    openDetailAgencyTypeDialog: (id: any) => {
      history.push(`/agency-type/${id}/view`);
    },
    newAgencyButtonClick: () => {
      history.push('/agency-type/agency-management/new');
    },
    openEditAgencyDialog: (id: any) => {
      history.push(`/agency-type/agency-management/${id}/edit`);
    },
    openDeleteAgencyDialog: (id: any) => {
      history.push(`/agency-type/agency-management/${id}/delete`);
    },
    openDetailAgencyDialog: (id: any) => {
      history.push(`/agency-type/agency-management/${id}/view`);
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
    <div className="row">
      <div className="col-lg-6">
        <AgencyTypeUIProvider agencyTypeUIEvents={agencyTypeUIEvents}>
          <Route path="/agency-type/new">
            {({ history, match }) => (
              <AgencyTypeEditDialog
                id={null}
                show={match != null}
                onHide={() => {
                  history.push('/agency-type');
                }}
              />
            )}
          </Route>
          <Route path="/agency-type/:id/edit">
            {({ history, match }) => (
              <AgencyTypeEditDialog
                show={match != null}
                id={match && match.params.id}
                onHide={() => {
                  history.push('/agency-type');
                }}
              />
            )}
          </Route>
          <Route path="/agency-type/:id/delete">
            {({ history, match }) => (
              <AgencyTypeDeleteDialog
                show={match != null}
                id={match && match.params.id}
                onHide={() => {
                  history.push('/agency-type');
                }}
              />
            )}
          </Route>
          <Route path="/agency-type/:id/view">
            {({ history, match }) => (
              <AgencyTypeDetailDialog
                show={match != null}
                id={match && match.params.id}
                onHide={() => {
                  history.push('/agency-type');
                }}
              />
            )}
          </Route>
          {/* <AgencyCardHeader /> */}
          <AgencyTypeCard/>
        </AgencyTypeUIProvider>
      </div>
      <div className="col-lg-6">
        <AgencyUIProvider agencyUIEvents={agencyTypeUIEvents}>
          <Route path="/agency-type/agency-management/:id/delete">
            {({ history, match }) => (
              <AgencyDeleteDialog
                show={match != null}
                id={match && match.params.id}
                onHide={() => {
                  history.push('/agency-type');
                }}
              />
            )}
          </Route>
          
          {/* <AgencyCardHeader /> */}
          <AgencyCard/>
        </AgencyUIProvider>
      </div>
    </div>
  );
}

export default AgencyType;
