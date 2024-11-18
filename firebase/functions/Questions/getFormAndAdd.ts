import { db } from "@/firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, addDoc } from "firebase/firestore";

export async function GetFormAndAdd(idQuestion: string) {
  const uid = await AsyncStorage.getItem("@keyUser");
  if (uid) {
    try {
      const docRef = collection(db, `users/${uid}/Formularios`);
      
      const novoFormulario = {
        idFormulario: idQuestion,
        feito: false,
      };
      
      await addDoc(docRef, novoFormulario);
      
      return true;
    } catch (error) {
      console.error("Erro ao adicionar formulário:", error);
    }
  } else {
    console.error("UID do usuário não encontrado.");
  }
}
