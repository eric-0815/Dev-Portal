import axios, { AxiosError, AxiosResponse } from "axios";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
}

const Authentication = {
  login: () => requests.post('/login', {}),
  register: () => requests.post('/register', {}),
}

const agent = {
  Authentication
}

export default agent;