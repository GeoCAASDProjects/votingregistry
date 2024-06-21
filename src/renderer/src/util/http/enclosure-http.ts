import { BASE_URL_API } from "@renderer/config";
import axios, { AxiosRequestConfig } from "axios";
import { Enclosure } from "../types";


export async function fetchEnclosures({signal}): Promise<Enclosure[] | Error>{
    let url = `${BASE_URL_API}/enclosures`;

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

export async function fetchEnclosure(id){
    let url = `${BASE_URL_API}/enclosure/${id}`;

    const config: AxiosRequestConfig ={
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
     
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