import { createAsyncThunk } from '@reduxjs/toolkit'
import { getFavorites } from './favoritesApi'


export const getFavoritesAsync = createAsyncThunk(
    '/favorite',
    async (user_id) => {
        try {
            const response = await getFavorites(user_id);
          
            return response;
        } catch(error) {
            console.log(error)
     
        }
    }
);

