import React, { useState } from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center } from "native-base";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { auth } from "../../firebase/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackParamList";

type signInProps = StackNavigationProp<RootStackParamList, "SignIn">;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigation = useNavigation<signInProps>();

  const SignInUser = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Index");
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage: string = error.message;
        console.log(errorMessage);
        setResponseMessage(errorMessage);
      }
    }
  };

  return (
    <Center w="100%" flex={1} bg={"gray.800"}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <Box safeArea p="2" w="80%">
          <Heading size="xl" fontWeight="semibold" color="gray.200">
            Minimal Notes
          </Heading>
          <Heading mt="1" color="gray.400" size="sm" fontWeight={"medium"}>
            Sign in to continue.
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input value={email} onChangeText={(text) => setEmail(text)} color={"gray.200"} fontSize={"lg"} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                color={"gray.200"}
                fontSize={"lg"}
              />
              <Link
                _text={{
                  fontSize: "xs",
                  color: "gray.400",
                }}
                alignSelf="flex-end"
                mt="2"
              >
                Forgot Password?
              </Link>
            </FormControl>
            <Button mt="2" onPressOut={SignInUser}>
              <Text color={"gray.200"} fontSize={"md"}>
                Sign In
              </Text>
            </Button>
            <HStack mt="2" justifyContent="center" alignItems={"center"}>
              <Text fontSize="md" color="gray.400">
                I'm a new user,{" "}
              </Text>
              <Text
                color="gray.300"
                fontWeight="medium"
                fontSize="sm"
                underline={true}
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              >
                Sign Up
              </Text>
            </HStack>
          </VStack>
        </Box>
      </TouchableWithoutFeedback>
    </Center>
  );
};

export default SignIn;
