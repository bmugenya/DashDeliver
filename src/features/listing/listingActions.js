import { createAsyncThunk } from '@reduxjs/toolkit'
import { getListing } from './listingApi'


export const getListingAsync = createAsyncThunk(
    '/listing',
    async (listing_id) => {
        try {
            const response = await getListing(listing_id);
          
            return response;
        } catch(error) {
            console.log(error)
     
        }
    }
);

