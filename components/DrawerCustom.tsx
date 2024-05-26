import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Link, useRouter } from "expo-router";
import { Text, View,Image } from "react-native";

export default function DrawerContentCustom(props: any) {
  return (
    <View style={{ flex: 1,paddingVertical: 20,backgroundColor: "#3A6C8D",paddingBottom: 40}}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{
          backgroundColor: "#3A6C8D",
        }}
      >
        <View style={{paddingVertical: 20,paddingHorizontal: 50}}>
          <Text style={{fontSize: 24,textAlign:'center',borderBottomWidth: 1, borderBottomColor: 'gray',color: "white",padding:4}}>MindCheck</Text>
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View className="items-center flex-row justify-center gap-4">
      <Image source={{uri: "https://github.com/RafaelPavanelli.png"}} width={50} height={50} style={{borderRadius: 400}}/>
      <View className="w-1/2">
        <Link href={''} style={{borderBottomWidth: 1, borderColor: 'gray',paddingVertical: 4}}>
          Rafael Pavanelli
        </Link>
        <Link href={''} >
          Sair
        </Link>
      </View>
      </View>
    </View>
  );
}
