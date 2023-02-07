import { auth } from '../services/api';
import { Navigate, useLocation } from 'react-router-dom';

export function ProtectedRouteElement({ element, forAuthenticated = false }) {
    const isLoggedIn = auth.isLoggedIn();
    const location = useLocation();

    if (forAuthenticated) {
      return isLoggedIn ? <Navigate to="/" replace state={{prev: location.pathname}}/> : element;
  }

    return isLoggedIn ? element : <Navigate to="/login" replace state={{prev: location.pathname}}/>;
} 