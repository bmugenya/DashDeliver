import { createSlice } from '@reduxjs/toolkit'
import { getListingAsync } from './listingActions';

const initialState = {
    isLoading: false,
    error: null,
    listing:[]
  
};

const listingSlice = createSlice({
    name: 'listing',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getListingAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(getListingAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
                state.listing = payload
            })
            .addCase(getListingAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            });
    },
});

export default listingSlice.reducer;
