import { Pressable, ScrollView, Text, View, ViewBase } from "react-native";
import { Question } from "@/interfaces/Questions.interface";
import { useState } from "react";
import { QuestionForm } from "@/components/questionForm";

import { InputRadio } from "@/components/inputRadio";
const questions: Question[] = [
  { id: 1, question: "Question 1?", type: "text" },
  { id: 2, question: "Question 2?", type: "text" },
  { id: 3, question: "Question 3?", type: "text" },
  { id: 4, question: "Question 4?", type: "text" },
  { id: 5, question: "Question 5?", type: "text" },
  { id: 6, question: "Question 6?", type: "text" },
  { id: 7, question: "Question 6?", type: "text" },
];

const ITEMS_PER_PAGE = 5;
export default function QuestionQuest() {
  const [page, setPage] = useState(-1);
  function nextPage() {
    setPage((prev) => prev + 1);
    console.log(page)
  }
  function prevPage() {
    if(page)
    setPage((prev) => prev - 1);
  }
  const currentQuestions = questions.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );
  const handleSubmit = (data: any) => {
    if ((page + 1) * ITEMS_PER_PAGE < questions.length) {
      nextPage();
    } else {
      console.log("Form submission completed:", data);
    }
  };
  return (
    <View className="pt-40 bg-blue_light px-10 h-full">
      {page === -1 ? (
        <View className="justify-center items-center px-14 pb-4 mt-4">
          <Text className="text-2xl">
            Questionário de crenças dos transtornos da personalidade – forma
            reduzida (pbq-sf)
          </Text>
          <Text className="text-md py-4">
            Leia os itens abaixo e marque O QUANTO VOCÊ ACREDITA EM CADA UM.
            Procure avaliar como você se sente em relação a cada afirmação A
            MAIOR PARTE DO TEMPO.
          </Text>
          <View className="flex-row">
            <View className="w-20 justify-center items-center">
              <Text className="text-xs text-center">Acredito totalmente</Text>
              <InputRadio label="4" onChange={() => {}} isSelected={false} />
            </View>
            <View className="w-16 justify-center items-center">
              <Text className="text-xs text-center">Acredito bastante</Text>
              <InputRadio label="3" onChange={() => {}} isSelected={false} />
            </View>
            <View className="w-16 justify-center items-center">
              <Text className="text-xs text-center">
                Acredito moderadamente
              </Text>
              <InputRadio label="2" onChange={() => {}} isSelected={false} />
            </View>
            <View className="w-16 justify-center items-center">
              <Text className="text-xs text-center">Acredito um pouco</Text>
              <InputRadio label="1" onChange={() => {}} isSelected={false} />
            </View>
            <View className="w-16 justify-center items-center">
              <Text className="text-xs text-center">Não acredito</Text>
              <InputRadio label="0" onChange={() => {}} isSelected={false} />
            </View>
          </View>
          <Pressable className="mt-10 px-8 py-2 rounded-md bg-blue_mid" onPress={nextPage}>
            <Text className="text-white text-xl">Ok</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView  className="h-screen relative">
          <QuestionForm prevPage={prevPage} nextPage={nextPage} onSubmit={handleSubmit} questions={currentQuestions} isLast={!((page + 1) * ITEMS_PER_PAGE < questions.length)}/>
        </ScrollView>
      )}
    </View>
  );
}
