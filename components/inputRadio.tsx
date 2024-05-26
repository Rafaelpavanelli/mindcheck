import { Pressable, Text, View } from "react-native";

type InputRadioProps = {
    onChange: (optionSelect:string)=>void;
    label:string;
    isSelected:boolean;
}
export function InputRadio({label,onChange,isSelected = false}:InputRadioProps){
    return(
        <View style={{justifyContent: 'center', alignItems: 'center',marginTop: 4}}>
            <Text>{label}</Text>
            <Pressable onPress={()=>onChange(label)}>
                <View style={{minHeight: 25, minWidth: 25,borderRadius: 100,borderColor: 'gray',borderWidth:2,backgroundColor: isSelected ? "#19b0b5":'transparent',padding: 2,}}>
                </View>
            </Pressable>
        </View>
    )
}