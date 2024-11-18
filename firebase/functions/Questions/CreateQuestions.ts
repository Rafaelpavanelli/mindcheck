import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config"; // Removi o `app` se não estiver sendo usado
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Question } from "@/app/home/professional/criarFormulario";

type QuestionType = {
  title: string;
  questions: Question[];
};

export async function createQuestion(data: QuestionType): Promise<boolean> {
  const id = uuid.v4() as string;

  try {
    const uid = await AsyncStorage.getItem("@keyUser");
    
    if (uid) {
      const questionData = {
        uidCreator: uid,
        title: data.title,
        perguntas: data.questions, // Preferência por nomes de variáveis em minúsculo
      };

      await setDoc(doc(db, "Testes", id), questionData);
      return true;
    }
    return false;
  } catch (e) {
    console.error("Erro ao criar questionário:", e);
    return false;
  }
}
