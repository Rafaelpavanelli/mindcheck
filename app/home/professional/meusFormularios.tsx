import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  Text,
  View,
  Share,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Clipboard from "expo-clipboard";
import * as Sharing from "expo-sharing";

interface Question {
  id: string;
  title: string;
  Perguntas: any[];
  uidCreator: string;
}

export default function MeusFormularios() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [codeShare, setCodeShare] = useState<string>("");

  const handleCopyAndShare = async () => {
    try {
      await Clipboard.setStringAsync(codeShare);

      const result = await Share.share({
        message: codeShare,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Compartilhado com uma atividade específica
          console.log("Compartilhado via:", result.activityType);
          setOpenModal(false);
        } else {
          // Compartilhado genericamente
          console.log("Compartilhado");
          setOpenModal(false);
        }
      } else if (result.action === Share.dismissedAction) {
        // Compartilhamento cancelado
        console.log("Compartilhamento cancelado");
      }
    } catch (error) {
      console.error("Erro ao copiar e compartilhar:", error);
      Alert.alert("Erro", "Ocorreu um erro ao copiar ou compartilhar o texto.");
    }
  };
  function OpenModal(code: string) {
    setOpenModal(true);
    setCodeShare(code);
  }
  useEffect(() => {
    const fetchData = async () => {
      const uidCreator = await AsyncStorage.getItem("@keyUser");

      if (uidCreator) {
        const testesRef = collection(db, "Testes");
        const q = query(testesRef, where("uidCreator", "==", uidCreator));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const updatedQuestions = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Question[];

          setQuestions(updatedQuestions);
        });

        return () => unsubscribe();
      } else {
        Alert.alert("Erro", "Usuário não encontrado.");
      }
    };

    fetchData();
  }, []);

  return (
    <View className="bg-blue_mid flex-1 pt-16 relative">
      <View className="flex-1 bg-blue_light rounded-tr-[20px] rounded-tl-[20px]">
        <FlatList
          data={questions}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            alignItems: "center",
          }}
          renderItem={(item) => (
            <Pressable className="w-96 h-20 flex-shrink-0 px-10 shadow-gray-500 flex-row items-center border-b-4 border-b-blue_mid  rounded-3xl justify-between ">
              <Text>
                <FontAwesome6
                  name="clipboard-question"
                  size={24}
                  color="#3a6c8d"
                />
              </Text>
              <Text className="max-w-52 ">{item.item.title}</Text>

              <View className="flex-row gap-2">
                <Link
                  href={{
                    pathname: "/home/professional/questionario/[teste]",
                    params: { teste: item.item.id },
                  }}
                  className="text-center "
                >
                  <AntDesign name="infocirlceo" size={20} color="black" />
                </Link>
                <Pressable onPress={() => OpenModal(item.item.id)}>
                  <AntDesign name="sharealt" size={20} color="black" />
                </Pressable>
              </View>
            </Pressable>
          )}
        />
      </View>
      <Link href={"/home/professional/criarFormulario"} asChild>
        <Pressable className="  h-16 w-16 absolute bottom-4 right-4 rounded-full bg-blue_mid justify-center items-center">
          <Ionicons name="add" size={30} color="white" />
        </Pressable>
      </Link>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={() => {
          setOpenModal(!openModal);
        }}
      >
        <View className="justify-center items-center flex-1">
          <View className="w-92 p-4 rounded-sm bg-blue_mid relative pt-8">
            <Pressable
              className="absolute  right-4"
              onPress={() => setOpenModal(false)}
            >
              <Text className="text-2xl text-white">x</Text>
            </Pressable>
            <Text className="text-white text-xl font-semibold text-center">
              Este é o codigo do seu formulário, por favor envie para seus
              pacientes.
            </Text>
            <Text className="text-gray-100 text-sm text-center">
              Todos os envios do formulário não são de nossa responsabilidade.
              Realize o envio com cuidado!
            </Text>
            <View className="justify-center items-center">
              <Text className="bg-white w-88 text-center py-4 px-1 m-2 rounded-md">
                {codeShare}
              </Text>
              <Pressable
                onPress={() => handleCopyAndShare()}
                className="flex-row gap-2 justify-center bg-blue_light w-80 p-2 rounded-sm border-white"
              >
                <Text>Copiar para área de transferencia</Text>
                <Feather name="copy" size={18} color="black" />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
