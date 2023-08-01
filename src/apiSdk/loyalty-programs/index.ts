import axios from 'axios';
import queryString from 'query-string';
import { LoyaltyProgramInterface, LoyaltyProgramGetQueryInterface } from 'interfaces/loyalty-program';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getLoyaltyPrograms = async (
  query?: LoyaltyProgramGetQueryInterface,
): Promise<PaginatedInterface<LoyaltyProgramInterface>> => {
  const response = await axios.get('/api/loyalty-programs', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createLoyaltyProgram = async (loyaltyProgram: LoyaltyProgramInterface) => {
  const response = await axios.post('/api/loyalty-programs', loyaltyProgram);
  return response.data;
};

export const updateLoyaltyProgramById = async (id: string, loyaltyProgram: LoyaltyProgramInterface) => {
  const response = await axios.put(`/api/loyalty-programs/${id}`, loyaltyProgram);
  return response.data;
};

export const getLoyaltyProgramById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/loyalty-programs/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteLoyaltyProgramById = async (id: string) => {
  const response = await axios.delete(`/api/loyalty-programs/${id}`);
  return response.data;
};
