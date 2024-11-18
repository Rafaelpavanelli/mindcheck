import { FilterCategory } from "@/components/FilterCategory";
import { Link } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import Foundation from "@expo/vector-icons/Foundation";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { GetFormAndAdd } from "@/firebase/functions/Questions/getFormAndAdd";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forms, setForms] = useState<unknown[]>([]);
  const [formCode, setFormCode] = useState("");

  async function sendForm() {
    setLoading(true);
    if (formCode) {
      try {
        const sendForm = await GetFormAndAdd(formCode);
        if (sendForm) {
          setModal(false);
        } else {
          Alert.alert(
            "Não encontrado",
            "O Formulário não pode ser encontrado, verifique se a chave está correta"
          );
        }
      } catch (e) {
        console.error("Erro ao enviar formulário:", e);
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert("Campo Vazio", "O campo de formulário está vazio");
    }
  }
  useEffect(() => {
    const fetchFormularios = async () => {
      setLoading(true);
      const uid = await AsyncStorage.getItem("@keyUser");
      if (uid) {
        try {
          const ref = collection(db, `users/${uid}/Formularios`);
          const snapshot = await getDocs(ref);

          const formsPromises = snapshot.docs.map(async (docSnapshot) => {
            const { idFormulario, feito } = docSnapshot.data();
            const testeRef = doc(db, `Testes/${idFormulario}`);
            const testeSnapshot = await getDoc(testeRef);

            let titulo = "Título não disponível";
            if (testeSnapshot.exists()) {
              const testeData = testeSnapshot.data();
              titulo = testeData.title || "Título não especificado";
            }

            return {
              idFormulario,
              feito,
              titulo,
            };
          });

          const formsData = await Promise.all(formsPromises);
          setForms(formsData);
        } catch (error) {
          console.error("Erro ao buscar formulários:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFormularios();
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View className="bg-blue_mid flex-1">
        <FilterCategory SelectedItem={(e) => {}} />

        <View className="flex-1 bg-blue_light rounded-tr-[20px] rounded-tl-[20px] relative">
          <Pressable
            onPress={() => setModal(true)}
            className="absolute bottom-4 right-4 w-16 h-16 bg-blue_fat justify-center items-center rounded-full"
          >
            <Foundation
              className="text-center"
              name="page-add"
              size={24}
              color="white"
            />
          </Pressable>
          <View
            style={{
              backgroundColor: "#94AAB6",
              width: "80%",
              marginHorizontal: "auto",
              top: -50,
              borderRadius: 30,
              paddingVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                textAlign: "justify",
                padding: 12,
                fontWeight: "500",
                letterSpacing: 0,
              }}
            >
              Por favor, lembre-se de que os testes de autoavaliação neste
              aplicativo são ferramentas de insight inicial e não substituem
              diagnósticos profissionais; para avaliações precisas, consulte um
              profissional de saúde mental qualificado.
            </Text>
          </View>
          <Text className="text-center font-semibold text-xl">
            Questionários de autoavaliação
          </Text>

          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <FlatList
              data={forms}
              keyExtractor={(item: any) => item.idFormulario}
              renderItem={({ item }: any) => (
                <Link href={`/questionario/${item.idFormulario}`}>
                <View className={"p-4 m-2 justify-center items-center bg-blue_light rounded-xl border-2 flex-row"}>
                  <View>
                  <Text className="text-md text-blue_mid font-semibold">
                    {item.titulo}
                  </Text>
                  <Text className="text-sm">
                    {item.feito ? "Feito" : "Não feito"}
                  </Text>
                    </View>
                  
                </View>
                </Link>
              )}
            />
          )}
        </View>

        <Modal
          visible={modal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            setModal(!modal);
          }}
        >
          <View className="justify-center items-center flex-1">
            <View className="w-92 p-4 rounded-sm bg-blue_mid relative pt-8">
              <Pressable
                className="absolute right-4"
                onPress={() => setModal(false)}
              >
                <Text className="text-2xl text-white">x</Text>
              </Pressable>
              <Text className="text-white text-xl font-semibold text-center">
                Codigo para vinculação
              </Text>
              <Text className="text-gray-100 text-sm text-center">
                Requisite ao seu profissional o envio do código gerado pela
                aplicação. Ao realizar o teste, você será associado
                automaticamente como seu paciente. Permitindo que ele veja o
                resultado dos seus testes.
              </Text>
              <View className="justify-center items-center">
                <TextInput
                  className="w-80 m-2 bg-gray-100 border-white rounded-md"
                  value={formCode}
                  onChangeText={(e) => setFormCode(e)}
                />
                <Pressable
                  onPress={() => {
                    sendForm();
                  }}
                  className="flex-row gap-8 justify-center bg-blue_light w-80 p-2 rounded-sm border-white"
                  disabled={loading}
                >
                  {!loading ? (
                    <Text>
                      Salvar formulário{" "}
                      <Feather name="send" size={18} color="black" />
                    </Text>
                  ) : (
                    <ActivityIndicator size={24} />
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}
