import { SignalCellularNull } from '@material-ui/icons';
import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { ContentRoute } from '../../../../../_metronic/layout';
import { AgencyDeleteDialog } from './agency/agency-delete-dialog/AgencyDeleteDialog';
import { AgencyDeleteManyDialog } from './agency/agency-delete-many-dialog/AgencyDeleteManyDialog';
import AgencyDetailDialog from './agency/agency-detail-dialog/AgencyDetailDialog';
import { AgencyEditDialog } from './agency/agency-edit-dialog/AgencyEditDialog';
import { AgencyEditForm } from './agency/agency-edit-dialog/AgencyEditForm';
import { AgencyFilter } from './agency/agency-filter/AgencyFilter';
import { AgencyCard } from './agency/AgencyCard';
import AgencyCardHeader from './agency/AgencyCardHeader';
import { AgencyUIProvider } from './agency/AgencyUIContext';

function AgencyManagement({ history }: { history: any }) {
  const agencyUIEvents = {
    newAgencyButtonClick: () => {
      history.push('/agency/agency-management/new');
    },
    openEditAgencyDialog: (id: any) => {
      history.push(`/agency/agency-management/${id}/edit`);
    },
    openDeleteAgencyDialog: (id: any) => {
      history.push(`/agency/agency-management/${id}/delete`);
    },
    openDetailAgencyDialog: (id: any) => {
      history.push(`/agency/agency-management/${id}/view`);
    },
    openDeleteManyAgencyDialog: () => {
      history.push(`/agency/agency-management/delete-agencies`);
    },
  };

  return (
    <AgencyUIProvider agencyUIEvents={agencyUIEvents}>
      <Route path="/agency/agency-management/:id/view">
        {({ history, match }) => (
          <AgencyDetailDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/agency/agency-management');
            }}
          />
        )}
      </Route>
      <Route path="/agency/agency-management/delete-agencies">
        {({ history, match }) => (
          <AgencyDeleteManyDialog
            show={match != null}
            onHide={() => {
              history.push('/agency/agency-management');
            }}
          />
        )}
      </Route>
      <Route path="/agency/agency-management/:id/delete">
        {({ history, match }) => (
          <AgencyDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/agency/agency-management');
            }}
          />
        )}
      </Route>
      <Switch>
        <Route path="/agency/agency-management/:id/edit">
          {({ history, match }) => (
            <AgencyEditDialog
              show={match != null}
              id={match && match.params.id}
              onHide={() => {
                history.push('/agency/agency-management');
              }}
            />
          )}
        </Route>
        <Route path="/agency/agency-management/new">
          {({ history, match }) => (
            <AgencyEditDialog
              show={match != null}
              id={match && match.params.id}
              onHide={() => {
                history.push('/agency/agency-management');
              }}
            />
          )}
        </Route>

        <Route path="/agency/agency-management">
          <AgencyCardHeader />
          <AgencyCard />
        </Route>
      </Switch>
    </AgencyUIProvider>
  );
}

export default AgencyManagement;
