import { removeAlert, setAlert } from "../slices/alertSlice";

const handleError = async(err: any, action: any, thunkAPI: any, ) => {
  const errors = err.response.data.errors;
  if (errors) errors.forEach((error: any) => {
    thunkAPI.dispatch(action(error))
    thunkAPI.dispatch(setAlert({ msg: error.msg, alertType: "danger" }))
    setTimeout(() => thunkAPI.dispatch(removeAlert()), 5000);
  });
  return thunkAPI.rejectWithValue({ error: errors });
}

export default handleError
