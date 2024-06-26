import axios from 'axios';
import { BASE_URL, BASE_URL_API } from '../../config';
import { LoginData, LoginError, LoginResponse } from '../types';


export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }// Include cookies in requests
});

 

export async function login(data: LoginData): Promise<LoginResponse | LoginError> {

  
        try {
            const url = `${BASE_URL_API}/login`;
            alert(url)
            const response = await axios.post(url, {
                email: data.email,
                password: data.password,
            });


            return response.data;

        } catch (error: any) {
            alert(error)
            console.error(error);
            return {
                message: error.message || "An error occurred"
            };
        }
 




}



export async function get_current_user() {
  
   
    try {

        const url = `${BASE_URL_API}/me`;
        
        const response = await axios.get(url, {
  
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                 Authorization: `Bearer ${localStorage.getItem("token")}`
                
            }
        });
    
        console.log(response.data);
 
        return response.data;
    } catch (error) {
  
    
        console.error("Error fetching current user", error)
        throw error;
    };

}



export async function logout(){

  
    try {
        const url = `${BASE_URL_API}/logout`;
     
        const response = await axios.post(url);


        return response.data;

    } catch (error: any) {
        
        console.error(error);
        return {
            message: error.message || "An error occurred"
        };
    }





}
