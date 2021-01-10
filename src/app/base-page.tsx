import React, {lazy, Suspense} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {ChangeUserPassword} from './pages/change-user-password';
import {LayoutSplashScreen} from './layout/_core/metronic-splash-screen';
import {ContentRoute} from './layout/components/content/content-route';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserPage = lazy(() => import('./pages/user/user'));

const ProductPage = lazy(() => import('./pages/product'));

const AgencyPage = lazy(() => import('./pages/agency/agency'));

const AgencyTypePage = lazy(() => import('./pages/agency-type-2/agency-type'));

// const CategoryPage = lazy(() => import('./pages/category/category-page'));
const BasicUnitPage = lazy(() => import('./pages/basic-unit/basic-unit'));

const PurchaseOrderPage = lazy(() => import('./pages/purchase-order/purchase-order'));

const LandLotPage = lazy(() => import('./pages/land-lot/land-lot'));
const ProductType = lazy(() => import('./pages/species/species'));

const ProductPackaging = lazy(() => import('./pages/product-packaging/product-packaging'));

const MultilevelSale = lazy(() => import('./pages/multilevel-sale/multilevel-sale'));

const ShippingAgency = lazy(() => import('./pages/shipping-agency/shipping-agency'));

const ProductionPlan = lazy(() => import('./pages/production-plan/production-plan'));

const ProductionManagement = lazy(() => import('./pages/production-management/production-management'))
const QrManagement = lazy(() => import('./pages/qr-management/qr'))
const RolePage = lazy(() => import('./pages/role/role'))

const ManagementOrganization = lazy(() => import('./pages/management-organization/management-organization'))

const CustomersManagement = lazy(() => import('./pages/customers/customers-management'))

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect
  return (
    <Suspense fallback={<LayoutSplashScreen/>}>
      <ToastContainer/>
      
      <Switch>
        <Redirect exact from="/" to="/account/user"/>
        <ContentRoute
          children={null}
          path="/change-password"
          component={ChangeUserPassword}
          render={null}
        />
        <Route path="/account/user" component={UserPage}/>
        <Route path="/product-category" component={ProductPage}/>
        <Route path="/agency" component={AgencyPage}/>
        {/*<Route path="/category" component={CategoryPage}/>*/}
        <Route path="/basic-unit" component={BasicUnitPage}/>
        <Route path="/purchase-order" component={PurchaseOrderPage}/>
        <Route path="/land-lot" component={LandLotPage}/>
        <Route path="/species" component={ProductType}/>
        <Route path="/product-packaging" component={ProductPackaging}/>
        <Route path="/multilevel-sale" component={MultilevelSale}/>
        <Route path="/shipping-agency" component={ShippingAgency}/>
        <Route path="/production-plan" component={ProductionPlan}/>
        <Route path="/production-management" component={ProductionManagement}/>
        <Route path="/qr" component={QrManagement}/>
        <Route path="/management-organization" component={ManagementOrganization}/>
        <Route path="/account/role" component={RolePage}/>
        <Route path="/customers-management" component={CustomersManagement}/>
        
        <Redirect to="/error/error-v1"/>
      </Switch>
    </Suspense>
  );
}
