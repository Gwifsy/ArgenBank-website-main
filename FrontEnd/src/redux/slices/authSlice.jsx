import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password, rememberMe }) => {
        try {
            const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to login');
            }

            const data = await response.json();
            const token = data.body.token;

            if (rememberMe) {
                localStorage.setItem("token", token);
            }

            return token;
        } catch (error) {
            throw new Error(error.message || 'Failed to login');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: "VOID",
        isConnected: false,
        token: null,
        error: null,
    },
    reducers: {
        logout(state) {
            state.status = "VOID";
            state.isConnected = false;
            state.token = null;
            state.error = null;
        },
        loginFail(state, action) {
            state.status = "FAILED";
            state.isConnected = false;
            state.error = action.payload;
        },
        initializeAuthState(state) {
            const token = localStorage.getItem("token");
            if (token) {
                state.isConnected = true;
                state.token = token;
                state.status = "SUCCEEDED";
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.status = "LOADING";
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.status = "SUCCEEDED";
            state.isConnected = true;
            state.token = action.payload;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.status = "FAILED";
            state.isConnected = false;
            state.error = action.error.message || 'Failed to login';
        });
    },
});

export const { loginFail, logout, initializeAuthState } = authSlice.actions;
export default authSlice.reducer;