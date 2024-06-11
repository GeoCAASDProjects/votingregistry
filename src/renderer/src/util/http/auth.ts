import axios from 'axios';
import { BASE_URL_API } from '../../config';
import { LoginData, LoginError, LoginResponse } from '../types';

export async function login(data: LoginData): Promise <LoginResponse>{
    alert("On it");
    const url = `${BASE_URL_API}/login`;

   
    const response = await axios.post<LoginResponse>(url, {
        email: data.email,
        password: data.password,
    },{
        withCredentials: true
    });
 
    console.log(response);
    return response.data;
 
 
    // return token


}