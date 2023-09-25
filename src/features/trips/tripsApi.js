import axios from 'axios'
import { url } from "../../utils/url"


export const getTrips = async (user_id) => {
    try {
        
        const config = { headers: { 'Content-Type': 'application/json' } }
        const { data } = await axios.get(`${url}/trips/${user_id}`, config)     

        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}


