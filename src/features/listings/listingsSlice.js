import { createSlice } from '@reduxjs/toolkit'
import { getShipmentsAsync } from './listingsActions';

const initialState = {
    isLoading: false,
    error: null,
    shipments:[]
  
};

const listingsSlice = createSlice({
    name: 'shipments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getShipmentsAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(getShipmentsAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
                state.shipments = payload
            })
            .addCase(getShipmentsAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            });
    },
});

export default listingsSlice.reducer;
