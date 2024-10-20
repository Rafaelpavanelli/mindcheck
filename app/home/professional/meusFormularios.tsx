import { Link, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function MeusFormularios(){
  const router = useRouter()
  return(
    <View className="flex-1 bg-blue_mid ">
      <View className="flex-1 bg-blue_light rounded-tl-[40px] rounded-tr-[40px] mt-4">
        <Link asChild href={'/home/professional/criarFormulario'}>
        <Pressable >
    <Text>Formulario</Text>
       </Pressable>
        </Link>
     
      </View>
    </View>
  )
}