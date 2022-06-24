import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Main from "./screens/Main";
import About from "./screens/About";
import { auth } from "../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParamList";
import Sidebar from "./components/Sidebar";

const Drawer = createDrawerNavigator();

type indexProps = StackNavigationProp<RootStackParamList, "Index">;

const Index = () => {
  const navigation = useNavigation<indexProps>();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigation.replace("SignIn");
    }
  });

  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={{
        title: "Notes",
        headerTitleStyle: {
          color: "white",
        },
        headerShown: false,
        drawerType: "back",
        overlayColor: "#00000000",
        drawerPosition: "left",
        swipeEdgeWidth: 100,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "#27272a",
          borderBottomWidth: 1,
          borderBottomColor: "white",
        },
      }}
    >
      <Drawer.Screen name="Main" component={Main} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
};

export default Index;
