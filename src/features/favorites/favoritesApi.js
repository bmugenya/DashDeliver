import axios from 'axios'
import { url } from "../../utils/url"


export const getDrivers = async () => {
    try {
        
        const config = { headers: { 'Content-Type': 'application/json' } }
        const { data } = await axios.get(`${url}/user/drivers`, config)  
        console.log(data)

        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}


