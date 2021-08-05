import React, { Suspense, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NotFoundView from '../views/NotFound/NotFound';
import imgIcon from '../assets/images/logo512.png';
import { privateRoutes } from './config';
import PrivateRoute from '../components/RouteWithLayout/PrivateRoute';
import { getData } from '../redux/reducers/slicers/cooperatives';
import { getCategories } from '../redux/reducers/slicers/Products';

const FallBackIcon = (
  <div className="full-page-loader">
    <img width="200" src={imgIcon} alt="Food Crowdy" />
  </div>
);

const Routes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Suspense fallback={FallBackIcon}>
      <Switch>
        {privateRoutes.map((route, i) => (
          <PrivateRoute
            key={i++}
            exact
            {...route}
          />
        ))}
        <Route component={NotFoundView} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
