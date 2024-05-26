import { app,db } from "@/firebase/config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { UserInterface } from "@/interfaces/User.interface";
import { doc,setDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const CreateUserWithEmailAndPassword = async (user:UserInterface) => {
    const auth = getAuth(app);
    try{
        const CreateUser = await createUserWithEmailAndPassword(auth,user.email,user.password);
        if(CreateUser.user){
            await setDoc(doc(db, "users",CreateUser.user.uid),{
                fullName: user.name,
                cpf: user.cpf
            });
            await AsyncStorage.setItem('@uidUser',JSON.stringify(CreateUser.user.uid));
            return {
                name: user.name,
                uid:CreateUser.user.uid
            }
        }
    }catch(error){
        throw error;
    }
}