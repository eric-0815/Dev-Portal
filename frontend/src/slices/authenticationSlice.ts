import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import agent from "../api/agent";
import setAuthToken from "../utils/setAuthToken";
import { removeAlert, setAlert } from "./alertSlice";

export interface AuthenticationState {
  token: string | null,
  isAuthenticated: boolean,
  loading: boolean,
  user: any
}

const initialState: AuthenticationState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null
}

export const loadUserAsync = createAsyncThunk(
  'authentication/loadUserAsync',
  async (_, thunkAPI) => {
    if (localStorage.token) setAuthToken(localStorage.token)
    try{
      const result = await agent.Authentication.getUser();
       if (result) thunkAPI.dispatch(userLoaded(result))
       return result
    } catch (err: any) {
      thunkAPI.dispatch(authFail())
      return thunkAPI.rejectWithValue({ error: err });
    }
  }
)


export const loginAsync = createAsyncThunk<any, any>(
  'authentication/loginAsync',
  async (data, thunkAPI) => {
    try {
      const result = await agent.Authentication.login(data);
      if (result) thunkAPI.dispatch(authSuccess(result))
      return result
    } catch (err: any) {
      const errors = err.response.data.errors;
      if (errors) errors.forEach((error: any) => {
        thunkAPI.dispatch(authFail())
        thunkAPI.dispatch(setAlert({ msg: error.msg, alertType: "danger" }))
        setTimeout(() => thunkAPI.dispatch(removeAlert()), 5000);
      });
      return thunkAPI.rejectWithValue({ error: errors });
    }
  }
)

export const registerAsync = createAsyncThunk<any, any>(
  'authentication/registerAsync',
  async (data, thunkAPI) => {
    try {
      const result = await agent.Authentication.register(data);
      if (result) thunkAPI.dispatch(authSuccess(result))
      return result
    } catch (err: any) {
      const errors = err.response.data.errors;
      if (errors) errors.forEach((error: any) => {
        thunkAPI.dispatch(authFail())
        thunkAPI.dispatch(setAlert({ msg: error.msg, alertType: "danger" }))
        setTimeout(() => thunkAPI.dispatch(removeAlert()), 5000);
      });
      return thunkAPI.rejectWithValue({ error: errors });
    }
  }
)


export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    userLoaded: (state, action) => {
      // state = {
      //   ...state,
      //   isAuthenticated: true,
      //   loading: false,
      //   user: action.payload
      // };
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false; 
    },
    authSuccess: (state, action) => {
      localStorage.setItem('token', action.payload.token);

      state.token = action.payload.token;
      state.user = action.payload.name;
      state.isAuthenticated = true;
      state.loading = false; 
      // state = {
      //   ...state,
      //   //...action.payload,
      //   isAuthenticated: true,
      //   loading: false,
      //   token: action.payload.token,
      // };
    },
    authFail: (state) => {
      localStorage.removeItem('token');

      state = {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    },
  }
})

export const { authSuccess, userLoaded, authFail } = authenticationSlice.actions;
