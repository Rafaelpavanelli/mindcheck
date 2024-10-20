import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { DrawerHeader } from "@/components/drawerheader";
import Feather from "@expo/vector-icons/Feather";
import CustomDrawerContent from "@/components/DrawerCustom";
import { DrawerHeaderQuestionario } from "@/components/DrawerHeaderQuestionario";
export default function Layout() {

  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <Drawer
        screenOptions={{
          drawerActiveBackgroundColor: "#203b4d",
          drawerActiveTintColor: "#fff",
          drawerItemStyle: { borderRadius: 4 },
        }}
        drawerContent={CustomDrawerContent}
      >
        <Drawer.Screen
          name="index"
          options={{
            header: ({ navigation }) => (
              <DrawerHeader navigation={navigation} />
            ),
            title: "Menu",
            drawerIcon: ({ size, color }) => (
              <Feather name="user" size={size} color={color} />
            ),
          }}
        />
       
       <Drawer.Screen
        name="meusFormularios"
        options={{
          header: ({ navigation}) => (
            <DrawerHeaderQuestionario navigation={navigation} title='Mindcheck' subtitle='Meus questionarios' />
          ),
          title: "Formulario",
          drawerIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }
      
      }
      />
         <Drawer.Screen
        name="criarFormulario"
      
        options={{
          drawerItemStyle:{
            display:'none'
          },
          header:  ({ navigation}) => (
            <DrawerHeaderQuestionario navigation={navigation} title='Mindcheck' subtitle='criar formulário' />
          ),
        }}
      />
      </Drawer>
    </GestureHandlerRootView>
  );
}
