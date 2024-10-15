import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

const initialState = {
    allUsers: null,
    clickedJobs: null,
    totalUsers: null,
    currentUser: null,
    neededUser: null,
    jobOwner: null,
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

export const getAllUsers = createAsyncThunk(
    'auth/getAllUsers',
    async ({ page = 0, limit = 99, searchTerm = "" }) => {
        const startIndex = page * limit;
        try {
            const response = await fetch(`/api/user/getAllUsers?limit=${limit}&searchTerm=${searchTerm}&startIndex=${startIndex}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                throw new Error(`Server error: ${data.message || "Unknown error"}`);
            }

            const data = await response.json();

            if (!data || !data.data) {
                throw new Error('No data returned from server');
            }

            return data;
        } catch (error) {
            console.log(error);
        };
    }
);

export const getUserById = createAsyncThunk(
    'auth/getUserById',
    async ({ id }) => {
        try {
            const response = await fetch(`/api/user/currentUser/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

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
)

export const signOutUser = createAsyncThunk(
    'auth/signOutUser',
    async () => {
        try {
            const response = await fetch('/api/auth/signout', {
                method: "POST"
            });

            const data = await response.json();

            if (!data) {
                throw new Error('No data returned from server');
            }

            return data;
        } catch (error) {
            console.log(error)
        }
    }
);

export const uploadAvatar = createAsyncThunk(
    'auth/uploadAvatar',
    async (avatar) => {
        try {
            const formData = new FormData();
            formData.append('file', avatar);

            const response = await fetch('api/user/avatar', {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (!data) {
                throw new Error('No data returned from server');
            }

            return data;
        } catch (error) {
            console.log(error)
        }
    }
);

export const deleteAvatar = createAsyncThunk(
    'auth/deleteAvatar',
    async () => {
        try {
            const response = await fetch('api/user/avatar', {
                method: "DELETE",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const data = await response.json();

            if (!data) {
                throw new Error('No data returned from server');
            }

            return data;
        } catch (error) {
            console.log(error)
        }
    }
)

export const findUserByUserRefJob = createAsyncThunk(
    'auth/findUserByUserRefJob',
    async (id) => {
        try {
            const response = await fetch(`/api/user/getOwner/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await response.json();

            if (!data || data.success === false) {
                throw new Error(data.message || 'Data not found');
            }

            return data.data;
        } catch (error) {
            console.log(error)
        }
    }
)

export const updateUser = createAsyncThunk(
    'auth/updateUser',
    async ({ id, name, email, password, avatar, role, about, tel }) => {
        try {
            const response = await fetch(`/api/user/edit/${id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, avatar, role, about, tel })
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

export const clickedJobsByUser = createAsyncThunk(
    'auth/clickedJobsByUser',
    async({id}) => {
        try {
            const response = await fetch(`/api/user/clickedJob/${id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id })
            });

            console.log('id from authSlice/clickedJobsByUser', id);

            const data = await response.json();

            if (data.success === false) {
                console.log(data.message);
                return;
            }
            if (!data) {
                throw new Error('No data returned from server');
            }

            console.log('data from authSlice/clickedJobsByUser', data);

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
    reducers: {},
    extraReducers: builder => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
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
                state.loading = false;
            }),


            builder.addCase(findUserByUserRefJob.pending, (state) => {
                state.loading = true;
            }),
            builder.addCase(findUserByUserRefJob.fulfilled, (state, action) => {
                state.jobOwner = action.payload;
                state.loading = false;
                state.error = null;
            }),
            builder.addCase(findUserByUserRefJob.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            }),


            builder.addCase(uploadAvatar.pending, (state) => {
                state.loading = true;
            }),
            builder.addCase(uploadAvatar.fulfilled, (state, action) => {
                state.currentUser = {
                    ...state.currentUser,
                    avatar: action.payload.avatar
                }
                state.loading = false;
                state.error = null;
            }),
            builder.addCase(uploadAvatar.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            }),


            builder.addCase(deleteAvatar.pending, (state) => {
                state.loading = true;
            }),
            builder.addCase(deleteAvatar.fulfilled, (state, action) => {
                state.currentUser = {
                    ...state.currentUser,
                    avatar: null
                }
                state.loading = false;
                state.error = null;
            }),
            builder.addCase(deleteAvatar.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            }),


            builder.addCase(getAllUsers.pending, (state) => {
                state.loading = true;
            }),
            builder.addCase(getAllUsers.fulfilled, (state, action) => {
                state.allUsers = action.payload.data;
                state.totalUsers = action.payload.total;
                state.loading = false;
                state.error = null;
            }),
            builder.addCase(getAllUsers.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            }),


            builder.addCase(getUserById.pending, (state) => {
                state.loading = true;
            }),
            builder.addCase(getUserById.fulfilled, (state, action) => {
                state.neededUser = action.payload.data;
                state.loading = false;
                state.error = null;
            }),
            builder.addCase(getUserById.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            }),


            builder.addCase(clickedJobsByUser.pending, (state) => {
                state.loading = true;
            }),
            builder.addCase(clickedJobsByUser.fulfilled, (state, action) => {
                state.currentUser = action.payload.data;
                state.loading = false;
                state.error = null;
            }),
            builder.addCase(clickedJobsByUser.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
});

export const { } = authSlice.actions;

export default authSlice.reducer;