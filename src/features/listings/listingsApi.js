import axios from 'axios'
import { url } from "../../utils/url"


export const getListings = async (user_id) => {
    try {
        
        const config = { headers: { 'Content-Type': 'application/json' } }
        const { data } = await axios.get(`${url}/shipments/${user_id}`, config)  

        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}


