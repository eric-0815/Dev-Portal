import axios, { AxiosResponse } from "axios";
import { URLSearchParams } from "url";

const responseBody = (response: AxiosResponse) => response.data;

// axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

const requests = {
  get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body,
    { headers: { 'Content-Type': 'application/json' } })
    .then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string, params?: URLSearchParams) => axios.delete(url, { params }).then(responseBody),
}

const Authentication = {
  login: (data: any) => requests.post('/api/users/login', data),
  register: (body: any) => requests.post('/api/users/register', body),
  getUser: () => requests.get('/api/auth'),
}

const Profile = {
  getCurrentProfile: (userId: string) => requests.get(`/api/profiles/user/${userId}`),
  createProfile: (data: any) => requests.post('/api/profiles', data),

  putExperience: (data: any) => requests.put('/api/profiles/experience', data),
  putEducation: (data: any) => requests.put('/api/profiles/education', data),

  deleteExperience: (experienceId: any) => requests.delete(`api/profiles/experience/${experienceId}`),
  deleteEducation: (educationId: any) => requests.delete(`api/profiles/education/${educationId}`),
  deleteAccount: () => requests.delete('api/profile'),
}

const agent = {
  Authentication,
  Profile
}

export default agent;