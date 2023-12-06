import { createSlice } from '@reduxjs/toolkit'
import { getDriversAsync } from './favoritesActions';

const initialState = {
    isLoading: false,
    error: null,
    drivers:[]
  
};

const favoritesSlice = createSlice({
    name: 'drivers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDriversAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(getDriversAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
                state.drivers = payload
            })
            .addCase(getDriversAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            });
    },
});

export default favoritesSlice.reducer;
