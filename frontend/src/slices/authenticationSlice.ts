import { createSlice } from "@reduxjs/toolkit"

export interface AuthenticationState {
  token: string | null,
  isAuthenticated: boolean,
  loading: boolean,
  user: any
}

const initialState: AuthenticationState =  {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null
}

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      // state.token = action.payload.token;
      // state.user = action.payload.user;
      // state.isAuthenticated = true;
      // state.loading = false; 
      state = {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      }
    },
    registerFail: (state) => {
      localStorage.removeItem('token');
  
      state = {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      }
    }
  }
})

export const {registerSuccess} = authenticationSlice.actions;
