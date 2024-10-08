import { createContext, ReactNode, useEffect, useState } from "react";
import { UserInterface } from "@/interfaces/User.interface";
import { useRouter } from "expo-router";

export interface UserContextDataProps {
  user: UserInterface;
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
  
    
  return <UserContext.Provider value={{user}}>{children}</UserContext.Provider>;
}
