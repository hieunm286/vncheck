import React, { Suspense, lazy } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { LayoutSplashScreen, ContentRoute } from '../_metronic/layout';
import { ChangeUserPassword } from './pages/ChangeUserPassword';

const GoogleMaterialPage = lazy(() =>
  import('./modules/GoogleMaterialExamples/GoogleMaterialPage'),
);
const ReactBootstrapPage = lazy(() =>
  import('./modules/ReactBootstrapExamples/ReactBootstrapPage'),
);
const ECommercePage = lazy(() => import('./modules/ECommerce/pages/eCommercePage'));

const AccountPage = lazy(() => import('./modules/Account/pages/AccountPage'));

const WebsocketPage = lazy(() => import('./modules/Websocket/WebsocketPage'));

const ProductPage = lazy(() => import('./modules/Product/pages/ProductPage'));

const AgencyPage = lazy(() => import('./modules/Agency/pages/AgencyPage'));

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          <Redirect exact from="/" to="/account" />
        }
        <ContentRoute
          children={null}
          path="/change-userpassword"
          component={ChangeUserPassword}
          render={null}
        />

        <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/react-bootstrap" component={ReactBootstrapPage} />
        <Route path="/account" component={AccountPage} />
        <Route path="/websocket" component={WebsocketPage} />
        <Route path="/product-category" component={ProductPage} />
        <Route path="/agency" component={AgencyPage} />
        <Route path="/e-commerce" component={ECommercePage} />

        <Redirect to="/error/error-v1" />
      </Switch>
    </Suspense>
  );
}
