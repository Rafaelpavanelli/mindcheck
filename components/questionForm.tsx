import { Question, QuestionFormProps } from "@/interfaces/Questions.interface";
import {
  View,
  Text,
  Button,
  Alert,
  Pressable,
  ToastAndroid,
} from "react-native";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { InputRadio } from "./inputRadio";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

type FormData = {
  [key: string]: string;
};

export function QuestionForm({
  onSubmit,
  questions,
  isLast,
  prevPage,
}: QuestionFormProps) {
  const schema = Yup.object().shape(
    questions.reduce((acc, question) => {
      acc[question.id] = Yup.string().required("Este campo é obrigatório");
      return acc;
    }, {} as any)
  );

  const { control, handleSubmit, formState } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const options = ["4", "3", "2", "1", "0"];

  const handleFormSubmit = async (data: FormData) => {
    const isAnyQuestionUnanswered = questions.some(
      (question) => !data[question.id]
    );
    if (isAnyQuestionUnanswered) {
      ToastAndroid.show(
        "Todos os campos precisam estar preenchidos!",
        ToastAndroid.SHORT
      );
      return;
    }

    onSubmit(data);
  };
  return (
    <View
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        gap: 30,
        paddingBottom: 80,
      }}
    >
      {questions.map((question) => (
        <View key={question.id} style={{ width: "80%" }}>
          <Text
            style={{
              color: formState.errors[question.id] ? "red" : "black",
              textAlign: "left",
            }}
          >
            {question.question}
          </Text>
          <Controller
            control={control}
            name={String(question.id)}
            render={({ field: { onChange, onBlur, value } }) => (
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 8,
                  gap: 8,
                  justifyContent: "space-between",
                }}
              >
                {options.map((option, index) => (
                  <InputRadio
                    key={index}
                    label={option}
                    isSelected={value === option}
                    onChange={() => onChange(option)}
                  />
                ))}
              </View>
            )}
          />
        </View>
      ))}
      <View
        style={{
          width: "100%",
          justifyContent: "space-between",
          flexDirection: "row",
          position: "absolute",
          bottom: 10,
        }}
      >
        <Pressable onPress={prevPage}>
          <SimpleLineIcons name="arrow-left" size={24} color="#3A6C8D" />
        </Pressable>
        {isLast ? (
          <Pressable onPress={handleSubmit(handleFormSubmit)}>
            <SimpleLineIcons name="check" size={30} color="#3A6C8D" />
          </Pressable>
        ) : (
          <Pressable onPress={handleSubmit(handleFormSubmit)}>
            <SimpleLineIcons name="arrow-right" size={24} color="#3A6C8D" />
          </Pressable>
        )}
      </View>
    </View>
  );
}
