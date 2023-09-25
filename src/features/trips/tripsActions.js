import { createAsyncThunk } from '@reduxjs/toolkit'
import { getTrips } from './tripsApi'


export const getTripsAsync = createAsyncThunk(
    '/trips',
    async (user_id) => {
        try {
            const response = await getTrips(user_id);
          
            return response;
        } catch(error) {
            console.log(error)
     
        }
    }
);

