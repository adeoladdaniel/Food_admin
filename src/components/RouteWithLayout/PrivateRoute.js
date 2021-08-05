/* eslint-disable no-nested-ternary */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserUtils from '../../utils/functions/utilsFunc';

const PrivateRoute = (props) => {
  const {
    layout: Layout, role,
    routeAccess, component: Component,
    authPath, location, ...rest
  } = props;
  const isLoggedIn = UserUtils.userToken();

  // TODO: Fix Private route

  if (routeAccess) {
    return (
      <Route
        {...rest}
        render={(props) => (
          <Layout>
            <Component
              props={props}
              {...props}
            />
          </Layout>
        )}
      />
    );
  }

  return (
    <Route
      {...rest}
      render={(pageProps) => (isLoggedIn?.headers['x-auth-token'] ? (
        <Layout>
          <Component {...props} {...pageProps} />
        </Layout>
      ) : (
        <Redirect
          to={{
            pathname: authPath,
            state: { from: location }
          }}
        />
      ))}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.any.isRequired
};

export default PrivateRoute;
