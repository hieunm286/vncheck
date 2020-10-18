import React, {Suspense, lazy} from 'react';
import {Redirect, Switch, Route} from 'react-router-dom';
import {BuilderPage} from './pages/builder-page';
import {ChangeUserPassword} from "./pages/change-user-password";
import {LayoutSplashScreen} from "./layout/_core/metronic-splash-screen";
import {ContentRoute} from "./layout/components/content/content-route";

const AccountPage = lazy(() => import('./pages/account/pages/account-page'));

const ProductPage = lazy(() => import('./pages/product/pages/product-page'));

const AgencyPage = lazy(() => import('./pages/agency/agency-page'));

export default function BasePage() {
    // useEffect(() => {
    //   console.log('Base page');
    // }, []) // [] - is required if you need only one call
    // https://reactjs.org/docs/hooks-reference.html#useeffect

    return (
        <Suspense fallback={<LayoutSplashScreen/>}>
            <Switch>
                <Redirect exact from="/" to="/account"/>
                <ContentRoute children={null} path="/builder" component={BuilderPage} render={null}/>
                <ContentRoute children={null} path="/change-password" component={ChangeUserPassword} render={null}/>
                <Route path="/account" component={AccountPage}/>
                <Route path="/product-category" component={ProductPage}/>
                <Route path="/agency" component={AgencyPage}/>
                {/*<Redirect to="/error/error-v1"/>*/}
            </Switch>
        </Suspense>
    );
}
