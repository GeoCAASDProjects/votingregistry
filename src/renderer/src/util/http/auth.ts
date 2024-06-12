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