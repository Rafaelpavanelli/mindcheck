import { FilterCategory } from "@/components/FilterCategory";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Home() {
  return (
    <View className="bg-blue_mid  flex-1 ">
      <FilterCategory SelectedItem={(e) => {}} />
      <View className="flex-1 bg-blue_light  rounded-tr-[20px] rounded-tl-[20px] ">
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
              fontSize: 14,
              textAlign: "justify",
              padding: 12,
              fontWeight: "500",
              letterSpacing: 0,
            }}
          >
            Este aplicativo oferece ferramentas para apoiar suas avaliações
            clínicas. Lembre-se de que os testes fornecem uma visão preliminar e
            não substituem uma avaliação completa. Utilize os resultados como um
            complemento à sua prática profissional.
          </Text>
        </View>
        <Text className="text-center font-semibold text-xl">
          Questionários de autoavaliação
        </Text>
        {/* @ts-ignore  O erro está com bug em tipagem de rota*/}
        <Link href={"Questions"}>Teste</Link>
      </View>
    </View>
  );
}
