import axios from 'axios';

export const api = axios.create({
  baseURL: "https://oliveira-rondelli-api.herokuapp.com/api/planogestor"
})