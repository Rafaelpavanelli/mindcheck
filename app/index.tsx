import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Image } from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import * as yup from "yup";
import { useState } from "react";
import { Link } from "expo-router";
import { useAuth } from "@/hooks/authContext";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type Login = {
  email: string;
  password: string;
};

const loginSchema = yup.object({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().required("Senha é necessária"),
});

export default function Login() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Login>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(true);
  const { signIn } = useAuth();

  const onSubmit = async (data: Login) => {
    try {
      const result:any = await signIn(data);
      
    } catch (error: any) {
      console.error("Erro ao fazer login:", error); // Log de erro
      // Aqui, você pode usar setError para definir um erro global
      setError("root", { type: "validate", message: error.message || "Erro desconhecido" });
    }
  };

  return (
    <View className="bg-blue_light flex-1 justify-center items-center flex-col gap-4">
      <Text className="text-5xl font-bold text-blue_mid">MindCheck</Text>
      <Image
        source={require("@/assets/images/logo.png")}
        className="w-full h-60"
      />
      <View className="gap-8 w-72">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
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
                value={value}
                onChangeText={onChange}
                accessibilityLabel="Email"
              />
            </View>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <View className="flex-row py-2 items-center w-72 gap-4 border-b-[1px] border-blue_mid ">
              <AntDesign
                name="key"
                size={24}
                color="gray"
                className="opacity-40"
              />
              <TextInput
                placeholder="Senha"
                className="w-4/6 opacity-40 text-xl"
                secureTextEntry={showPassword}
                value={value}
                onChangeText={onChange}
                accessibilityLabel="Senha"
              />
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <Feather
                    name="eye"
                    size={24}
                    color="gray"
                    className="opacity-40"
                  />
                ) : (
                  <Feather
                    name="eye-off"
                    size={24}
                    color="gray"
                    className="opacity-40"
                  />
                )}
              </TouchableOpacity>
            </View>
          )}
        />

        {errors.email ? (
          <Text className="text-red-500">{errors.email.message}</Text>
        ) : errors.password ? (
          <Text className="text-red-500">{errors.password.message}</Text>
        ) : errors.root ? (
          <Text className="text-red-500">{errors.root.message}</Text> // Mudou aqui para destacar o erro
        ) : (
          ""
        )}
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <View className="w-72 border-blue_mid border-[1px] rounded-full h-16 justify-center items-center ">
          <Text>Login</Text>
        </View>
      </TouchableOpacity>
      <View className="h-20 flex-col justify-between opacity-45">
        <Text>Esqueci a senha</Text>
        <Text>
          Não tem conta? <Link href={"/Register"}>Cadastre-se</Link>
        </Text>
      </View>
    </View>
  );
}
