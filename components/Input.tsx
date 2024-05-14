import { TextInput,TextInputProps, View, ViewProps } from "react-native";


function Input({ children}: ViewProps) {
  return <View >{children}</View>;
}
function Field({...rest}:TextInputProps) {
  return <TextInput  {...rest}/>;
}



Input.Field = Field;

export { Input };

