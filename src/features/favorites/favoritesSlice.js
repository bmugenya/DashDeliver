import { createSlice } from '@reduxjs/toolkit'
import { getFavoritesAsync } from './favoritesActions';

const initialState = {
    isLoading: false,
    error: null,
    favorites:[]
  
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFavoritesAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(getFavoritesAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
                state.favorites = payload
            })
            .addCase(getFavoritesAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            });
    },
});

export default favoritesSlice.reducer;
