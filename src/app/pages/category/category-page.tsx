import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { ContentRoute } from '../../layout/components/content/content-route';
import BasicUnit from './basic-unit/basic-unit';

function CategoryPage() {
  return (
    <Switch>
      <Redirect exact={true} from="/category" to="/category/basic-unit" />
      <ContentRoute
        children={null}
        path="/category/basic-unit"
        component={BasicUnit}
        render={null}
      />
    </Switch>
  );
}

export default CategoryPage;
