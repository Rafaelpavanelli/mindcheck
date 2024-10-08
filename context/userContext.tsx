import { createContext, ReactNode, useEffect, useState } from "react";
import { UserInterface } from "@/interfaces/User.interface";
import { useRouter } from "expo-router";
import { getFirestore,doc,getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

    async function getUser(){

      try{
        const uid =  await AsyncStorage.getItem("@keyUser")
        console.log(uid)
        if(uid){
          const docRef = doc(db, "users", JSON.parse(uid));
          const docSnap = await getDoc(docRef);
          if(docSnap.exists()){
            setUser(docSnap.data());
          }else{
            throw new Error(
              "Usuário não encontrado no banco de dados. Entre em contato com o suporte!"
            );
          }
        }
      }catch(e){
        throw new Error(
         "Erro ao procurar chave UID"
        );
      }
    }
    useEffect(()=>{
      getUser();
    },[])
    
  return <UserContext.Provider value={{user}}>{children}</UserContext.Provider>;
}
