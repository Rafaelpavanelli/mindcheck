import {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  ReactNode,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { userProvider as UserProvider } from "@/context/userContext";
import "@/styles/global.css";
import "react-native-reanimated";
import { CreateUserWithEmailAndPassword } from "@/firebase/functions/Users/Create";
import { UserInterface } from "@/interfaces/User.interface";
import { CreateProfissionalWithEmailAndPassword } from "@/firebase/functions/Users/CreateProfissional";
import { ProfissionalInterface } from "@/interfaces/Profissional.interface";
import { SigIn } from "@/firebase/functions/Users/Login";

// Definição das interfaces para o estado e ações do reducer
interface AuthState {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null;
}

type AuthAction =
  | { type: "RESTORE_TOKEN"; token: string }
  | { type: "SIGN_IN"; token: string }
  | { type: "SIGN_OUT" };

interface AuthContextProps {
  signIn: (data: any) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (data: UserInterface) => Promise<void>;
  signUpProfissional: (data: ProfissionalInterface) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
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
  const[user,setUser]=useState()
  const initialState: AuthState = {
    isLoading: true,
    isSignout: false,
    userToken: null,
  };

  const [state, dispatch] = useReducer(
    (prevState: AuthState, action: AuthAction): AuthState => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        default:
          return prevState;
      }
    },
    initialState
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken: string | null = null;
      try {
        userToken = await AsyncStorage.getItem("@keyUser");
        console.log(userToken)
        if (userToken){
          dispatch({ type: "RESTORE_TOKEN", token: userToken });
          router.navigate('/home')
        } else {
          dispatch({ type: "SIGN_OUT" });
        }
      } catch (e) {
        console.log(e);
      }
    };

    bootstrapAsync();
  }, []);

  // Memoize para evitar recriações desnecessárias
  const authContext = useMemo(
    () => ({
      signIn: async (data: any) => {
        const user = await SigIn(data);
        if(user.user.uid){
          dispatch({ type: "SIGN_IN", token: user.user.uid});
          router.navigate('/home')
        }
      },
      signOut: async () => {
       try{
         await AsyncStorage.removeItem("@keyUser");
        dispatch({ type: "SIGN_OUT" })
        router.navigate('/')
       } catch(e){
        console.log(e)
       }

      },
      signUp: async (data: UserInterface) => {
        try {
          const createUser = await CreateUserWithEmailAndPassword(data);
          if (createUser) {
            dispatch({ type: "SIGN_IN", token: createUser.uid });
            router.push('/FirstEntry/Pessoa')
          } else {
            //Tratar esse erro
          }
        } catch (e) {
          //Tratar esse erro
          console.log(e);
        }
      },
      signUpProfissional: async (data: ProfissionalInterface) => {
        try {
          const createUser = await CreateProfissionalWithEmailAndPassword(data);
          if (createUser) {
            dispatch({ type: "SIGN_IN", token: createUser.uid });
            router.push('/FirstEntry/Profissional')
          } else {
            //Tratar esse erro
          }
        } catch (e) {
          //Tratar esse erro
          console.log(e);
        }
      },
      getUser: ()=>{
        return user;
      }
    }),
    []
  );
  useEffect(()=>{
    state.userToken === null? router.replace('/'):''
  },[state.userToken])
  return (
    <AuthContext.Provider value={authContext}>
      <UserProvider>
        <Stack
          initialRouteName="index"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen
            name="Register"
            options={{
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="FirstEntry/[firstEntry]"
            options={{
              animation: "slide_from_right",
            }}
          />
              <Stack.Screen
              name="home"
              options={{
                animation: "slide_from_right",
              }}
            />
        </Stack>
        </UserProvider>
    </AuthContext.Provider>
  );
}
