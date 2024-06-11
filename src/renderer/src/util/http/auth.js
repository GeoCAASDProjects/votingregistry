import axios from 'axios';
import { BASE_URL_API } from '../../config';
export default function login({data}){
    const url = `${BASE_URL_API}/login`;

   
    const response = await axios.post(url, {
        email: data.email,
        password: data.password,
    },{
        withCredentials: true
    });
 
    console.log(response);
    return response.data;

    // return token


}