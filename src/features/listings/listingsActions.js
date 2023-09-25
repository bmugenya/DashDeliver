import { createAsyncThunk } from '@reduxjs/toolkit'
import { getListings } from './listingsApi'


export const getListingsAsync = createAsyncThunk(
    '/listing',
    async () => {
        try {
            const response = await getListings();
          
            return response;
        } catch(error) {
            console.log(error)
     
        }
    }
);

