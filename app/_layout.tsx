 import FontAwesome from '@expo/vector-icons/FontAwesome';
 import { useFonts } from 'expo-font';
 import { Stack, useRouter } from 'expo-router';
 import * as SplashScreen from 'expo-splash-screen';
 import { useEffect } from 'react';
 import 'react-native-reanimated';
 import Icon from '@expo/vector-icons/Ionicons';

 import '@/styles/global.css'
import { TouchableOpacity } from 'react-native';
 export {
   ErrorBoundary,
 } from 'expo-router';

 SplashScreen.preventAutoHideAsync();

 export default function RootLayout() {
   const [loaded, error] = useFonts({
     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
     ...FontAwesome.font,
   });

   useEffect(() => {
     if (error) throw error;
   }, [error]);

   useEffect(() => {
     if (loaded) {
       SplashScreen.hideAsync();
     }
   }, [loaded]);

   if (!loaded) {
     return null;
   }

   return <RootLayoutNav />;
 }

 function RootLayoutNav() {
  const navigation = useRouter();
   return (
       <Stack initialRouteName="index" screenOptions={{
         headerShown: false
       }}>
         <Stack.Screen name='index' />
         <Stack.Screen name='signout' options={{
           animation:'slide_from_right'
         }}/>
         <Stack.Screen name='FirstEnter' options={{
           animation:'slide_from_right'
         }}/>
          <Stack.Screen name='(home)' options={{
           animation:'slide_from_right'
         }}/>
          <Stack.Screen name='Questions/index' options={{
           animation:'slide_from_right',
           headerShown: true,
           headerTransparent: true,
           headerTitle: '',
           headerBackTitleVisible: false,
           headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.back()}
              style={{ marginLeft: 10 }} 
            >
              <Icon name="arrow-back" size={30} color="#000" />
            </TouchableOpacity>
          ),
         }}/>
       </Stack>
   );
 }
