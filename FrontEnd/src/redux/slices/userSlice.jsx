// userSlice.jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserProfile = createAsyncThunk(
    'user/fetchUserProfile',
    async (token) => {
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }

            const data = await response.json();
            const userProfile = {
                id: data.body.id,
                email: data.body.email,
                firstname: data.body.firstName,
                lastname: data.body.lastName,
                username: data.body.userName
            };

            return userProfile;
        } catch (error) {
            throw new Error(error.message || 'Failed to fetch user profile');
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    'user/updateUserProfile',
    async ({ userName, token }) => {
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ userName }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to update username');
            }

            const data = await response.json();
            const updatedUsername = data.body.userName;

            return updatedUsername;
        } catch (error) {
            throw new Error(error.message || 'Failed to update username');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        status: 'VOID',
        userData: {}
    },
    extraReducers: (builder) => {
        const handleAsyncAction = (builder, action, successHandler) => {
            builder.addCase(action.pending, (state) => {
                state.status = 'LOADING';
            });
            builder.addCase(action.fulfilled, (state, action) => {
                state.status = 'SUCCEEDED';
                successHandler(state, action.payload);
            });
            builder.addCase(action.rejected, (state, action) => {
                state.status = 'FAILED';
            });
        };

        handleAsyncAction(builder, fetchUserProfile, (state, payload) => {
            state.userData = payload;
        });

        handleAsyncAction(builder, updateUserProfile, (state, payload) => {
            state.userData.username = payload;
        });
    },
});

export default userSlice.reducer;
