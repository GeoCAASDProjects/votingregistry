import { BASE_URL_API } from "@renderer/config";
import axios, { AxiosRequestConfig } from "axios";
 




export async function fetchSectors({signal}){
    let url = `${BASE_URL_API}/sectors`;
 
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


export async function fetchSector(id){
    let url = `${BASE_URL_API}/sector/${id}`;

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

 

export async function createSector(data){

    let url = `${BASE_URL_API}/sector`;
    const config: AxiosRequestConfig ={
     
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
     
    }

    try{
        const response = await axios.post(url, data, config);
      
        console.log(response);
        alert(response)
        return response.data;
        } catch(error){
            alert(error)
            console.log(error);
            
          throw new Error('Request failed');
        }
}





export async function fetchSectorEnclosures({signal, sectorId}){
    let url = `${BASE_URL_API}/sector/${sectorId}/enclosures`;
  
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
