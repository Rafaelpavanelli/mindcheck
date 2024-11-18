import { app, db } from "@/firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";


interface SigInProps {
  email: string;
  password: string;
  remember?: boolean;
}

export async function SigIn(data: SigInProps) {
  const auth = getAuth(app)
  try {
    const user = await signInWithEmailAndPassword(auth, data.email, data.password);
    if(user.user.uid){
     await AsyncStorage.setItem('@keyUser',JSON.stringify(user.user.uid));
    }
    return user; 
  } catch (e: any) {
    if (e.code) {
      return ; 
    }
    return null; 
  }
}
