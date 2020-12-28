import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {AgencyCard} from './agency-card';
import AgencyCardHeader from './agency-card-header';
import {AgencyUIProvider} from './agency-ui-context';

function AgencyManagement({history}: { history: any }) {
  const agencyUIEvents = {
    newAgencyButtonClick: () => {
      history.push('/agency/new');
    },
    openEditAgencyDialog: (id: any) => {
      history.push(`/agency/${id}/edit`);
    },
    openDeleteAgencyDialog: (id: any) => {
      history.push(`/agency/${id}/delete`);
    },
    openDetailAgencyDialog: (id: any) => {
      history.push(`/agency/${id}/view`);
    },
    openDeleteManyAgencyDialog: () => {
      history.push(`/agency/delete-agencies`);
    },
  };
  
  return (
    <AgencyUIProvider agencyUIEvents={agencyUIEvents}>
      {/*<Route path="/agency/:id/view">*/}
      {/*  {({history, match}) => (*/}
      {/*    <AgencyDetailDialog*/}
      {/*      show={match != null}*/}
      {/*      id={match && match.params.id}*/}
      {/*      onHide={() => {*/}
      {/*        history.push('/agency');*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*</Route>*/}
      {/*<Route path="/agency/delete-agencies">*/}
      {/*  {({history, match}) => (*/}
      {/*    <AgencyDeleteManyDialog*/}
      {/*      show={match != null}*/}
      {/*      onHide={() => {*/}
      {/*        history.push('/agency');*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*</Route>*/}
      {/*<Route path="/agency/:id/delete">*/}
      {/*  {({history, match}) => (*/}
      {/*    <AgencyDeleteDialog*/}
      {/*      show={match != null}*/}
      {/*      id={match && match.params.id}*/}
      {/*      onHide={() => {*/}
      {/*        history.push('/agency');*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*</Route>*/}
      <Switch>
        {/*<Route path="/agency/:id/edit">*/}
        {/*  {({history, match}) => (*/}
        {/*    <AgencyEditDialog*/}
        {/*      show={match != null}*/}
        {/*      id={match && match.params.id}*/}
        {/*      onHide={() => {*/}
        {/*        history.push('/agency');*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  )}*/}
        {/*</Route>*/}
        {/*<Route path="/agency/new">*/}
        {/*  {({history, match}) => (*/}
        {/*    <AgencyEditDialog*/}
        {/*      show={match != null}*/}
        {/*      id={match && match.params.id}*/}
        {/*      onHide={() => {*/}
        {/*        history.push('/agency');*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  )}*/}
        {/*</Route>*/}
        
        <Route path="/agency">
          <AgencyCardHeader/>
          <AgencyCard/>
        </Route>
      </Switch>
    </AgencyUIProvider>
  );
}

export default AgencyManagement;
