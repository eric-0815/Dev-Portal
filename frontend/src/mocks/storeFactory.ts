import { createStore } from 'redux';
import { rootReducer } from "../store/configureStore";

export const storeFactory = (initialState = {}) => {
  return createStore(rootReducer, initialState)
}