import "react-native-gesture-handler";
import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { SSRProvider } from "@react-aria/ssr";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./src/RootStackParamList";
import SignUp from "./src/screens/SignUp";
import SignIn from "./src/screens/SignIn";
import Index from "./src/Index";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const theme = extendTheme({
    components: {
      Popover: {
        baseStyle: {
          bg: "gray.900",
        },
      },
    },
  });

  return (
    <SSRProvider>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <RootStack.Navigator initialRouteName="Index" screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="Index" component={Index} />
            <RootStack.Screen name="SignIn" component={SignIn} />
            <RootStack.Screen name="SignUp" component={SignUp} />
          </RootStack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </SSRProvider>
  );
};

export default App;
