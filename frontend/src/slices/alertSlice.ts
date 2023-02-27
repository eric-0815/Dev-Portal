import { createSlice } from "@reduxjs/toolkit"
import {v4 as uuid} from 'uuid'

export interface AlertState {
    id: string;
    msg: string;
    alertType: string;
}

export interface Alerts {
  alerts: AlertState[] | [];
}

const initialState: Alerts =  {
  alerts: []
}

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlert: (state, action) => {
          const newAlert = {
            id: uuid(),
            msg: action.payload.msg,
            alertType: action.payload.alertType
          } as AlertState
          state.alerts = [...state.alerts, newAlert]
        },
        removeAlert: (state) => {
          state.alerts.shift()
        },
    }
})

export const {setAlert, removeAlert} = alertSlice.actions;