import { app,db } from "@/firebase/config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc,setDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfissionalInterface } from "@/interfaces/Profissional.interface";
export const CreateProfissionalWithEmailAndPassword = async (user:ProfissionalInterface) => {
    const auth = getAuth(app);
    try{
        const CreateUser = await createUserWithEmailAndPassword(auth,user.email,user.password);
        if(CreateUser.user){
            await setDoc(doc(db, "users",CreateUser.user.uid),{
                fullName: user.fullname,
                credential: user.credential,
                isValid: false
            });
            await AsyncStorage.setItem('@keyUser',JSON.stringify(CreateUser.user.uid));
            return {
                name: user.fullname,
                uid:CreateUser.user.uid
            }
        }
    }catch(error){
        throw error;
    }
}