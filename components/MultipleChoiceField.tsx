// Exemplo de MultipleChoiceField
import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

interface MultipleChoiceFieldProps {
  options: string[];
  onAddOption: () => void;
  onUpdateOption: (index: number, text: string) => void;
}

const MultipleChoiceField: React.FC<MultipleChoiceFieldProps> = ({ options, onAddOption, onUpdateOption }) => {
  return (
    <View>
      {options.map((option, index) => (
        <View key={index}>
          <TouchableOpacity>
            <Text>{option}</Text>
          </TouchableOpacity>
          <TextInput
            value={option}
            onChangeText={(text) => onUpdateOption(index, text)}
          />
        </View>
      ))}
      <TouchableOpacity onPress={onAddOption}>
        <Text>Adicionar Opção</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MultipleChoiceField;
