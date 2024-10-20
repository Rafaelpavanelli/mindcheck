import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { DrawerHeader } from "@/components/drawerheader";
import Feather from "@expo/vector-icons/Feather";
import { useUser } from "@/hooks/useUser";
import { useMemo } from "react";
import {  Text, View } from "react-native";
import { Stack } from "expo-router";
export default function Layout() {
  const {user} = useUser();
  const defineLayout = useMemo(()=>{
    //@ts-ignore
    if(user && 'isValid' in user && !!user.isValid){
      console.log('profissional')
      return (
       <Stack initialRouteName="professional" screenOptions={{
        headerShown: false
       }}/>
      )
    }else if(user){
      console.log('paciente')
      return (
       <Stack initialRouteName="patient" screenOptions={{
        headerShown: false
       }}/>
       
      )
    }else{
      return(
        <View className="flex-1 justify-center items-center bg-blue_mid">
          <Text>Verificando credenciais</Text>
        </View>
      )
    }
  },[user])
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
    {defineLayout}
    </GestureHandlerRootView>
  );
}
