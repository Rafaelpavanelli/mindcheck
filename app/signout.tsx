import { AntDesign, Feather, Fontisto } from "@expo/vector-icons";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as yup from 'yup';
import { Link } from "expo-router";

type FormDataProps = {
    name: string,
    email:string,
    password: string,
    confirm_password: string
    }
    
    const profileSchema = yup.object({
        name: yup
        .string()
        .required("Campo nome é obrigatório"),
        email: yup
        .string()
        .email("Email invalido")
        .required("Campo email é obrigatório"),
        password: yup
        .string()
        .required("Campo senha obrigatório")
        .min(6,"Minimo de 6 digitos é obrigatório"),
        confirm_password: yup
        .string()
        .required("Campo de confirmar senha é obrigatório")
    })
export default function Signout() {
  const [showPassword, setShowPassword] = useState(true);
  return (
    <View className="w-full h-full bg-blue_light flex-1 justify-center items-center">
      <Text className="text-5xl font-bold text-blue_mid">MindCheck</Text>
      <View className="gap-8 w-72 mt-20">
        <View className="flex-row items-center gap-4 border-b-[1px] border-blue_mid py-2">
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
        <View className="flex-row items-center gap-4 border-b-[1px] border-blue_mid py-2">
          <FontAwesome6
            name="users-viewfinder"
            size={24}
            color="gray"
            className="opacity-40"
          />
          <TextInput
            placeholder="Nome completo"
            className="w-full opacity-40 text-xl"
            keyboardType="name-phone-pad"
          />
        </View>
        <View className="flex-row items-center gap-4 border-b-[1px] border-blue_mid py-2">
          <FontAwesome6
            name="users-viewfinder"
            size={24}
            color="gray"
            className="opacity-40"
          />
          <TextInput
            placeholder="Nome completo"
            className="w-full opacity-40 text-xl"
            keyboardType="name-phone-pad"
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
            {!showPassword ? (
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
        <View className="flex-row py-2 items-center  w-72 gap-4 border-b-[1px] border-blue_mid ">
          <AntDesign name="key" size={24} color="gray" className="opacity-40" />
          <TextInput
            placeholder="Confirmar senha"
            className="w-4/6 opacity-40  text-xl"
            secureTextEntry={showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            {!showPassword ? (
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
        <View className="flex-row w-62">
          <BouncyCheckbox
            size={20}
            fillColor="green"
            unFillColor="transparent"
            textStyle={{ fontSize: 15 }}
            onPress={(isChecked: boolean) => {}}
          />
          <Text>
          Concordo com os termos de serviço e politica de privacidade
          </Text>
        </View>
          <Link href={'FirstEnter'} asChild>
        <TouchableOpacity>
        <View className="w-72 border-blue_mid  border-[1px]  rounded-full  h-16 justify-center items-center ">
          <Text>Proximo</Text>
        </View>
      </TouchableOpacity>
      
      </Link>
      </View>
    </View>
  );
}
