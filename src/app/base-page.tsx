import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ChangeUserPassword } from './pages/change-user-password';
import { LayoutSplashScreen } from './layout/_core/metronic-splash-screen';
import { ContentRoute } from './layout/components/content/content-route';

const AccountPage = lazy(() => import('./pages/account'));

const ProductPage = lazy(() => import('./pages/product'));

const AgencyPage = lazy(() => import('./pages/agency/agency'));

const AgencyTypePage = lazy(() => import('./pages/agency-type-2/agency-type'));

// const CategoryPage = lazy(() => import('./pages/category/category-page'));
const BasicUnitPage = lazy(() => import('./pages/basic-unit/basic-unit'));

const PurchaseOrderPage = lazy(() => import('./pages/purchase-order/purchase-order'));

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <Redirect exact from="/" to="/account/user" />
        <ContentRoute
          children={null}
          path="/change-password"
          component={ChangeUserPassword}
          render={null}
        />
        <Route path="/account" component={AccountPage} />
        <Route path="/product-category" component={ProductPage} />
        <Route path="/agency" component={AgencyPage} />
        {/*<Route path="/category" component={CategoryPage}/>*/}
        <Route path="/basic-unit" component={BasicUnitPage} />
        <Route path="/purchase-order" component={PurchaseOrderPage} />
        {/* <Redirect to="/error/error-v1" /> */}
      </Switch>
    </Suspense>
  );
}
