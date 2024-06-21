import { BASE_URL_API } from "@renderer/config";
import axios from "axios";
export async function fetchPeople({signal, searchTerm, max}){
    let url = `${BASE_URL_API}/people`;

    if(searchTerm) url += `?query=${searchTerm}`;


    console.log(url);

    try{
    const response = await axios.get(url, {signal: signal,
    
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
 
    console.log(response);
    return response.data;
    } catch(error){
        console.log(error);
        
        return error;
    }
}