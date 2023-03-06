import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { alertSlice } from "../slices/alertSlice";
import { authenticationSlice } from "../slices/authenticationSlice";
import { counterSlice } from "../slices/counterSlice";
import { profileSlice } from "../slices/profileSlice";

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { postSlice } from "../slices/postSlice";

// export function configureStore() {
//     return createStore(counterReducer)
// }

const persistConfig = {
    key: 'persist-key',
    storage
}

const rootReducer = combineReducers({
    counterState: counterSlice.reducer,
    alertState: alertSlice.reducer,
    authenticationState: authenticationSlice.reducer,
    profileState: profileSlice.reducer,
    postState: postSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer
})

const persistor = persistStore(store)

export { store, persistor }

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

