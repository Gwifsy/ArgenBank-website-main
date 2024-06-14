import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from "./slices/authSlice.jsx";
import userSlice from "./slices/userSlice.jsx";

const rootReducer = combineReducers({
    auth: authSlice,
    user: userSlice
});

const store = configureStore({
    reducer: rootReducer,
    devTools: true,
});

export default store;
