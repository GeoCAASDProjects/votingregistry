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
/*
export async function createPerson(formData){
    let url = `${BASE_URL_API}/post/`;
    console.log("Form data")
 

    formData.forEach((value, key) => {
      console.log(value)
      });
    try{
    const response = await axios.post(url, 
    formData
        , {
      
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'multipart/form-data',
        }
    });
    if(!response.ok){
        console.log("Not ok")
    } else{
        console.log("Ok")
    }
    console.log(response.data);
    return response.data;
    } catch(error){
        console.log(error);
        
        throw new Error('Request failed');
    }
}*/

export async function createPerson(formData){
   
    let url = `${BASE_URL_API}/person`;
    console.log(formData)
 
    const config: AxiosRequestConfig ={
     
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'multipart/form-data',
        },
     
    }

    try{
        const response = await axios.post(url, formData, config);
      console.log("Success");
        console.log(response);
         
        return response.data;
        } catch(error){
          
            console.error(error);
            
          throw new Error('Request failed');
        }
}


export async function updatePerson(data){
 
    console.log("THE DATA")
    console.log("----------------------------------------------------------------------")
    console.log({...data})
  
    let url = `${BASE_URL_API}/person/${data.id}`;
    const config: AxiosRequestConfig ={
     
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
           'Content-Type': 'application/json',
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

export async function deletePerson(id){
    let url = `${BASE_URL_API}/person/${id}`;
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


export async function fetchPerson(id){
    let url = `${BASE_URL_API}/person/${id}`;

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
