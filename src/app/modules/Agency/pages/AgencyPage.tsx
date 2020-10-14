import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { ContentRoute } from '../../../../_metronic/layout';
import AgencyManagement from './AgencyManagement/AgencyManagement';
import AgencyType from './AgencyType/AgencyType';

function AgencyPage() {
  return (
    <Switch>
      <Redirect exact={true} from="/agency" to="/agency/agency-management" />
      <ContentRoute
        children={null}
        path="/agency/agency-management"
        component={AgencyManagement}
        render={null}
      />
      <ContentRoute children={null} path="/agency/classify" component={AgencyType} render={null} />
    </Switch>
  );
}

export default AgencyPage;
