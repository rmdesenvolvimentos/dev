// This file centralizes all API calls related to user authentication.

const API_BASE_URL = '/api';

interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
  };
}

interface ApiError {
  error: string;
}

/**
 * A generic function to perform POST requests to authentication-related endpoints.
 *
 * This function centralizes the logic for sending data to auth endpoints like
 * login and registration. It handles the JSON serialization, headers, and
 * error response parsing.
 *
 * @template T The type of the data object being sent.
 * @param {string} endpoint The specific API endpoint to hit (e.g., '/login/').
 * @param {T} data The data payload to be sent in the request body.
 * @returns {Promise<AuthResponse>} A promise that resolves to the authentication
 *   response from the backend, containing the token and user info.
 * @throws {Error} Throws an error with a message from the backend if the
 *   HTTP response is not ok (e.g., 4xx or 5xx status).
 */
const postAuth = async <T>(endpoint: string, data: T): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    const errorMessage = (responseData as ApiError).error || 'An unknown authentication error occurred.';
    throw new Error(errorMessage);
  }

  return responseData as AuthResponse;
};

/**
 * Sends a login request to the backend API.
 *
 * @param {object} credentials The user's credentials.
 * @param {string} credentials.username The user's email/username.
 * @param {string} credentials.password The user's password.
 * @returns {Promise<AuthResponse>} A promise that resolves with the auth token
 *   and user data upon successful login.
 */
export const loginUser = (credentials: any) => {
  return postAuth('/login/', credentials);
};

/**
 * Sends a registration request to the backend API.
 *
 * @param {object} userData The new user's data.
 * @param {string} userData.email The desired email for the new account.
 * @param {string} userData.password The desired password for the new account.
 * @returns {Promise<AuthResponse>} A promise that resolves with the auth token
 *   and user data upon successful registration.
 */
export const registerUser = (userData: any) => {
  return postAuth('/register/', userData);
};
