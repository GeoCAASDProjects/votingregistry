import React, {FC, ReactNode, createContext, useContext, useEffect, useState} from 'react';
import { api, get_current_user } from '../http/auth';

interface User {
    id: number;
    name: string;
    last_name: string;
    email: string;
    user_name: string;
    
}
interface AuthContextType{
    user: User | null;
    fetchUser: ()=>Promise<void>
 //   login: (email: string, password: string)=>Promise<void>
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType=>{
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error("use Auth must be used within Auth provider")
    }
    return context;
}

interface Props {
    children : ReactNode;
}
export const AuthProvider:FC<Props> = ({children})=>{
   const [user, setUser] = useState<User | null>(null)
   
    async function fetchUser(){
    try{
        const response = await get_current_user();
        const users = response.users; 
        console.log("users")
        console.log(users);
        setUser({id: users.id, name: users.name, last_name: users.last_name, user_name: users.user_name, email: users.email});
       
      
    } catch{
        setUser(null)
    }
}

   useEffect(()=>{
  
        fetchUser();
    }, []);

    const value ={
        user: user,
        fetchUser
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}