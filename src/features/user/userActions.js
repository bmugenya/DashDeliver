import { createAsyncThunk } from '@reduxjs/toolkit'
import { authUser, getCurrentUser } from './userApi'
import Cookies from 'js-cookie'


export const authUserAsync = createAsyncThunk(
    '/login',
    async ({ email, password }, {rejectWithValue }) => {
        try {
            const response = await authUser(email,password);
            Cookies.set('token', response.token)
            console.log(response)
            return response;

        } catch(error) {
            if (error.response && error.response.message) {
                return rejectWithValue(error.response.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);

export const getCurrentUserAsync = createAsyncThunk(
    '/user',
    async ( id , {rejectWithValue }) => {
        try {
            const response = await getCurrentUser(id);
            return response;
        } catch(error) {
            if (error.response && error.response.message) {
                return rejectWithValue(error.response.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);