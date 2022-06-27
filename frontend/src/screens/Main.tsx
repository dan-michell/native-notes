import { Divider, Box, Text, Fab, Icon, View } from "native-base";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import CreateNote from "../components/CreateNote";
import NoteList from "../components/NoteList";
import { Ionicons } from "@expo/vector-icons";
import { Networking } from "../../networking";
import { auth } from "../../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import SortDropdown from "../components/SortDropdown";

const Main = ({ navigation }: any) => {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState<any[]>([]);
  const [userId, setUserId] = useState("");
  const [sort, setSort] = useState("createdAt desc");
  const networking = new Networking();

  useEffect(() => {
    getNotes();
  }, [userId, sort]);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserId(user.uid);
    }
  });

  const getNotes = async (): Promise<any> => {
    const notes = await networking.getNotes(userId, sort);
    setNotes(notes);
  };

  const createNote = async (note: string, createdAt: number): Promise<any> => {
    await networking.createNote(note, createdAt, userId);
    getNotes();
  };

  const handleOpenNoteCreation = (state: boolean): void => {
    setOpen(state);
  };

  const handleSort = (sort: string): void => {
    setSort(sort);
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
        <Divider bg={"gray.600"} shadow={8} w={"90%"} alignSelf={"center"} />
        <SortDropdown handleSort={handleSort} sort={sort} />
        <NoteList notes={notes} getNotes={getNotes} />
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
