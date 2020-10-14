import React from 'react';
import { AgencyTypeUIProvider } from './type/AgencyTypeUIContext';
import { Route } from 'react-router-dom';
import { AgencyTypeEditDialog } from './type/agencyType-edit-dialog/AgencyTypeEditDialog';
import { AgencyTypeDeleteDialog } from './type/agencyType-delete-dialog/AgencyTypeDeleteDialog';
import AgencyTypeDetailDialog from './type/agencyType-detail-dialog/AgencyTypeDetailDialog';
import { AgencyTypeCard } from './type/AgencyTypeCard';
import { AgencyUIProvider } from './agency/AgencyUIContext';
import { AgencyDeleteDialog } from './agency/agency-delete-dialog/AgencyDeleteDialog';
import { AgencyCard } from './agency/AgencyCard';

function AgencyType({ history }: { history: any }) {
  const agencyTypeUIEvents = {
    newAgencyTypeButtonClick: () => {
      history.push('/agency/classify/new');
    },
    openEditAgencyTypeDialog: (id: any) => {
      history.push(`/agency/classify/${id}/edit`);
    },
    openDeleteAgencyTypeDialog: (id: any) => {
      history.push(`/agency/classify/${id}/delete`);
    },
    openDetailAgencyTypeDialog: (id: any) => {
      history.push(`/agency/classify/${id}/view`);
    },
    newAgencyButtonClick: () => {
      history.push('/agency/classify/agency-management/new');
    },
    openEditAgencyDialog: (id: any) => {
      history.push(`/agency/classify/agency-management/${id}/edit`);
    },
    openDeleteAgencyDialog: (id: any) => {
      history.push(`/agency/classify/agency-management/${id}/delete`);
    },
    openDetailAgencyDialog: (id: any) => {
      history.push(`/agency/classify/agency-management/${id}/view`);
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
          <Route path="/agency/classify/new">
            {({ history, match }) => (
              <AgencyTypeEditDialog
                id={null}
                show={match != null}
                onHide={() => {
                  history.push('/agency/classify');
                }}
              />
            )}
          </Route>
          <Route path="/agency/classify/:id/edit">
            {({ history, match }) => (
              <AgencyTypeEditDialog
                show={match != null}
                id={match && match.params.id}
                onHide={() => {
                  history.push('/agency/classify');
                }}
              />
            )}
          </Route>
          <Route path="/agency/classify/:id/delete">
            {({ history, match }) => (
              <AgencyTypeDeleteDialog
                show={match != null}
                id={match && match.params.id}
                onHide={() => {
                  history.push('/agency/classify');
                }}
              />
            )}
          </Route>
          <Route path="/agency/classify/:id/view">
            {({ history, match }) => (
              <AgencyTypeDetailDialog
                show={match != null}
                id={match && match.params.id}
                onHide={() => {
                  history.push('/agency/classify');
                }}
              />
            )}
          </Route>
          {/* <AgencyCardHeader /> */}
          <AgencyTypeCard />
        </AgencyTypeUIProvider>
      </div>
      <div className="col-lg-6">
        <AgencyUIProvider agencyUIEvents={agencyTypeUIEvents}>
          <Route path="/agency/classify/agency-management/:id/delete">
            {({ history, match }) => (
              <AgencyDeleteDialog
                show={match != null}
                id={match && match.params.id}
                onHide={() => {
                  history.push('/agency/classify');
                }}
              />
            )}
          </Route>

          {/* <AgencyCardHeader /> */}
          <AgencyCard />
        </AgencyUIProvider>
      </div>
    </div>
  );
}

export default AgencyType;
