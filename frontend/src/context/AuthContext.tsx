import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { loginUser as apiLogin } from '@/api/authApi';

/**
 * Represents the shape of the authenticated user object.
 * @interface
 */
interface User {
  id: number;
  email: string;
}

/**
 * Defines the shape of the authentication context's value.
 * @interface
 */
interface AuthContextType {
  /** A boolean flag indicating if the user is currently authenticated. */
  isAuthenticated: boolean;
  /** The authenticated user object, or null if not authenticated. */
  user: User | null;
  /** The JWT or session token, or null if not authenticated. */
  token: string | null;
  /** An async function to perform login. */
  login: (credentials: any) => Promise<void>;
  /** A function to perform logout. */
  logout: () => void;
  /** A boolean flag indicating if the auth state is being loaded from storage. */
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * A React component that provides authentication state to its children.
 *
 * This provider manages the user's authentication status, user data, and
 * token. It also handles persisting this state to `localStorage` to keep the
 * user logged in across browser sessions. It exposes `login` and `logout`
 * functions to modify the auth state.
 *
 * @param {{ children: ReactNode }} props The component props.
 * @param {ReactNode} props.children The child components that will consume the context.
 * @returns {JSX.Element} The provider component wrapping the children.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // On initial application load, try to hydrate auth state from localStorage.
    try {
      const storedToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('authUser');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse auth data from localStorage", error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (credentials: any) => {
    const response = await apiLogin(credentials);
    const { token: newToken, user: newUser } = response;

    setToken(newToken);
    setUser(newUser);

    localStorage.setItem('authToken', newToken);
    localStorage.setItem('authUser', JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  const value = {
    isAuthenticated: !!token,
    user,
    token,
    login,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * A custom hook for accessing the authentication context.
 *
 * This hook is a convenient wrapper around `useContext(AuthContext)`. It
 * provides easy access to the authentication state (e.g., `isAuthenticated`,
 * `user`) and functions (`login`, `logout`). It also includes a check to ensure
 * it is used within an `AuthProvider`.
 *
 * @returns {AuthContextType} The authentication context value.
 * @throws {Error} If the hook is used outside of an `AuthProvider`.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
