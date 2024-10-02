import { createContext, ReactNode, useState } from "react";
import { UserInterface } from "@/interfaces/User.interface";
import { CreateUserWithEmailAndPassword } from "@/firebase/functions/Users/Create";
import { useRouter } from "expo-router";
export interface UserContextDataProps {
  user: UserInterface;
  
  handleCreateUser:(user:UserInterface)=> any;
  handleLogoutUser:()=>void;
}

export const UserContext = createContext<UserContextDataProps>(
  {} as UserContextDataProps
);

interface UserContextProviderProps{
    children: ReactNode
}
export function userProvider({ children }:UserContextProviderProps) {
    const router = useRouter()
    const[user,setUser]=useState<any>(null);
    async function handleCreateUser(user:UserInterface){
        try{
            const userData = await CreateUserWithEmailAndPassword(user);
            setUser(userData);
        }catch(error){
            console.log(error);
        }
    }
    function handleLogoutUser(){
      setUser({})
      router.push('/Questions')
    }
  return <UserContext.Provider value={{handleCreateUser,user,handleLogoutUser}}>{children}</UserContext.Provider>;
}
