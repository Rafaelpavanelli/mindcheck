import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerHeader } from "@/components/drawerheader";
import Feather from "@expo/vector-icons/Feather";
import CustomDrawerContent from "@/components/DrawerCustom";
import { DrawerHeaderQuestionario } from "@/components/DrawerHeaderQuestionario";
import { Pressable, Text, View } from "react-native";
export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerActiveBackgroundColor: "#203b4d",
          drawerActiveTintColor: "#fff",
          drawerItemStyle: { borderRadius: 4 },
        }}
        drawerContent={CustomDrawerContent}
      >
        <Drawer.Screen
          name="meusFormularios"
          options={{
            header: ({ navigation }) => (
              <DrawerHeaderQuestionario
                navigation={navigation}
                title="PsyConnection"
                subtitle="Meus questionarios"
              />
            ),
            title: "Formulario",
            drawerIcon: ({ size, color }) => (
              <Feather name="user" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="questionario/[teste]"
          options={({ navigation }) => ({
            drawerItemStyle: {
              display: "none",
            },
            headerShown: false,
          })}
        />

        <Drawer.Screen
          name="criarFormulario"
          options={{
            drawerItemStyle: {
              display: "none",
            },
            header: ({ navigation }) => (
              <DrawerHeaderQuestionario
                navigation={navigation}
                title="PsyConnection"
                subtitle="criar formulário"
              />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
