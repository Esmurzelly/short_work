import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    jobs: [],
    job: null,
    error: null,
    loading: false,
};

export const jobCreate = createAsyncThunk(
    'job/jobCreate',
    async ({ title, description, address, salary, neededSkils, imageUrls, loc, userRef }) => {
        try {
            const response = await fetch('/api/job/create', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description, address, salary, neededSkils, imageUrls, loc, userRef })
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

export const getAllJobs = createAsyncThunk(
    'job/getAllJobs',
    async () => {
        try {
            const response = await fetch('/api/job/getAllJobs', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
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

export const getJobById = createAsyncThunk(
    'job/getJobById',
    async ({ id }) => {
        try {
            const response = await fetch(`/api/job/get/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
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

export const updatejob = createAsyncThunk(
    'job/updatejob',
    async ({ id, title, description, address, salary }) => {
        try {
            const response = await fetch(`/api/job/update/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, title, description, address, salary })
            });

            console.log('response from update Redux', response);

            const data = await response.json();

            console.log('data from update Redux', data);

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

export const deletejob = createAsyncThunk(
    'job/deletejob',
    async ({ id }) => {
        try {
            const response = await fetch(`/api/job/delete/${id}`, {
                method: "POST"
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
)

export const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(jobCreate.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(jobCreate.fulfilled, (state, action) => {
                state.loading = false;
                // state.jobs = action.payload;
                state.jobs.push(action.payload.data); // data ?
                state.error = null;
            }),
            builder.addCase(jobCreate.rejected, (state, action) => {
                state.error = action.payload;
            }),

            builder.addCase(getAllJobs.pending, (state) => {
                state.loading = true;
            }),
            builder.addCase(getAllJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload.data;
                state.error = null;
            }),
            builder.addCase(getAllJobs.rejected, (state, action) => {
                state.error = action.payload;
            })

        builder.addCase(getJobById.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(getJobById.fulfilled, (state, action) => {
                state.loading = false;
                state.job = action.payload.data;
                state.error = null;
            }),
            builder.addCase(getJobById.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            }),

            builder.addCase(updatejob.pending, (state) => {
                state.loading = true;
            }),
            builder.addCase(updatejob.fulfilled, (state, action) => {
                state.loading = false;
                state.job = action.payload.data;
                state.error = null;
            }),
            builder.addCase(updatejob.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            }),

            builder.addCase(deletejob.pending, (state) => {
                state.loading = true;
            }),
            builder.addCase(deletejob.fulfilled, (state, action) => {
                state.loading = false;
                state.job = null;
                state.jobs = state.jobs.filter(job => job._id !== action.meta.arg.id); // action.meta.arg.id -> get id from deletejob({ id: job._id })
                state.error = null;
            }),
            builder.addCase(deletejob.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
});

export const { } = jobSlice.actions;

export default jobSlice.reducer;