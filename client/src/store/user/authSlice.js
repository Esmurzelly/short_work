import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ name, email, role, jobs, avatar, password }) => {
        try {
            const response = await fetch('/api/auth/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, role, jobs, avatar, password })
            });

            const data = await response.json();

            if (data.success === false) {
                console.log(data.message)
            };
            if (!data) {
                throw new Error('No data returned from server');
            }

            return data;
        } catch (error) {
            console.log(error)
        }

    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }) => {
        try {
            const response = await fetch(`/api/auth/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success === false) {
                console.log(data.message)
            };
            if (!data) {
                throw new Error('No data returned from server');
            }

            return data;
        } catch (error) {
            console.log(error)
        }
    }
);

export const googleLoginUser = createAsyncThunk(
    'auth/googleLoginUser',
    async({ name, email, role, avatar }) => {
        try {
            const response = await fetch('/api/auth/google', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    role,
                    avatar,
                })
            });
            console.log('response from asyncThunk', response);
    
            const data = await response.json();
            console.log('data from asyncThunk', data);
    
            if (data.success === false) {
                console.log(data.message)
            };
            if (!data) {
                throw new Error('No data returned from server');
            }
    
            return data;
        } catch (error) {
            console.log(error)
        }
        
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        signOutStart: (state) => {
            state.loading = true;
        },
        signOutSuccess: (state, action) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        signOutFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
    extraReducers: builder => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload; // change maybe
            state.error = null;
        }),
        builder.addCase(registerUser.rejected, (state, action) => {
            state.error = action.payload;
        }),


        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        }),
        builder.addCase(loginUser.rejected, (state, action) => {
            state.error = action.payload;
        }),

        builder.addCase(googleLoginUser.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(googleLoginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        }),
        builder.addCase(googleLoginUser.rejected, (state, action) => {
            state.error = action.payload;
        })
    }
});

export const { signInStart, signInSuccess, signInFailure, signOutFailure, signOutStart, signOutSuccess } = userSlice.actions;

export default userSlice.reducer;