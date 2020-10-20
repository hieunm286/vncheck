import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {AgencyDeleteDialog} from './agency-delete-dialog/agency-delete-dialog';
import {AgencyDeleteManyDialog} from './agency-delete-many-dialog/agency-delete-many-dialog';
import AgencyDetailDialog from './agency-detail-dialog/agency-detail-dialog';
import {AgencyEditDialog} from './agency-edit-dialog/agency-edit-dialog';
import {AgencyCard} from './agency-card';
import AgencyCardHeader from './agency-card-header';
import {AgencyUIProvider} from './agency-ui-context';

function AgencyManagement({history}: { history: any }) {
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
        {({history, match}) => (
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
        {({history, match}) => (
          <AgencyDeleteManyDialog
            show={match != null}
            onHide={() => {
              history.push('/agency/agency-management');
            }}
          />
        )}
      </Route>
      <Route path="/agency/agency-management/:id/delete">
        {({history, match}) => (
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
          {({history, match}) => (
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
          {({history, match}) => (
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
          <AgencyCardHeader/>
          <AgencyCard/>
        </Route>
      </Switch>
    </AgencyUIProvider>
  );
}

export default AgencyManagement;
