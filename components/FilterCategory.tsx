type CategoryList = {
  category: string;
};
type CategoryProps = {
  SelectedItem: (selectedOption: string) => void;
};
const category: CategoryList[] = [
    { category: "Ansiedade" },
    { category: "Depressão" },
    { category: "Estresse" },
    { category: "Borderline" },
  ];
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
export function FilterCategory({ SelectedItem }: CategoryProps) {
    const[selected,setSelected] =useState("")
    function handleSelect(item:string){
        setSelected(item)
        SelectedItem(item)
    }
  return <View style={{marginVertical: 20,marginBottom: 80}}>
    <FlatList 
    data={category}
    horizontal
    contentContainerStyle={{gap:8,justifyContent:'center',alignItems: 'center',width:'100%'}}
    renderItem={({item,index})=>(
        <Pressable style={{borderBottomWidth:item.category === selected ? 1 : 0.5, borderColor: 'white',paddingBottom: 4}} key={index} onPress={()=>handleSelect(item.category)}>
            <Text  style={{color: 'white',fontWeight:item.category === selected ? "500": '100' }}>{item.category}</Text>
        </Pressable>
    )}
    />
  </View>;
}
