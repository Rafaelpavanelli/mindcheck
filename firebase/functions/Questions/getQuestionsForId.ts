import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export async function getQuestionsById(idQuestion:string) {
  const fileDocRef = doc(db, 'Testes', idQuestion);
  try {
    const docSnap = await getDoc(fileDocRef);
    if (docSnap.exists()) {
     
      return docSnap;
    } else {
      return Alert.alert("Nenhum documento encontrado com esse nome.");
    }
  } catch (error) {
    console.error("Erro ao buscar o documento:", error);
  }
};


