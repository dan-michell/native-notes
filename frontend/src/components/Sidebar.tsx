import React, { useState } from "react";
import { View, Text, Box, Button, Icon } from "native-base";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { auth } from "../../firebase/firebase-config";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const Sidebar = (props: DrawerContentComponentProps) => {
  const [user, setUser] = useState<string | null>("");
  const { state, navigation } = props;

  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user.email);
    }
  });

  return (
    <View bg={"gray.900"} flex={1} justifyContent="space-between" alignItems={"center"}>
      <Box pt={16} px={4}>
        <Text fontSize={22} fontWeight="bold" color={"gray.200"} textAlign={"center"}>
          Welcome {user}!
        </Text>
      </Box>
      <Box w="100%" h="10%" alignItems={"center"}>
        <Button w="35%" onPress={handleLogout}>
          <Text color={"gray.200"} fontSize={16}>
            Logout?
          </Text>
        </Button>
      </Box>
    </View>
  );
};

export default Sidebar;
