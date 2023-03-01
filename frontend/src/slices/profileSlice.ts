import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import agent from "../api/agent";
import handleError from "../utils/handleError";
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
      handleError(err, profileError, thunkAPI)
    }
  }
)

export const createProfileAsync = createAsyncThunk<any, any>(
  'profile/createProfileAsync',
  async(data, thunkAPI) => {
    try {
      const {formData} = data
      const result = await agent.Profile.createProfile(formData)
    }
    catch (err: any) {
      handleError(err, profileError, thunkAPI)
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

