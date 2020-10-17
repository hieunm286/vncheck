import React, {Suspense, lazy} from 'react';
import {Redirect, Switch, Route} from 'react-router-dom';
import {LayoutSplashScreen, ContentRoute} from '../_metronic/layout';
import {BuilderPage} from './pages/builder-page';
import {DashboardPage} from "./pages/dashboard-page";
import {MyPage} from "./pages/my-page";
import {ChangeUserPassword} from "./pages/change-user-password";

const GoogleMaterialPage = lazy(() =>
    import('../_metronic/modules/GoogleMaterialExamples/GoogleMaterialPage'),
);
const ReactBootstrapPage = lazy(() =>
    import('../_metronic/modules/ReactBootstrapExamples/ReactBootstrapPage'),
);
const ECommercePage = lazy(() => import('../_metronic/modules/ECommerce/pages/eCommercePage'));

const AccountPage = lazy(() => import('./pages/account/pages/account-page'));

const WebsocketPage = lazy(() => import('../_metronic/modules/Websocket/WebsocketPage'));

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
                {
                    /* Redirect from root URL to /dashboard. */
                    <Redirect exact from="/" to="/dashboard"/>
                }
                <ContentRoute children={null} path="/dashboard" component={DashboardPage} render={null}/>
                <ContentRoute children={null} path="/builder" component={BuilderPage} render={null}/>
                <ContentRoute children={null} path="/my-page" component={MyPage} render={null}/>
                <ContentRoute children={null} path="/change-password" component={ChangeUserPassword} render={null}/>
                <Route path="/google-material" component={GoogleMaterialPage}/>
                <Route path="/react-bootstrap" component={ReactBootstrapPage}/>
                <Route path="/account" component={AccountPage}/>
                <Route path="/websocket" component={WebsocketPage}/>
                <Route path="/product-category" component={ProductPage}/>
                <Route path="/agency" component={AgencyPage}/>
                <Route path="/e-commerce" component={ECommercePage}/>

                <Redirect to="/error/error-v1"/>
            </Switch>
        </Suspense>
    );
}
