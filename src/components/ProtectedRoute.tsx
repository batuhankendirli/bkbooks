import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { uid } = useAppSelector((state) => state.user);

  return <>{uid ? children : <Navigate to={'/'} />}</>;
};

export default ProtectedRoute;
