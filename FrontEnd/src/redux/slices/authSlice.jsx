import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: "VOID",
    isConnected: false,
    token: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.status = "SUCCEEDED";
            state.isConnected = true;
            state.token = action.payload;
            state.error = null;
        },
        loginFail(state, action) {
            state.status = "SUCCEEDED";
            state.isConnected = false;
            state.error = action.payload;
        },
        logout(state) {
            return initialState;
        }
    }
});

export const { loginSuccess, loginFail, logout } = authSlice.actions;

export default authSlice.reducer;
