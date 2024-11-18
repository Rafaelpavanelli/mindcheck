import React, { useState } from "react";
import {
  View,
  Modal,
  FlatList,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import uuid from "react-native-uuid";
import { TextInput } from "react-native-gesture-handler";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { createQuestion } from "@/firebase/functions/Questions/CreateQuestions";
import { useRouter } from "expo-router";

type QuestionType = "text" | "checkbox";

export interface Question {
  id: string;
  type: QuestionType;
  content: string;
}

// Esquema de validação usando Yup
const schema = Yup.object().shape({
  title: Yup.string().required("Título é obrigatório"),
});

// Componente para renderizar uma pergunta
const QuestionItem = ({
  item,
  index,
  deletionMode,
  toggleSelection,
  selectedQuestions,
  updateQuestionContent,
}: {
  item: Question;
  index: number;
  deletionMode: boolean;
  toggleSelection: (id: string) => void;
  selectedQuestions: Set<string>;
  updateQuestionContent: (id: string, content: string) => void;
}) => (
  <View className="mx-10 my-4">
    <View className="flex-row">
      {deletionMode && (
        <TouchableOpacity onPress={() => toggleSelection(item.id)}>
          <View
            className={`w-6 h-6 border border-black rounded-full justify-center items-center mr-2 ${
              selectedQuestions.has(item.id) ? "bg-red-500" : ""
            }`}
          />
        </TouchableOpacity>
      )}
      <Text>{index + 1}.</Text>
      <TextInput
        placeholder="Escreva a pergunta"
        value={item.content}
        className="h-auto ml-2 flex-1"
        multiline
        textAlignVertical="top"
        numberOfLines={2}
        onChangeText={(text) => updateQuestionContent(item.id, text)}
      />
    </View>

    {item.type === "checkbox" && (
      <View className="flex-row justify-between">
        {Array.from({ length: 5 }).map((_, index) => (
          <View key={index} className="flex-col items-center">
            <Text className="text-[10px]">{index}</Text>
            <View className="w-6 h-6 border border-black rounded-full justify-center items-center" />
          </View>
        ))}
      </View>
    )} 
  </View>
);

export default function CriarFormulario() {
  const navigation = useRouter()
  const [modal, setModal] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [deletionMode, setDeletionMode] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(
    new Set()
  );

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { title: "" },
  });

  const addQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: uuid.v4() as string,
      type,
      content: "",
    };
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    setModal(false);
  };

  const updateQuestionContent = (id: string, content: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === id ? { ...q, content } : q))
    );
  };

  const toggleSelection = (id: string) => {
    setSelectedQuestions((prev) => {
      const updatedSet = new Set(prev);
      updatedSet.has(id) ? updatedSet.delete(id) : updatedSet.add(id);
      return updatedSet;
    });
  };

  const deleteSelectedQuestions = () => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((q) => !selectedQuestions.has(q.id))
    );
    setSelectedQuestions(new Set());
    setDeletionMode(false);
  };

  async function onSubmit(data: any) {
    try{
      const cadastrar = await createQuestion({ title: data.title, questions })
      if(cadastrar){
        navigation.back();
      }
    }catch(e){
      return e;
    }
  }

  return (
    <View className="bg-blue_mid flex-1 relative">
      <View className="bg-white h-full rounded-t-[50px] mt-10 p-4">
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Insira o título do questionário"
              className="text-xl text-center"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline
              numberOfLines={4}
            />
          )}
        />

        <FlatList
          data={questions}
          className="max-h-[70%]"
          keyExtractor={(item) => item.id}
          ListFooterComponent={() =>
            questions.length > 0 && (
              <View className="items-center">
                <TouchableOpacity onPress={handleSubmit(onSubmit)} className="">
                  <Text className="p-4 w-80 h-16 bg-blue_mid rounded-3xl text-center text-white font-bold">
                    Finalizar questionário
                  </Text>
                </TouchableOpacity>
              </View>
            )
          }
          renderItem={({ item, index }) => (
            <QuestionItem
              item={item}
              index={index}
              deletionMode={deletionMode}
              toggleSelection={toggleSelection}
              selectedQuestions={selectedQuestions}
              updateQuestionContent={updateQuestionContent}
            />
          )}
        />
      </View>

      <View className="bottom-4 absolute right-4 gap-4">
        <Pressable
          onPress={() => setModal(true)}
          className="rounded-full p-4 bg-blue_fat flex-row justify-center items-center gap-2"
        >
          <Entypo name="plus" color={"white"} size={24} />
        </Pressable>
        {questions.length > 0 && (
          <Pressable
            onPress={() =>
              deletionMode ? deleteSelectedQuestions() : setDeletionMode(true)
            }
            className="rounded-full p-4 bg-blue_mid flex-row justify-center items-center gap-2"
          >
            <AntDesign
              name={!deletionMode ? "edit" : "delete"}
              color="white"
              size={24}
            />
          </Pressable>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => setModal(!modal)}
      >
        <View className="flex-1 justify-center items-center bg-[rgba(0,30,37,0.47)]">
          <View className="gap-4">
            <TouchableOpacity onPress={() => addQuestion("text")}>
              <Text className="bg-blue_mid text-xl text-white rounded-full py-4 px-8 text-center">
                Pergunta de Texto
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => addQuestion("checkbox")}>
              <Text className="bg-blue_mid text-xl text-white rounded-full py-4 px-8 text-center">
                Pergunta com Resposta (Checkbox)
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
