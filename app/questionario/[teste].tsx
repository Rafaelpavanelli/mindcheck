import { getQuestionsById } from "@/firebase/functions/Questions/getQuestionsForId";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Alert, Pressable, ActivityIndicator } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { salvarRespostas } from "@/firebase/functions/Questions/addAnswers";
const Questionnaire = () => {
  const { teste } = useLocalSearchParams();
  const [questions, setQuestions] = useState<any[]>([]);
  const [question, setQuestion] = useState<any>({});
  const [responses, setResponses] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const options = [
    "Acredito totalmente",
    "Acredito bastante",
    "Acredito moderadamente",
    "Acredito um pouco",
    "Não acredito",
  ];

  const questionsPerPage = 4;
  const startIndex = currentPage * questionsPerPage;
  const currentQuestions = questions.slice(
    startIndex,
    startIndex + questionsPerPage
  );

  useEffect(() => {
    getQuestionsById(String(teste)).then((item: any) => {
      setQuestion(item);
      setQuestions(item.data().perguntas);
    });
  }, []);

  // Função para atualizar o estado das respostas
  const handleResponseChange = (perguntaId: string, resposta: string) => {
    setResponses((prev: any) => ({
      ...prev,
      [perguntaId]: resposta,
    }));
  };

  // Função para consolidar e salvar as respostas no formato desejado
  const saveResponses = async () => {
    setLoading(true);
    const uid = await AsyncStorage.getItem("@keyUser");
    if (!uid) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    const respostasArray = Object.keys(responses).map((perguntaId) => ({
      perguntaId,
      resposta: responses[perguntaId],
    }));

    const respostasData = {
      pacienteId: uid,
      respostas: respostasArray,
      data: new Date().toISOString(),
    };

    try {
     
       const resposta = await salvarRespostas(question.id, uid, respostasData);
       if (resposta) {
         setLoading(true);
         router.push("/");
      }
    } catch (error) {
      Alert.alert(
        "Erro ao enviar resposrtas",
        "Houve um erro ao enviar respostas, por favor entre em contato com o suporte!"
      );
    }
    Alert.alert("Sucesso", "Respostas salvas no estado.");
    setLoading(false);
  };

  const nextPage = () => {
    if (startIndex + questionsPerPage < questions.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <View className="bg-green-200 flex-1">
      <View className="h-30 pt-10">
        <Ionicons
          name="return-up-back"
          size={30}
          color="black"
          className="ml-6"
        />
        <Text className="text-center text-xl pt-8 font-light">
          {question.title}
        </Text>
      </View>
      <View className="flex-1 mt-10 bg-white rounded-t-[50px] p-4 items-center relative">
        <Text className="text-sm w-72 text-justify">
          Leia os itens abaixo e marque O QUANTO VOCÊ ACREDITA EM CADA UM.
          Procure avaliar como você se sente em relação a cada afirmação A MAIOR
          PARTE DO TEMPO.
        </Text>
        {currentQuestions.map((question: any, index: any) => (
          <View key={index} className="w-full ml-14 mt-4">
            <Text className="text-md">
              {index + 1}. {question.content}
            </Text>
            {question.type === "text" ? (
              <TextInput
                placeholder="Digite sua resposta"
                numberOfLines={4}
                className="border-2 w-4/5 border-gray-300 h-14 px-2 rounded-md"
                onChangeText={(text) => handleResponseChange(question.id, text)}
                value={responses[question.id] || ""}
              />
            ) : (
              <View className="flex-row justify-between w-80 gap-2 mt-2">
                {options.map((option, idx) => (
                  <View key={idx} className="items-center">
                    <Text className="text-[9px] text-center w-16 h-12 mx-1 text-balance">
                      {option}
                    </Text>
                    <Text className="text-[10px] m-1">{4 - idx}</Text>
                    <Pressable
                      onPress={() => handleResponseChange(question.id, option)}
                    >
                      <View
                        className={`border-[1px] rounded-full w-6 h-6 ${
                          responses[question.id] === option ? "bg-blue_mid" : ""
                        }`}
                      ></View>
                    </Pressable>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}

        {startIndex + questionsPerPage > questions.length && (
          <Pressable
            onPress={saveResponses}
            disabled={loading}
            className="absolute bottom-4 rounded-full border-gray-400 py-4 px-20 bg-blue_mid border-2"
          >
            {loading ? (
              <ActivityIndicator size={28} />
            ) : (
              <Text className="text-white font-semibold">
                Finalizar questionário
              </Text>
            )}
          </Pressable>
        )}
        <View className="flex-row justify-between mb-4  px-8 w-full absolute bottom-0">
          {currentPage !== 0 && (
            <Pressable onPress={prevPage}>
              <FontAwesome name="long-arrow-left" size={28} color="#121214" />
            </Pressable>
          )}
          {startIndex + questionsPerPage < questions.length && (
            <Pressable onPress={nextPage}>
              <FontAwesome name="long-arrow-right" size={28} color="#121214" />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default Questionnaire;
