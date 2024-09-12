import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/reducers/AuthSlices';

const PrivateRoute = ({ element }) => {
  const isAuth = useSelector(selectIsAuth);
  const location = useLocation();
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return element;
};

export default PrivateRoute;
