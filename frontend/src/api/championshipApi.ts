// This file will centralize all API calls related to the championship.

const API_BASE_URL = '/api'; // Using a relative URL to work with the Django dev server proxy

/**
 * A generic function to perform GET requests to the championship API.
 *
 * This helper centralizes the logic for fetching data from the backend,
 * including error handling and JSON parsing.
 *
 * @param {string} endpoint The specific API endpoint to fetch from (e.g., '/ranking/').
 * @returns {Promise<any>} A promise that resolves to the JSON response from the backend.
 * @throws {Error} Throws a formatted error if the HTTP response is not ok.
 */
const fetchApi = async (endpoint: string) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    const errorInfo = await response.json().catch(() => ({ message: 'An unknown error occurred.' }));
    throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorInfo.message}`);
  }
  return response.json();
};

/**
 * Represents a single entry in the trader ranking list.
 * @interface
 */
export interface RankingEntry {
  nickname: string;
  user__username: string;
  total_profit: number;
  operation_count: number;
}

/**
 * Represents a single, closed trading operation.
 * Note: Decimal and DateTime fields from Django are represented as strings.
 * @interface
 */
export interface Operation {
  id: number;
  position_id: number;
  symbol: string;
  type: 'BUY' | 'SELL';
  volume: string;
  open_time: string;
  open_price: string;
  close_time: string;
  close_price: string;
  profit: string;
  comment: string;
}

/**
 * Fetches the public championship ranking from the API.
 *
 * @returns {Promise<RankingEntry[]>} A promise that resolves to an array of ranking entries.
 */
export const fetchRanking = (): Promise<RankingEntry[]> => {
  return fetchApi('/ranking/');
};

/**
 * Fetches a list of trading operations from the API.
 *
 * This function retrieves operations for the currently authenticated user.
 *
 * @returns {Promise<Operation[]>} A promise that resolves to an array of operation objects.
 */
export const fetchOperations = (): Promise<Operation[]> => {
  return fetchApi('/operations/');
};
