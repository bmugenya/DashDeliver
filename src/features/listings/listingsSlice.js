import { createSlice } from '@reduxjs/toolkit'
import { getListingsAsync } from './listingsActions';

const initialState = {
    isLoading: false,
    error: null,
    listings:[]
  
};

const listingsSlice = createSlice({
    name: 'listings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getListingsAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(getListingsAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
                state.listings = payload
            })
            .addCase(getListingsAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            });
    },
});

export default listingsSlice.reducer;
