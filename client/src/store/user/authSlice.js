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
    async ({ name, email, role, avatar }) => {
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

export const signOutUser = createAsyncThunk(
    'auth/signOutUser',
    async () => {
        try {
            const response = await fetch('/api/auth/signout', {
                method: "POST"
            });
            console.log('response from asyncThunk', response);

            const data = await response.json();

            if (data.success === false) {
                dispatch(signOutFailure(data.message));
                return;
            }
            if (!data) {
                throw new Error('No data returned from server');
            }

            return data;
        } catch (error) {
            console.log(error)
        }
    }
);



export const updateUser = createAsyncThunk(
    'auth/updateUser',
    async ({ id, name, email, password, avatar, role }) => {
        try {
            const response = await fetch(`/api/user/edit/${id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, avatar, role })
            });
            const data = await response.json();

            if (data.success === false) {
                console.log(data.message);
                return;
            }
            if (!data) {
                throw new Error('No data returned from server');
            }

            return data;
        } catch (error) {
            console.log(error)
        }
    }
);

export const deleteUser = createAsyncThunk(
    'auth/deleteUser',
    async ({ id }) => {
        try {
            const response = await fetch(`/api/user/delete/${id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (data.success === false) {
                console.log(data.message);
                return;
            }
            if (!data) {
                throw new Error('No data returned from server');
            }

            return data;
        } catch (error) {
            console.log(error)
        }
    }
)

export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // signInStart: (state) => {
        //     state.loading = true;
        //     state.error = false;
        // },
        // signInSuccess: (state, action) => {
        //     state.currentUser = action.payload;
        //     state.loading = false;
        //     state.error = false;
        // },
        // signInFailure: (state, action) => {
        //     state.error = action.payload;
        //     state.loading = false;
        // },

        // signOutStart: (state) => {
        //     state.loading = true;
        // },
        // signOutSuccess: (state, action) => {
        //     state.currentUser = null;
        //     state.loading = false;
        //     state.error = false;
        // },
        // signOutFailure: (state, action) => {
        //     state.error = action.payload;
        //     state.loading = false;
        // },
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
            }),


            builder.addCase(signOutUser.pending, (state) => {
                state.loading = true;
            }),
            builder.addCase(signOutUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = null;
                state.error = null;
            }),
            builder.addCase(signOutUser.rejected, (state, action) => {
                state.error = action.payload;
            })


        builder.addCase(updateUser.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(updateUser.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.loading = false;
                state.error = null;
            }),
            builder.addCase(updateUser.rejected, (state, action) => {
                state.error = action.payload;
            }),


            builder.addCase(deleteUser.pending, (state) => {
                state.loading = true;
            }),
            builder.addCase(deleteUser.fulfilled, (state, action) => {
                state.currentUser = null;
                state.loading = false;
                state.error = null;
            }),
            builder.addCase(deleteUser.rejected, (state, action) => {
                state.error = action.payload;
            })
    }
});

// export const { signInStart, signInSuccess, signInFailure, signOutFailure, signOutStart, signOutSuccess } = userSlice.actions;
export const { } = authSlice.actions;

export default authSlice.reducer;