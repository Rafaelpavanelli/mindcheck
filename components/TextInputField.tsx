import React from "react";
import { View, Text, TextInput } from "react-native";

interface TextInputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder = "Digite aqui",
}) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ marginBottom: 5, fontSize: 16 }}>{label}</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          borderRadius: 5,
        }}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default TextInputField;
