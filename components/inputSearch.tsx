import { useState } from "react";
import { TextInputProps, View,TextInput, Pressable } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


export function InputSearch(props:TextInputProps){
    const[show,setShow]=useState(false)
    return(
        <View className="flex-row">
            <View className={"border-4 bg-gray-500 border-black"}>
            <TextInput {...props} />
            </View>
            <Pressable onPress={()=>setShow(true)}>
            <FontAwesome5 name="search" size={24} color="black" />
            </Pressable>
        </View>
    )
}