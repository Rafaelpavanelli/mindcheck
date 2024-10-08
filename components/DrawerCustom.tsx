import { useAuth } from "@/hooks/authContext";
import { useUser } from "@/hooks/useUser";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Text, View, Image, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function DrawerContentCustom(props: any) {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 20,
        backgroundColor: "#3A6C8D",
        paddingBottom: 40,
      }}
    >
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{
          backgroundColor: "#3A6C8D",
        }}
      >
        <View style={{ paddingVertical: 20, paddingHorizontal: 50 }}>
          <Text
            style={{
              fontSize: 24,
              textAlign: "center",
              borderBottomWidth: 1,
              borderBottomColor: "gray",
              color: "white",
              padding: 4,
            }}
          >
            MindCheck
          </Text>
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {!user ? (
        <ActivityIndicator size={30} color={"#161666"}/>
      ) : (
        <View className="items-center flex-row justify-center gap-4">
          <Image
            source={{ uri: "https://github.com/RafaelPavanelli.png" }}
            width={50}
            height={50}
            style={{ borderRadius: 400 }}
          />
          <View className="w-1/2">
            <Text>{user && user.fullname}</Text>
            <TouchableOpacity onPress={async () => await signOut()}>
              <Text>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
