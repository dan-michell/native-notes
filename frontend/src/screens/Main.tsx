import { Divider, Box, Text, Fab, Icon, ScrollView, View } from "native-base";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import Note from "../components/Note";
import CreateNote from "../components/CreateNote";
import { Ionicons } from "@expo/vector-icons";
import { Networking } from "../../networking";
import { auth } from "../../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const Main = ({ navigation }: any) => {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState<any[]>([]);
  const [userId, setUserId] = useState("");
  const networking = new Networking();

  useEffect(() => {
    getNotes();
  }, [userId]);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserId(user.uid);
    }
  });

  const getNotes = async (): Promise<any> => {
    const notes = await networking.getNotes(userId);
    setNotes(notes);
  };

  const createNote = async (note: string, createdAt: string): Promise<any> => {
    const noteCreationResponseMessage = await networking.createNote(note, createdAt, userId);
    console.log(noteCreationResponseMessage);
    getNotes();
  };

  const populateNotes = () => {
    if (notes != null) {
      return notes.map((note, i) => {
        return <Note key={i} content={note.note} date={note.createdAt} />;
      });
    }
  };

  const handleOpenNoteCreation = (state: boolean): void => {
    setOpen(state);
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
      <CreateNote open={open} handleOpenNoteCreation={handleOpenNoteCreation} createNote={createNote} />
    </>
  );
};

export default Main;
