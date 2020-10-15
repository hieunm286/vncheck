import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { ContentRoute } from '../../../../_metronic/layout';
import Product from './Product';
import ProductGroup from './ProductGroup';

function ProductPage(props) {
    return (
        <Switch>
      <Redirect exact={true} from="/product-category" to="/product-category/product" />
      <ContentRoute path="/product-category/product" component={Product} />
      <ContentRoute path="/product-category/group-product" component={ProductGroup} />
    </Switch>
    );
}

export default ProductPage;