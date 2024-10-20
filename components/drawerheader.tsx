import { Pressable, Text, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { InputSearch } from "./inputSearch";

export function DrawerHeader({navigation}:any){
    return(
        <View style={{height: 120,justifyContent: 'flex-end',paddingHorizontal: 40,backgroundColor: '#3A6C8D',paddingBottom: 20}}>
            <Pressable className="" onPress={()=>navigation.openDrawer()}>
            <MaterialIcons name="menu" size={40} color="black" />
            </Pressable>
            {/* <InputSearch />  */}
        </View>
    )
}