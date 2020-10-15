import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { ContentRoute } from '../../../../_metronic/layout';
import ListUsers from './ListUsers';
import TagsInput from './TagsInput';
import User from './User';

function AccountPage(props) {
  return (
    <Switch>
      <Redirect exact={true} from="/account" to="account/user"/>
        <ContentRoute path="/account/user" component={User}/>
      <ContentRoute path="/account/list-user" component={ListUsers} />
      <ContentRoute path="/account/tags-user" component={TagsInput} />
    </Switch>
  );
}

export default AccountPage;
