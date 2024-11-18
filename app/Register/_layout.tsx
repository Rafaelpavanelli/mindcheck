import { Stack } from "expo-router";

export default function RootRegister(){
  return(
    <Stack  screenOptions={{headerShown: false}}>
      <Stack.Screen name="RegisterPatient" />
      <Stack.Screen name="RegisterProfessional"/>
    </Stack>
  )
}