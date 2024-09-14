import { BASE_URL_API } from "@renderer/config";
import axios, { AxiosRequestConfig } from "axios";



export async function fetchAllSchools({signal, enclosureId}){
    let url = `${BASE_URL_API}/schools`;
  
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

export async function fetchSchools({signal, enclosureId}){
    let url = `${BASE_URL_API}/enclosure/${enclosureId}/schools`;
  
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


export async function updateSchool(data){
 
    console.log("THE DATA")
    console.log("----------------------------------------------------------------------")
    console.log({...data})
  
    let url = `${BASE_URL_API}/school/${data.id}`;
    const config: AxiosRequestConfig ={
     
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
     
    }

    try{
        const response = await axios.patch(url, data, config);
      
        console.log(response);
      
        return response.data;
        } catch(error){
            console.log(error);
            
          throw new Error('Request failed');
        }
}


export async function fetchSchool(id){
    let url = `${BASE_URL_API}/school/${id}`;

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

export async function createSchool(data){
    console.log(data);
    let url = `${BASE_URL_API}/enclosure/${data.enclosure_id}/school`;
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

export async function deleteSchool(id){
    let url = `${BASE_URL_API}/school/${id}`;
    const config: AxiosRequestConfig ={
     
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
     
    }
    try{
        const response = await axios.delete(url, config);
        return response.data;
    
    }catch(error){
        throw new Error('Request failed.')
    }
}
