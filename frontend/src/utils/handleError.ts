import { removeAlert, setAlert } from "../slices/alertSlice";

const handleError = async (err: any, action: any, thunkAPI: any,) => {
  const errors = err.response.data.errors;
  if (errors) errors.forEach((error: any) => {
    thunkAPI.dispatch(action())
    if (error.msg === 'There is not profile for this user') {
      thunkAPI.dispatch(setAlert({ msg: error.msg, alertType: "primary" }))
    } else {
      thunkAPI.dispatch(setAlert({ msg: error.msg, alertType: "danger" }))
    }
    setTimeout(() => thunkAPI.dispatch(removeAlert()), 5000);
  });
  return thunkAPI.rejectWithValue({ error: errors });
}

export default handleError
