import React, {Component} from 'react';
import {connect, RootStateOrAny} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {LayoutSplashScreen} from "../../../layout/_core/metronic-splash-screen";
import * as auth from '../_redux/auth-redux';

interface LogoutProps {
  _certificate?: any;
  logout: () => void;
}

export class Logout extends Component<LogoutProps> {
  componentDidMount() {
    this.props.logout();
  }
  
  render() {
    const {search} = window.location;
    let callbackUrl = new URLSearchParams(search).get('callbackUrl');
    
    const {_certificate} = this.props;
    return _certificate ? (
      <LayoutSplashScreen/>
    ) : (
      <Redirect to={'/auth/login?callbackUrl=' + callbackUrl}/>
    );
  }
}

export default connect(({auth}: { auth: RootStateOrAny }) => auth, auth.actions)(Logout);
