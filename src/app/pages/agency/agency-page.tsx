import React from 'react';
import {Redirect, Switch} from 'react-router-dom';
import AgencyManagement from './agency-management/agency-management';
import AgencyType from './agency-type/agency-type';
import {ContentRoute} from "../../layout/components/content/content-route";

function AgencyPage() {
  return (
    <Switch>
      <Redirect exact={true} from="/agency" to="/agency/agency-management"/>
      <ContentRoute
        children={null}
        path="/agency/agency-management"
        component={AgencyManagement}
        render={null}
      />
      <ContentRoute children={null} path="/agency/classify" component={AgencyType} render={null}/>
    </Switch>
  );
}

export default AgencyPage;