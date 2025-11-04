import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * A component that acts as a guard for routes requiring authentication.
 *
 * This component is designed to be used with `react-router-dom`. It checks the
 * user's authentication status via the `useAuth` hook.
 *
 * - If the authentication state is still loading (e.g., checking localStorage),
 *   it displays a loading indicator.
 * - If the user is not authenticated, it redirects them to the '/auth' page.
 * - If the user is authenticated, it renders the child route components using
 *   the `<Outlet />` component from `react-router-dom`.
 *
 * @returns {JSX.Element} The loading indicator, a `Navigate` component for
 *   redirection, or an `Outlet` for rendering the protected route's content.
 */
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // While the AuthContext is checking for a persisted token, show a loading state.
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect them to the main authentication page.
    return <Navigate to="/auth" replace />;
  }

  // If the user is authenticated, render the nested child route.
  return <Outlet />;
};

export default ProtectedRoute;
