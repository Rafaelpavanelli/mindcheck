import { createContext, ReactNode, useState } from "react";
import { UserInterface } from "@/interfaces/User.interface";
import { CreateUserWithEmailAndPassword } from "@/firebase/functions/Users/Create";
export interface UserContextDataProps {
  user: UserInterface;
  
  handleCreateUser:(user:UserInterface)=> any;
}

export const UserContext = createContext<UserContextDataProps>(
  {} as UserContextDataProps
);

interface UserContextProviderProps{
    children: ReactNode
}
export function userProvider({ children }:UserContextProviderProps) {
    const[user,setUser]=useState<any>(null);
    async function handleCreateUser(user:UserInterface){
        try{
            const userData = await CreateUserWithEmailAndPassword(user);
            setUser(userData);
        }catch(error){
            console.log(error);
        }
    }
  return <UserContext.Provider value={{handleCreateUser,user}}>{children}</UserContext.Provider>;
}
