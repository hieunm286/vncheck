import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const RefreshRoute = ({ component: Component, editEntity, ...rest }: any) => {
  console.log(editEntity);

  return (
    <Route
      {...rest}
      render={props =>
        editEntity ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/purchaseOrder',
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = (state: any) => ({
  editEntity: state.reducer,
});

export default connect(mapStateToProps)(RefreshRoute);
