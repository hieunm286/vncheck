import React, {Suspense, lazy} from 'react';
import {Redirect, Switch, Route} from 'react-router-dom';
import {ChangeUserPassword} from "./pages/change-user-password";
import {LayoutSplashScreen} from "./layout/_core/metronic-splash-screen";
import {ContentRoute} from "./layout/components/content/content-route";

const AccountPage = lazy(() => import('./pages/account/pages/account-page'));

const ProductPage = lazy(() => import('./pages/product/pages/product-page'));

const  AgencyManagement = lazy(() => import('./pages/agency-management/agency-management'));

const  AgencyType = lazy(() => import('./pages/agency-type/agency-type'));

export default function BasePage() {
    // useEffect(() => {
    //   console.log('Base page');
    // }, []) // [] - is required if you need only one call
    // https://reactjs.org/docs/hooks-reference.html#useeffect

    return (
        <Suspense fallback={<LayoutSplashScreen/>}>
            <Switch>
                <Redirect exact from="/" to="/account"/>
                <ContentRoute children={null} path="/change-password" component={ChangeUserPassword} render={null}/>
                <Route path="/account" component={AccountPage}/>
                <Route path="/product-category" component={ProductPage}/>
                <Route path="/agency-management" component={AgencyManagement}/>
                <Route path="/agency-type" component={AgencyType}/>
                {/*<Redirect to="/error/error-v1"/>*/}
            </Switch>
        </Suspense>
    );
}
