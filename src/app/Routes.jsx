/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React from 'react';
import { Redirect, Switch, Route, useLocation } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { Layout } from '../_metronic/layout';
import BasePage from './BasePage';
import { Logout, AuthPage } from './modules/Auth';
import ErrorsPage from './modules/ErrorsExamples/ErrorsPage';

export function Routes() {
  const userInfo = useSelector(({ auth }) => auth);
  const location = window.location;
  const { pathname } = location;
  const { search } = location;
  let callbackUrl = new URLSearchParams(search).get('callbackUrl');
  callbackUrl = callbackUrl ? callbackUrl : pathname;
  const isAuthUrls = callbackUrl.indexOf('/logout') > -1 || callbackUrl.indexOf('/auth/') > -1;
  callbackUrl = !isAuthUrls ? callbackUrl : '/';
  // console.log(location);
  // console.log(callbackUrl);
  const isLoggedInAndUnexpired = () => {
    const unexpired = () => {
      const expiredTime = new Date(userInfo._certificate.certificateInfo.timestamp);
      expiredTime.setSeconds(expiredTime.getSeconds() + userInfo._certificate.certificateInfo.exp);
      return expiredTime.getTime() > new Date().getTime();
    };
    return userInfo._certificate && !userInfo._preLoggedIn && unexpired();
  };
  // console.log('---user info-------');
  // console.log(userInfo);
  let { username } = useSelector(({ auth }) => auth);
  username = location.pathname === '/auth/login/identifier' ? null : username;
  const isNeedChangePassword =
    userInfo._error && userInfo._error === 'AUTH.ERROR.NEED_TO_CHANGE_PASSWORD';
  const CheckAuth = () => {
    if (isNeedChangePassword) {
      return (
        <>
          <Route>
            <AuthPage />
          </Route>
          <Redirect to={'/auth/change-password?callbackUrl=' + callbackUrl} />
        </>
      );
    } else if (isLoggedInAndUnexpired()) {
      // console.log(window.location);
      return (
        <>
          <Layout>
            <BasePage />
          </Layout>
          <Redirect to={callbackUrl} />
          {
            //TODO: Redirect to requested page.
          }
        </>
      );
    } else
      return (
        <>
          <Route>
            <AuthPage />
          </Route>
          {username ? (
            <Redirect to={'/auth/login/challenge?callbackUrl=' + callbackUrl} />
          ) : (
            <Redirect to={'/auth/login/identifier?callbackUrl=' + callbackUrl} />
          )}
        </>
        /*Render auth page when user at `/auth` and not authorized.*/
      );
  };
  return (
    <Switch>
      <Route path="/error" component={ErrorsPage} />
      <Route path={'/logout'} component={Logout} />
      <CheckAuth />
    </Switch>
  );
}
