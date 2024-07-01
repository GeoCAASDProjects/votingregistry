import { BASE_URL_API } from "@renderer/config";
import axios, {AxiosRequestConfig} from "axios";


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


export async function fetchMembers({signal, schoolId}){
    let url = `${BASE_URL_API}/school/${schoolId}/members`;
   
    const config: AxiosRequestConfig ={
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        signal: signal,  
    }
    try{
    const response = await axios.get(url, config);
  
    console.log(response);
    
    return response.data;
    } catch(error){
        console.log(error);
    
      throw new Error('Request failed');
    }
}

export async function createPerson(data){
    
    let url = `${BASE_URL_API}/person`;
    const config: AxiosRequestConfig ={
     
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
     
    }

    try{
        const response = await axios.post(url, data, config);
      
        console.log(response);
      
        return response.data;
        } catch(error){
            console.log(error);
            
          throw new Error('Request failed');
        }
}