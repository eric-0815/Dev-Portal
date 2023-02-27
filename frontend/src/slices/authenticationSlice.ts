import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import agent from "../api/agent";
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

export const loginAsync = createAsyncThunk(
  'authentication/login',
  async (data, thunkAPI) => {
    try {
      return await agent.Authentication.login(data);
    } catch (err: any) {
      const errors = err.response.data.errors;

      if (errors) errors.forEach((error: any) => {
        thunkAPI.dispatch(setAlert({ msg: error.msg, alertType: "danger" }))
        thunkAPI.dispatch(removeAlert());
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
      if (result) thunkAPI.dispatch(registerSuccess(result))
      return result
    } catch (err: any) {
      const errors = err.response.data.errors;
      if (errors) errors.forEach((error: any) => {
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

export const { registerSuccess } = authenticationSlice.actions;
