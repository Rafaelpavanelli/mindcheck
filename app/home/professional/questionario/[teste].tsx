import { GetMyQuestionsInfos, QuestionInfo } from "@/firebase/functions/Questions/getMyQuestionsInfos";
import { getQuestionsById } from "@/firebase/functions/Questions/getQuestionsForId";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Alert, Pressable, ActivityIndicator } from "react-native";

const Questionnaire = () => {
  const { teste } = useLocalSearchParams();

  const [questionInfo, setQuestionInfo] = useState<QuestionInfo>();
  
  useEffect(() => {
    GetMyQuestionsInfos(String(teste))
      .then((item:QuestionInfo | any) => {
        setQuestionInfo(item);
        console.log(item.pacientes)
      })
      .catch((erro) => {});
  }, []);
  return questionInfo ? (
    <View className="bg-blue_mid flex-1 max-h-screen ">
      <Text className="m-10 text-center mt-20 font-semibold text-2xl text-white">
       {questionInfo.title}
      </Text>
      <View className="bg-blue_light h-full mt-10  py-4">
        <View className="bg-white px-8 py-2">
          <Text className="text-xl font-semibold">Data de criação</Text>
          <Text>
            {questionInfo.createAt}
          </Text>
        </View>
        <View>
         
        </View>
      </View>
    </View>
  ) : (
    <View className=" max-h-screen flex-1 bg-blue_mid justify-center items-center ">
      <Text className="text-white"> Buscando dados ...</Text>
      <Text>
        <ActivityIndicator size={100} />
      </Text>
    </View>
  );
};

export default Questionnaire;
