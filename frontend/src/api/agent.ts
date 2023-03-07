import axios, { AxiosResponse } from "axios";
import { URLSearchParams } from "url";

const responseBody = (response: AxiosResponse) => response.data;

axios.defaults.baseURL = process.env.baseUrl;
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
  login: (data: any) => requests.post('/users/login', data),
  register: (body: any) => requests.post('/users/register', body),
  getUser: () => requests.get('/auth'),
}

const Profile = {
  getProfiles: () => requests.get(`/profiles`),
  getProfile: (userId: string) => requests.get(`/profiles/user/${userId}`),
  getGithubRepos: (userName: string) => requests.get(`/profiles/github/${userName}`),

  createProfile: (data: any) => requests.post('/profiles', data),

  putExperience: (data: any) => requests.put('/profiles/experience', data),
  putEducation: (data: any) => requests.put('/profiles/education', data),

  deleteExperience: (experienceId: any) => requests.delete(`/profiles/experience/${experienceId}`),
  deleteEducation: (educationId: any) => requests.delete(`/profiles/education/${educationId}`),
  deleteAccount: () => requests.delete('/profiles'),
}

const Post = {
  getPosts: () => requests.get(`/posts`),
  getPost: (postId: string) => requests.get(`/posts/${postId}`),

  putLike: (postId: string) => requests.put(`/posts/like/${postId}`),
  removeLike: (postId: string) => requests.put(`/posts/unlike/${postId}`),

  addPost: (formData: any) => requests.post('/posts', formData),
  deletePost: (postId: string) => requests.delete(`/posts/${postId}`),

  addComment: (postId: string, formData: any) => requests.post(`/posts/comment/${postId}`, formData),
  deleteComment: (postId: string, commentId: string) => requests.delete(`/posts/comment/${postId}/${commentId}`)
}


const agent = {
  Authentication,
  Profile,
  Post
}

export default agent;