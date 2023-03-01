import axios, { AxiosResponse } from "axios";

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
  login: (data: any) => requests.post('/api/users/login', data),
  register: (body: any) => requests.post('/api/users/register', body),
  getUser: () => requests.get('/api/auth'),
}

const Profile = {
  getCurrentProfile: (userId: string) => requests.get(`/api/profiles/user/${userId}`),
  createProfile: (data: any) => requests.post('/api/profile', data),
}

const agent = {
  Authentication,
  Profile
}

export default agent;