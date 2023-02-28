import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import agent from "../api/agent";
import { removeAlert, setAlert } from "./alertSlice";

interface ProfileState {
  profile: any;
  profiles: any;
  repos: any;
  loading: boolean;
  error: any
}

const initialState: ProfileState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
}

export const getCurrentProfileAsync = createAsyncThunk<any, any>(
  'profile/getCurrentProfileAsync',
  async (userId, thunkAPI) => {
    try {
      const result = await agent.Profile.getCurrentProfile(userId);
      if (result) thunkAPI.dispatch(getProfileSuccess(result))
      return result
    } catch (err: any) {
      const errors = err.response.data.errors;
      if (errors) errors.forEach((error: any) => {
        thunkAPI.dispatch(profileError(error))
        thunkAPI.dispatch(setAlert({ msg: error.msg, alertType: "danger" }))
        setTimeout(() => thunkAPI.dispatch(removeAlert()), 5000);
      });
      return thunkAPI.rejectWithValue({ error: errors });
    }
  }
)

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfileSuccess: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    profileError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.repos = [];
      state.loading = false;
    }
  }
})

export const { getProfileSuccess, profileError } = profileSlice.actions;

