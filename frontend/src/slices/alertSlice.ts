import { createSlice } from "@reduxjs/toolkit"
import {v4 as uuid} from 'uuid'

interface AlertState {
    id: string;
    msg: string;
    alertType: string;
}

const initialState: AlertState = {
  id: '',
  msg: '',
  alertType: '',
}

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlert: (state, action) => {
          state.id = uuid();
          state.msg = action.payload.msg;
          state.alertType = action.payload.alertType;
        },
    }
})

export const {setAlert} = alertSlice.actions;