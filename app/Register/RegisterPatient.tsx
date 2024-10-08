import { AntDesign, Feather, Fontisto } from "@expo/vector-icons";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/hooks/authContext";

// Definindo o tipo de dados do formulário
type FormDataProps = {
  fullname: string;
  email: string;
  password: string;
  confirm_password: string;
  cpf:string
};

// Definindo o esquema de validação com Yup
const profileSchema = yup.object({
  fullname: yup.string().required("Campo nome é obrigatório"),
  email: yup
    .string()
    .email("Email inválido")
    .required("Campo email é obrigatório"),
  password: yup
    .string()
    .required("Campo senha obrigatório")
    .min(6, "Mínimo de 6 dígitos é obrigatório"),
  confirm_password: yup
    .string()
    .required("Campo de confirmar senha é obrigatório")
    .oneOf([yup.ref("password")], "As senhas devem ser iguais"),
  cpf: yup
    .string()
    .required("Campo CPF é obrigatório")
    .matches(
      /^(?!000\.000\.000-00)(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/,
      "CPF inválido. O formato deve ser '000.000.000-00' ou apenas números."
    ),
});

export default function RegisterPatient() {
  const [showPassword, setShowPassword] = useState(true);
  const [checked, setChecked] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(profileSchema),
  });
  const errorMessage = 
  errors.email?.message ||
  errors.fullname?.message ||
  errors.password?.message ||
  errors.confirm_password?.message ||
  errors.cpf?.message ||
  "";
  const {signUp} = useAuth()
  const onSubmit = async (data: FormDataProps) => {
    try {
      await signUp(data);
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
    }
  };

  return (
    <View className="w-full h-full bg-blue_light flex-1 justify-center items-center">
      <Text className="text-5xl font-bold text-blue_mid">MindCheck</Text>
      <View className="gap-8 w-72 mt-20">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <View className={"flex-row items-center gap-4 border-b-[1px] py-2"+`${errors.email?.message? 'border-red-500':'border-blue_mid'}`}>
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
              />
            </View>
          )}
        />

        <Controller
          control={control}
          name="fullname"
          render={({ field: { onChange, value } }) => (
            <View className={"flex-row items-center gap-4 border-b-[1px] py-2"+`${errors.fullname?.message? 'border-red-500':'border-blue_mid'}`}>
              <FontAwesome6
                name="users-viewfinder"
                size={24}
                color="gray"
                className="opacity-40"
              />
              <TextInput
                placeholder="Nome completo"
                className="w-full opacity-40 text-xl"
                value={value}
                onChangeText={onChange}
              />
            </View>
          )}
        />
 <Controller
          control={control}
          name="cpf"
          render={({ field: { onChange, value } }) => (
            <View
              className={`flex-row items-center gap-4 border-b-[1px] border-blue_mid py-2 ${
                errors.cpf?.message
                  ? "border-red-500"
                  : "border-blue_mid"
              }`}
            >
              <AntDesign
                name="idcard"
                size={24}
                color="gray"
                className="opacity-40"
              />
              <TextInput
                placeholder="CPF"
                className="w-full opacity-40 text-xl"
                keyboardType="default"
                value={value}
                onChangeText={onChange}
              />
            </View>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <View className={"flex-row py-2 items-center w-72 gap-4 border-b-[1px] "+`${errors.password?.message? 'border-red-500':'border-blue_mid'}`}>
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
              />
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <Feather
                    name="eye-off"
                    size={24}
                    color="gray"
                    className=" opacity-40"
                  />
                ) : (
                  <Feather
                    name="eye"
                    size={24}
                    color="gray"
                    className=" opacity-40"
                  />
                )}
              </TouchableOpacity>
            </View>
          )}
        />

        <Controller
          control={control}
          name="confirm_password"
          render={({ field: { onChange, value } }) => (
            <View className={"flex-row py-2 items-center w-72 gap-4 border-b-[1px] "+`${errors.confirm_password?.message? 'border-red-500':'border-blue_mid'}`}>
              <AntDesign
                name="key"
                size={24}
                color="gray"
                className="opacity-40"
              />
              <TextInput
                placeholder="Confirmar senha"
                className="w-4/6 opacity-40 text-xl"
                secureTextEntry={showPassword}
                value={value}
                onChangeText={onChange}
              />
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <Feather
                    name="eye-off"
                    size={24}
                    color="gray"
                    className=" opacity-40"
                  />
                ) : (
                  <Feather
                    name="eye"
                    size={24}
                    color="gray"
                    className=" opacity-40"
                  />
                )}
              </TouchableOpacity>
            </View>
          )}
        />
      <Text>{errorMessage}</Text>
        <View className="flex-row w-62">
          <BouncyCheckbox
            size={20}
            fillColor="green"
            unFillColor="transparent"
            textStyle={{ fontSize: 15 }}
            onPress={(isChecked: boolean) => {
              setChecked(isChecked);
            }}
          />
          <Text>
            Concordo com os termos de serviço e política de privacidade
          </Text>
        </View>
            
        <TouchableOpacity disabled={!checked} onPress={handleSubmit(onSubmit)}>
          <View
            className={`w-72   rounded-full h-16 justify-center items-center ${
              !checked
                ? "border-red-500 border-[1px]"
                : "border-blue_mid border-[1px]"
            }`}
          >
            <Text className={`${!checked ? "text-red-500" : "text-blue_mid"}`}>
              Próximo
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
