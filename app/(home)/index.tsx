import { FilterCategory } from "@/components/FilterCategory";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Home() {
  return (
    <View className="bg-blue_mid  flex-1 ">
      <FilterCategory SelectedItem={(e) => {}} />
      <View className="flex-1 bg-blue_light  rounded-tr-[20px] rounded-tl-[20px] ">
        <View style={{backgroundColor: '#94AAB6',width: '80%',marginHorizontal:'auto',top: -50,borderRadius: 30,paddingVertical: 10}}>
          <Text style={{fontSize: 10,textAlign: 'justify',padding: 12,fontWeight: '500',letterSpacing: 0,}}>
            Por favor, lembre-se de que os testes de autoavaliação neste
            aplicativo são ferramentas de insight inicial e não substituem
            diagnósticos profissionais; para avaliações precisas, consulte um
            profissional de saúde mental qualificado.
          </Text>
        </View>
        <Text className="text-center font-semibold text-xl">Questionários de autoavaliação</Text>
        <Link href={'Questions'}>
          Teste
        </Link>
      </View> 
    </View>
  );
}
