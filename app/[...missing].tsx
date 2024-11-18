import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Missing(){
  const {missing} = useLocalSearchParams();
  return(
    <View style={{flex: 1,justifyContent:'center',alignItems: 'center'}}>
      <Text>{missing}</Text>
    </View>
  )
}