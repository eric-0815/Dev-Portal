import axios, { AxiosResponse } from "axios";
import { URLSearchParams } from "url";

const responseBody = (response: AxiosResponse) => response.data;

axios.defaults.baseURL = 'http://localhost:5000'  //'https://dev-center-backend.onrender.com';
axios.defaults.withCredentials = true;

const requests = {
  get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body,
    { headers: { 'Content-Type': 'application/json' } })
    .then(responseBody),
  put: (url: string, body?: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string, params?: URLSearchParams) => axios.delete(url, { params }).then(responseBody),
}

const Authentication = {
  login: (data: any) => requests.post('/api/users/login', data),
  register: (body: any) => requests.post('/api/users/register', body),
  getUser: () => requests.get('/api/auth'),
}

const Profile = {
  getProfiles: () => requests.get(`/api/profiles`),
  getProfile: (userId: string) => requests.get(`/api/profiles/user/${userId}`),
  getGithubRepos: (userName: string) => requests.get(`/api/profiles/github/${userName}`),

  createProfile: (data: any) => requests.post('/api/profiles', data),

  putExperience: (data: any) => requests.put('/api/profiles/experience', data),
  putEducation: (data: any) => requests.put('/api/profiles/education', data),

  deleteExperience: (experienceId: any) => requests.delete(`api/profiles/experience/${experienceId}`),
  deleteEducation: (educationId: any) => requests.delete(`api/profiles/education/${educationId}`),
  deleteAccount: () => requests.delete('api/profiles'),
}

const Post = {
  getPosts: () => requests.get(`/api/posts`),
  getPost: (postId: string) => requests.get(`/api/posts/${postId}`),

  putLike: (postId: string) => requests.put(`/api/posts/like/${postId}`),
  removeLike: (postId: string) => requests.put(`/api/posts/unlike/${postId}`),

  addPost: (formData: any) => requests.post('/api/posts', formData),
  deletePost: (postId: string) => requests.delete(`/api/posts/${postId}`),

  addComment: (postId: string, formData: any) => requests.post(`/api/posts/comment/${postId}`, formData),
  deleteComment: (postId: string, commentId: string) => requests.delete(`/api/posts/comment/${postId}/${commentId}`)
}


const agent = {
  Authentication,
  Profile,
  Post
}

export default agent;