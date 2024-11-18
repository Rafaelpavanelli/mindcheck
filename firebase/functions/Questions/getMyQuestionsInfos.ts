import { db } from "@/firebase/config";
import { useRouter } from "expo-router";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { Alert } from "react-native";
interface Resposta {
  id: string;
  data: Date | any; // Use `Date` se você estiver convertendo o timestamp para um objeto `Date`
  pacienteId: string;
  respostas: Record<string, any>; // Ajuste isso dependendo do formato exato de `respostas`
}

export interface QuestionInfo {
  createAt: Date | any;
  idQuestion: string;
  perguntas: Resposta[];
  title: string;
  uidCreator: string;
  pacientes: string[] | null;
}

function formatDate(isoString: any) {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export async function GetMyQuestionsInfos(questionId: string) {
  try {
    // Referência ao documento principal
    const question = doc(db, "Testes", questionId);
    const responseQuestion = await getDoc(question);

    if (responseQuestion.exists()) {
      const respostasCollection = collection(
        db,
        `Testes/${questionId}/respostas`
      );
      const responseQuestionRespostas = await getDocs(respostasCollection);

      const respostas = responseQuestionRespostas.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const pacientesData = responseQuestion.data()?.pacientes || [];

      const pacientes: string[] = [];
      for (const pacienteId of pacientesData) {
        const patientRef = doc(db, "pacientes", pacienteId);
        const patientDoc = await getDoc(patientRef);
        if (patientDoc.exists()) {
          pacientes.push(pacienteId);
        }
      }
      console.log("Pacientes data:", pacientesData);

      return {
        ...responseQuestion.data(),
        idQuestion: responseQuestion.id,
        perguntas: respostas,
        //@ts-ignore
        createAt: formatDate(
          //@ts-ignore
          responseQuestion._document.createTime.timestamp.toDate()
        ),
        pacientes: pacientes,
      };
    }
  } catch (e) {
    console.log(e);
    const navigation = useRouter();
    return Alert.alert(
      "Erro ao requisitar pergunta",
      "O id da pergunta não retornou um arquivo válido",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => navigation.back(), // Nome da página para onde quer navegar
        },
      ],
      { cancelable: false }
    );
  }
}
