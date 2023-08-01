import axios from 'axios';
import queryString from 'query-string';
import { TripHistoryInterface, TripHistoryGetQueryInterface } from 'interfaces/trip-history';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getTripHistories = async (
  query?: TripHistoryGetQueryInterface,
): Promise<PaginatedInterface<TripHistoryInterface>> => {
  const response = await axios.get('/api/trip-histories', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createTripHistory = async (tripHistory: TripHistoryInterface) => {
  const response = await axios.post('/api/trip-histories', tripHistory);
  return response.data;
};

export const updateTripHistoryById = async (id: string, tripHistory: TripHistoryInterface) => {
  const response = await axios.put(`/api/trip-histories/${id}`, tripHistory);
  return response.data;
};

export const getTripHistoryById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/trip-histories/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTripHistoryById = async (id: string) => {
  const response = await axios.delete(`/api/trip-histories/${id}`);
  return response.data;
};
