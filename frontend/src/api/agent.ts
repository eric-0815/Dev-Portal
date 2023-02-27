import axios, { AxiosError, AxiosResponse } from "axios";

const responseBody = (response: AxiosResponse) => response.data;

// axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

const requests = {
  get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body,
    { headers: { 'Content-Type': 'application/json' } })
    .then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
}

const Authentication = {
  login: (data: any) => requests.post('/users/login', data),
  register: (body: any) => requests.post('/api/users/register', body),
}

const agent = {
  Authentication
}

export default agent;