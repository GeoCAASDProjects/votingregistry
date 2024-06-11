import axios from 'axios';
import { BASE_URL_API } from '../../config';
import { LoginData, LoginError, LoginResponse } from '../types';

 
export async function login(data: LoginData): Promise <LoginResponse | LoginError>{
    
    try{
    const url = `${BASE_URL_API}/login`;
    alert(url);
   
    const response = await axios.post<LoginResponse>(url, {
        email: data.email,
        password: data.password,
    });
 
    console.log(response);
    return response.data;
} catch(error:any){
   console.error(error);
   alert(JSON.stringify(error));
   return {
    message: error.response?.data?.message || "An error occurred"
   }
}

    // return token


}