import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
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
)

export const jobSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(jobCreate.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(jobCreate.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        }),
        builder.addCase(jobCreate.rejected, (state, action) => {
            state.error = action.payload;
        })
    }
});

export const { } = jobSlice.actions;

export default jobSlice.reducer;