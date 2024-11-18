import { db } from '@/firebase/config';
import { collection, addDoc } from 'firebase/firestore';

export async function salvarRespostas(questionarioId:string, pacienteId:string, respostas:any) {
  try {
    const respostaRef = collection(db, `Testes/${questionarioId}/respostas`);
    
    await addDoc(respostaRef, {
      pacienteId,
      respostas,
      data: new Date(),
    });

    return true;
  } catch (error) {
    return false;
  }
}
