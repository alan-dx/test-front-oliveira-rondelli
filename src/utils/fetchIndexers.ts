import { api } from './../services/api';

interface Params {
  nome?: string;
  simbolo?: string;
  orderByDescending?: boolean;
}

export function fetchIndexers({nome, simbolo, orderByDescending}: Params) {
  return api.get('/indexadores', {
    params: {
      nome,
      simbolo,
      orderByDescending
    }
  })
}