import { api } from './../services/api';

export interface FetchIndexersParams {
  nome?: string;
  simbolo?: string;
  orderByDescending?: boolean;
  page?: number;
}

export function fetchIndexers({nome, simbolo, orderByDescending, page}: FetchIndexersParams) {
  return api.get('/indexadores', {
    params: {
      nome,
      simbolo,
      orderByDescending,
      page
    }
  })
}