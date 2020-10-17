import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { ContentRoute } from '../../layout';
import Chat from './Chat';

function AccountPage(props) {
  return (
    <Switch>
      <Redirect exact={true} from="/websocket" to="/websocket/real-time-chat" />
      <ContentRoute path="/websocket/real-time-chat" component={Chat} />
    </Switch>
  );
}

export default AccountPage;
