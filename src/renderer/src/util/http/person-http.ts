import { BASE_URL_API } from "@renderer/config";

export async function fetchUsers({signal, searchTerm, max}){
    let url = `${BASE_URL_API}/users`;

    if(searchTerm) url += `?query=${searchTerm}`;


    console.log(url);

    try{
    const response = await axios.get(url, {signal: signal,
    
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    if(!response.ok){
        console.log("Not ok")
    } else{
        console.log("Ok")
    }
    console.log(response);
    return response.data;
    } catch(error){
        console.log(error);
        
        return error;
    }
}