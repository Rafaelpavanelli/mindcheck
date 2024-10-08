import { Link, useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function SelectSigin() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-blue_light justify-between py-60 items-center">
      <Text className="text-5xl font-bold text-blue_mid">MindCheck</Text>
      <Image
        source={require("@/assets/images/logo.png")}
        className="w-full h-60"
      />
      <View className="gap-4 mt-10">
        <TouchableOpacity onPress={() => router.navigate("/Register/RegisterPatient")}>
          <Text className="w-72 py-2 border-blue_mid border-2 text-center rounded-full text-xl color-blue_mid">
            Paciente
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.navigate("/Register/RegisterProfessional")}>
          <Text className="w-72 py-2 border-blue_mid border-2 text-center rounded-full text-xl color-blue_mid">
            Profissional
          </Text>
        </TouchableOpacity>
      </View>
      <Link href={"/Login"} asChild>
        <Text className="pt-10 color-blue_mid">Entrar na minha conta</Text>
      </Link>
    </View>
  );
}
