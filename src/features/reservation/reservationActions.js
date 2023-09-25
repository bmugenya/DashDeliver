import { createAsyncThunk } from '@reduxjs/toolkit'
import { getReservation } from './reservationApi'


export const getReservationAsync = createAsyncThunk(
    '/reservation',
    async (listing_id) => {
        try {
            const response = await getReservation(listing_id);
          
            return response;
        } catch(error) {
            console.log(error)
     
        }
    }
);

