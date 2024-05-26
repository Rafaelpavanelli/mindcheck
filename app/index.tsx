 import {
   Button,
   Text,
   TextInput,
   Touchable,
   TouchableOpacity,
   View,
 } from "react-native";
 import { Image } from "react-native";
 import Fontisto from "@expo/vector-icons/Fontisto";
 import AntDesign from "@expo/vector-icons/AntDesign";
 import Feather from "@expo/vector-icons/Feather";

 import { useState } from "react";
 import { Link, useRouter } from "expo-router";

 export default function Login() {
   const [showPassword, setShowPassword] = useState(true);
   const router = useRouter()
   return (
     <View className="bg-blue_light flex-1 justify-center items-center flex-col gap-4">
       <Text className="text-5xl font-bold text-blue_mid">MindCheck</Text>
       <Image
         source={require("@/assets/images/logo.png")}
         className="w-full h-60"
       />
       <View className="gap-8 w-72">
         <View className="flex-row py-2 items-center gap-4 border-b-[1px] border-blue_mid ">
           <Fontisto
             name="email"
             size={24}
             color="gray"
             className="opacity-40"
           />
           <TextInput
             placeholder="E-mail"
             className="w-full opacity-40 text-xl"
             keyboardType="email-address"
           />
         </View>
         <View className="flex-row py-2 items-center  w-72 gap-4 border-b-[1px] border-blue_mid ">
           <AntDesign name="key" size={24} color="gray" className="opacity-40" />
           <TextInput
             placeholder="Senha"
             className="w-4/6 opacity-40  text-xl"
             secureTextEntry={showPassword}
           />
           <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
             {showPassword ? (
               <Feather
                 name="eye"
                 size={24}
                 color="gray"
                 className=" opacity-40"
               />
             ) : (
               <Feather
                 name="eye-off"
                 size={24}
                 color="gray"
                 className=" opacity-40"
               />
             )}
           </TouchableOpacity>
         </View>
       </View>
       <TouchableOpacity onPress={()=>router.push('(home)')}>
         <View className="w-72 border-blue_mid  border-[1px]  rounded-full  h-16 justify-center items-center ">
           <Text>Login</Text>
         </View>
       </TouchableOpacity>
       <View className="h-20 flex-col justify-between opacity-45">
         <Text>
             Esqueci a senha
         </Text>
         <Text>
             Não tem conta? <Link href={'signout'}>Cadastre-se</Link>
         </Text>
       </View>
     </View>
   );
 }
