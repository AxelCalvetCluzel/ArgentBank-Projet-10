
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/reducers/AuthSlices';

const PrivateRoute = ({ element: Element }) => {
  const isAuth = useSelector(selectIsAuth);
  const location = useLocation();

  return isAuth ? (
    <Element />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
