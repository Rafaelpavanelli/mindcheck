import { Pressable, Text, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
export function DrawerHeaderQuestionario({navigation,title='',subtitle=''}:any){
  return(
      <View style={{height: 150,justifyContent: 'flex-end',paddingHorizontal: 40,backgroundColor: '#3A6C8D',paddingBottom: 20,alignItems: 'stretch'}}>
        <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
        <Pressable className="" onPress={()=>navigation.openDrawer()}>
          <MaterialIcons name="menu" size={40} color="black" />
          </Pressable>
          <View>

          <Text className="text-4xl font-bold">{title}</Text>
          <Text className="text-center text-xl font-semibold" style={{color: '#c2c2c2',textAlign: 'center'}}>{subtitle}</Text>
          </View>
          <Text></Text>
        </View>
          {/* <InputSearch />  */}
      </View>
  )
}