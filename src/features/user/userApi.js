import axios from 'axios'
import { url } from "../../utils/url"


export const  authUser = async (email, password) => {
    try {
        
        const config = { headers: { 'Content-Type': 'application/json' } }
        const { data } = await axios.post(`${url}/login`, { email, password }, config)   
        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}

export const  getCurrentUser = async (id) => {
    try {
        
        const config = { headers: { 'Content-Type': 'application/json' } }
        const { data } = await axios.get(`${url}/user/${id}`, config)   
        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}