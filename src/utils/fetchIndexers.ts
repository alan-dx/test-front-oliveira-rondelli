import { api } from './../services/api';

export interface FetchIndexersParams {
  nome?: string;
  simbolo?: string;
  orderByDescending?: boolean;
}

export function fetchIndexers({nome, simbolo, orderByDescending}: FetchIndexersParams) {
  return api.get('/indexadores', {
    params: {
      nome,
      simbolo,
      orderByDescending
    }
  })
}