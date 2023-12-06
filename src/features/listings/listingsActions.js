import { createAsyncThunk } from '@reduxjs/toolkit'
import { getListings } from './listingsApi'


export const getShipmentsAsync = createAsyncThunk(
    '/listing',
    async (user_id) => {
        try {
            const response = await getListings(user_id);
     
          
            return response;
        } catch(error) {
            console.log(error)
     
        }
    }
);

