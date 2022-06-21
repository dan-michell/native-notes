import { Divider, Box, Text, Fab, Icon, ScrollView, View, Popover, FormControl, Input, Button } from "native-base";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Note from "../components/Note";
import CreateNote from "../components/CreateNote";
import { Ionicons } from "@expo/vector-icons";

const Main = ({ navigation }: any) => {
  const [open, setOpen] = useState(false);
  const initialFocusRef = React.useRef(null);

  const handleOpenNoteCreation = (state: boolean): void => {
    setOpen(state);
  };

  const populateNotes = () => {
    const noteArray = [];
    for (let i = 0; i < 20; i++) {
      noteArray.push(
        <Note
          key={i}
          content={"This is a note you go straight into writing it, don't worry about titles."}
          date={"23/06/22"}
        />
      );
    }
    return noteArray;
  };

  return (
    <>
      <Box bg="gray.800" flex={1}>
        <View
          alignSelf={"center"}
          pt={16}
          w={"80%"}
          flexDirection={"row"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Text fontSize={30} fontWeight="bold" color={"gray.200"}>
            Notes
          </Text>
          <Icon
            as={Ionicons}
            name="ios-menu-outline"
            mt={2.5}
            size={9}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        </View>
        <Divider mt={2} bg={"gray.600"} shadow={8} w={"90%"} alignSelf={"center"} />
        <ScrollView>{populateNotes()}</ScrollView>
      </Box>
      <Fab
        onPress={() => setOpen(true)}
        renderInPortal={false}
        shadow={4}
        placement="bottom-right"
        size="16"
        icon={<Icon color="white" as={AntDesign} name="plus" size="lg" />}
      />
      <CreateNote open={open} handleOpenNoteCreation={handleOpenNoteCreation} />
      {/* <Popover
        initialFocusRef={initialFocusRef}
        placement="top left"
        trigger={(triggerProps) => {
          return (
            <Fab
              {...triggerProps}
              renderInPortal={false}
              shadow={4}
              placement="bottom-right"
              size="16"
              icon={<Icon color="white" as={AntDesign} name="plus" size="lg" />}
            />
          );
        }}
      >
        <Popover.Content w="84%" bg={"gray.800"} height="64" mr={20}>
          <Popover.CloseButton />
          <Popover.Header>Add Note</Popover.Header>
          <Popover.Content>
            <TextInput></TextInput>
          </Popover.Content>
          <Popover.Footer>
            <Button>Add</Button>
          </Popover.Footer>
        </Popover.Content>
      </Popover> */}
    </>
  );
};

export default Main;
