import React, {Suspense, lazy} from 'react';
import {Redirect, Switch, Route} from 'react-router-dom';
import {ChangeUserPassword} from "./pages/change-user-password";
import {LayoutSplashScreen} from "./layout/_core/metronic-splash-screen";
import {ContentRoute} from "./layout/components/content/content-route";

const User = lazy(() => import('./pages/account/'));

const ProductPage = lazy(() => import('./pages/product/'));

const  AgencyManagement = lazy(() => import('./pages/agency-management'));

const  AgencyType = lazy(() => import('./pages/agency-type'));

export default function BasePage() {
    // useEffect(() => {
    //   console.log('Base page');
    // }, []) // [] - is required if you need only one call
    // https://reactjs.org/docs/hooks-reference.html#useeffect

    return (
        <Suspense fallback={<LayoutSplashScreen/>}>
            <Switch>
                <Redirect exact from="/" to="/account/user"/>
                <ContentRoute children={null} path="/change-password" component={ChangeUserPassword} render={null}/>
                <Route path="/account/user" component={User}/>
                <Route path="/product-category" component={ProductPage}/>
                <Route path="/agency-management" component={AgencyManagement}/>
                <Route path="/agency-type" component={AgencyType}/>
                {/*<Redirect to="/error/error-v1"/>*/}
            </Switch>
        </Suspense>
    );
}
