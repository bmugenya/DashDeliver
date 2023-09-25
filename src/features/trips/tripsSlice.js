import { createSlice } from '@reduxjs/toolkit'
import { getTripsAsync } from './tripsActions';

const initialState = {
    isLoading: false,
    error: null,
    trips:[]
  
};

const tripsSlice = createSlice({
    name: 'reservations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTripsAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(getTripsAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
                state.trips = payload
            })
            .addCase(getTripsAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            });
    },
});

export default tripsSlice.reducer;
