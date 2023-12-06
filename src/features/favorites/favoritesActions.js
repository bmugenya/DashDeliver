import { createAsyncThunk } from '@reduxjs/toolkit'
import { getDrivers } from './favoritesApi'


export const getDriversAsync = createAsyncThunk(
    '/drivers',
    async () => {
        try {
            const response = await getDrivers();
          
            return response;
        } catch(error) {
            console.log(error)
     
        }
    }
);

