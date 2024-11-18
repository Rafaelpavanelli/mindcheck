import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getQuestionsByCreatorId() {
  try {
    const uidCreator = await AsyncStorage.getItem("@keyUser");
    const testesRef = collection(db, "Testes");

    const q = query(testesRef, where("uidCreator", "==", uidCreator));

    const querySnapshot = await getDocs(q);

    const questions = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return questions;
  } catch (e) {
    console.error("Erro ao buscar questões:", e);
    return [];
  }
}
