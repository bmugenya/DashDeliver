import { createSlice } from '@reduxjs/toolkit'
import { getReservationAsync } from './reservationActions';

const initialState = {
    isLoading: false,
    error: null,
    reservations:[]
  
};

const reservationSlice = createSlice({
    name: 'reservations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getReservationAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(getReservationAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
                state.reservations = payload
            })
            .addCase(getReservationAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            });
    },
});

export default reservationSlice.reducer;
