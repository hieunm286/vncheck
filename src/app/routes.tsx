/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React from 'react';
import {Redirect, Switch, Route, useLocation} from 'react-router-dom';
import {shallowEqual, useSelector} from 'react-redux';
import BasePage from './base-page';
import {Layout} from "./layout/components/layout";
import ErrorsPage from "./layout/errors/errors-page";
import {renderRoutes} from "react-router-config";
import {AuthPage, Logout} from "./pages/auth";

export function Routes() {
    const userInfo = useSelector(({auth}: any) => auth);
    const location = window.location;
    const {pathname} = location;
    const {search} = location;
    const temp = new URLSearchParams(search).get('callbackUrl');
    let callbackUrl = temp ? temp : pathname;
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
    let {username} = useSelector(({auth}: any) => auth);
    username = location.pathname === '/auth/login/identifier' ? null : username;
    const isNeedChangePassword =
        userInfo._error && userInfo._error === 'AUTH.ERROR.NEED_TO_CHANGE_PASSWORD';
    console.log(isNeedChangePassword);
    const CheckAuth = () => {
        if (isNeedChangePassword) {
            return (<Route>
                <AuthPage/>
                <Redirect to={'/auth/change-password?callbackUrl=' + callbackUrl}/>
            </Route>)
        } else if (isLoggedInAndUnexpired()) {
            return ([(<Redirect from={'/auth'} to={callbackUrl}/>), (<Layout>
                <BasePage/>
            </Layout>)]);
        } else return (<Route>
            <AuthPage/>
            (username ? (<Route><Redirect to={'/auth/login/challenge?callbackUrl=' + callbackUrl}/></Route>) :
            (<Route><Redirect to={'/auth/login/identifier?callbackUrl=' + callbackUrl}/></Route>))
        </Route>);
    };
    // const AuthRedirect = () => {
    //     if (isNeedChangePassword) {
    //         console.log(isNeedChangePassword);
    //         return (<Route><Redirect to={'/auth/change-password?callbackUrl=' + callbackUrl}/></Route>);
    //     } else if (isLoggedInAndUnexpired()) {
    //         console.log(111);
    //         return (<Redirect to={callbackUrl}/>);
    //     } else {
    //         return (username ? (<Route><Redirect to={'/auth/login/challenge?callbackUrl=' + callbackUrl}/></Route>) :
    //             (<Route><Redirect to={'/auth/login/identifier?callbackUrl=' + callbackUrl}/></Route>));
    //     }
    // };
    return (
        <Switch>
            <Route path='/error' component={ErrorsPage}/>
            <Route path='/logout' component={Logout}/>
            {CheckAuth()}
            {/*{AuthRedirect()}*/}
        </Switch>
    );
}
