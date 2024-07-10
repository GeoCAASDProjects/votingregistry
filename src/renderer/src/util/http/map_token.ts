import axios from "axios";
export const MAP_TOKEN ="fB5seqxdniyv2ZReE0pa"

export async function getAddress({lat, lng}){
  
    try{
        const response =  await axios.get(`https://api.maptiler.com/geocoding/${lng},${lat}.json?key=${MAP_TOKEN}`);
   console.log(response.data)
       console.log(response.data.features[0].place_name)
        return response.data.features[0].place_name
    } catch(e){
        alert(e)
    }
 
}

export async function searchAddress(text){
    try{
        const response =  await axios.get(`https://api.maptiler.com/geocoding/${text}.json?proximity=ip&fuzzyMatch=true&limit=3&key=${MAP_TOKEN}`);
        console.log(response.data)
    
        return response.data;
    } catch(e){
        alert(e)
    }
}

