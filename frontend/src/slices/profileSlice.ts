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

export const createOrUpdateProfileAsync = createAsyncThunk<any, any>(
  'profile/createProfileAsync',
  async (data, thunkAPI) => {
    try {
      const { formData, isEdit } = data
      const result = await agent.Profile.createProfile(formData);
      thunkAPI.dispatch(setAlert({ msg: isEdit ? 'Profile Updated' : 'Profile Created', alertType: 'success' }))
      setTimeout(() => thunkAPI.dispatch(removeAlert()), 5000);
      return result
    }
    catch (err: any) {
      handleError(err, profileError, thunkAPI)
    }
  }
)

export const addExperienceAsync = createAsyncThunk<any, any>(
  'profile/addExperienceAsync',
  async (data, thunkAPI) => {
    try {
      const result = await agent.Profile.putExperience(data);
      if (result) thunkAPI.dispatch(getProfileSuccess(result))
      thunkAPI.dispatch(setAlert({ msg: 'Experience Added', alertType: 'success' }))
      setTimeout(() => thunkAPI.dispatch(removeAlert()), 5000);
      return result
    } 
    catch (err: any) {
      handleError(err, profileError, thunkAPI)
    }
  }
)

export const addEducationAsync = createAsyncThunk<any, any>(
  'profile/addEducationAsync',
  async (data, thunkAPI) => {
    try {
      const result = await agent.Profile.putEducation(data);
      if (result) thunkAPI.dispatch(getProfileSuccess(result))
      thunkAPI.dispatch(setAlert({ msg: 'Education Added', alertType: 'success' }))
      setTimeout(() => thunkAPI.dispatch(removeAlert()), 5000);
      return result
    } 
    catch (err: any) {
      handleError(err, profileError, thunkAPI)
    }
  }
)

export const deleteExperienceAsync = createAsyncThunk<any, any>(
  'profile/deleteExperienceAsync',
  async (experienceId, thunkAPI) => {
    try {
      const result = await agent.Profile.deleteExperience(experienceId);
      if (result) thunkAPI.dispatch(getProfileSuccess(result))
      thunkAPI.dispatch(setAlert({ msg: 'Experience Removed', alertType: 'success' }))
      setTimeout(() => thunkAPI.dispatch(removeAlert()), 5000);
      return result
    } 
    catch (err: any) {
      handleError(err, profileError, thunkAPI)
    }
  }
)

export const deleteEducationAsync = createAsyncThunk<any, any>(
  'profile/deleteEducationAsync',
  async (educationId, thunkAPI) => {
    try {
      const result = await agent.Profile.deleteEducation(educationId);
      if (result) thunkAPI.dispatch(getProfileSuccess(result))
      thunkAPI.dispatch(setAlert({ msg: 'Education Removed', alertType: 'success' }))
      setTimeout(() => thunkAPI.dispatch(removeAlert()), 5000);
      return result
    } 
    catch (err: any) {
      handleError(err, profileError, thunkAPI)
    }
  }
)

export const deleteAccountAsync = createAsyncThunk<any, any>(
  'profile/deleteAccountAsync',
  async (_, thunkAPI) => {
    try {
      const result = await agent.Profile.deleteAccount();
      if (result) thunkAPI.dispatch(clearProfile())
      thunkAPI.dispatch(setAlert({ msg: 'Your account has been permanantly deleted', alertType: 'success' }))
      setTimeout(() => thunkAPI.dispatch(removeAlert()), 5000);
      return result
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
    },
  }
})

export const { getProfileSuccess, profileError, clearProfile } = profileSlice.actions;

