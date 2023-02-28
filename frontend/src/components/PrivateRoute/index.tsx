import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/configureStore';

interface PrivateRouteProp {
  element: any,
}

const PrivateRoute = ({element}: PrivateRouteProp) => {
  const { isAuthenticated } = useAppSelector((state) => state.authenticationState);

  const Component = element
  //if (loading) return <Spinner />;
  if (isAuthenticated) return <Component />;
  return <Navigate to="/login" />;
};

export default PrivateRoute
