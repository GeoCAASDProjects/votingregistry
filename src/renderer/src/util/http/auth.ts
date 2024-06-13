import axios from 'axios';
import { BASE_URL_API } from '../../config';
import { LoginData, LoginError, LoginResponse } from '../types';

 
export async function login(data: LoginData): Promise <LoginResponse | LoginError>{
    try {
        const url = `${BASE_URL_API}/login`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || 'Network response was not ok');
        }

        const responseData: LoginResponse = await response.json();
        return responseData;
    } catch (error:any) {
        console.error(error);
        return {
            message: error.message || "An error occurred"
        };
    }

    // return token

}

export const api = axios.create({
    baseURL: BASE_URL_API,
    withCredentials: true, // Include cookies in requests
  });
  
export async function get_current_user(){
    try{
      const response=  await api.get('/sanctum/csrf-cookie');
        return response;
    } catch(error){
        console.error("Error fetching current user", error)
        throw error;
    }
}
