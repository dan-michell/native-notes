import { SwipeListView } from "react-native-swipe-list-view";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Box, Text, Checkbox, Pressable, Icon } from "native-base";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Networking } from "../../networking";
import UpdateNote from "../components/UpdateNote";
import SortDropdown from "./SortDropdown";

type Props = {
  notes: any[];
  getNotes: () => Promise<any>;
};

const NoteList = ({ notes, getNotes }: Props) => {
  const [noteInfo, setNoteInfo] = useState<any>([]);
  const [currentNoteId, setCurrentNoteId] = useState("");
  const [currentNoteContent, setCurrentNoteContent] = useState("");
  const [open, setOpen] = useState(false);
  const networking = new Networking();

  useEffect(() => {
    populateNotes();
  }, [notes]);

  const populateNotes = () => {
    if (notes != null) {
      const noteData = notes.map((note, i) => {
        return { key: i, content: note.note, date: note.createdAt, id: note.id, favorite: note.favorite };
      });
      setNoteInfo(noteData);
    }
  };

  const deleteNote = async (noteId: string) => {
    await networking.deleteNote(noteId);
    getNotes();
  };

  const updateNote = async (updatedNoteContent: string) => {
    await networking.updateNote(currentNoteId, updatedNoteContent);
    getNotes();
  };

  const handleOpenNoteUpdate = (state: boolean): void => {
    setOpen(state);
  };

  const handleFavoriteUpdate = async (noteId: string, favorite: boolean) => {
    await networking.updateFavorite(noteId, favorite);
    getNotes();
  };

  const convertDateToReadableString = (date: number): string => {
    const createdAt = new Date(date);
    const readableCreatedAt = createdAt.toLocaleString();
    return readableCreatedAt;
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const renderItem = (data: any, rowMap: any) => (
    <Box
      bg={"gray.700"}
      w={"90%"}
      mb={3}
      rounded={"2xl"}
      flexDirection={"row"}
      alignItems={"center"}
      alignSelf={"center"}
      p={3}
    >
      <Box w={"85%"}>
        <Text color={"gray.200"} fontSize={16}>
          {data.item.content}
        </Text>
        <Text fontSize={14} italic color={"gray.400"}>
          Created: {convertDateToReadableString(data.item.date)}
        </Text>
      </Box>
      <Box w={"15%"} alignItems={"center"}>
        <Icon color="gray.400" as={MaterialCommunityIcons} name="dots-horizontal" size="xl" />
      </Box>
    </Box>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View
      flex={1}
      w={"84%"}
      maxHeight={"100%"}
      alignSelf={"flex-end"}
      mb={3}
      mr={"6%"}
      justifyContent={"flex-end"}
      alignItems={"center"}
      flexDirection={"row"}
      bg={"gray.900"}
      roundedRight={"2xl"}
    >
      <Pressable
        w={50}
        h={"100%"}
        bg={"gray.900"}
        alignItems={"center"}
        justifyContent={"center"}
        onPress={() => {
          handleFavoriteUpdate(data.item.id, !data.item.favorite);
        }}
      >
        <Icon
          color={data.item.favorite ? "amber.500" : "gray.300"}
          as={AntDesign}
          name={data.item.favorite ? "star" : "staro"}
          size="lg"
        />
      </Pressable>
      <Pressable
        w={50}
        h={"100%"}
        bg={"gray.900"}
        alignItems={"center"}
        justifyContent={"center"}
        onPress={() => {
          setCurrentNoteId(data.item.id);
          setCurrentNoteContent(data.item.content);
          setOpen(true);
          closeRow(rowMap, data.item.key);
        }}
      >
        <Icon color="gray.300" as={AntDesign} name="edit" size="lg" />
      </Pressable>
      <Pressable
        w={50}
        h={"100%"}
        bg={"gray.900"}
        alignItems={"center"}
        justifyContent={"center"}
        roundedRight={"2xl"}
        onPress={() => {
          deleteNote(data.item.id);
          closeRow(rowMap, data.item.key);
        }}
      >
        <Icon color="gray.300" as={AntDesign} name="delete" size="lg" />
      </Pressable>
    </View>
  );

  return (
    <>
      <View flex={1}>
        <SwipeListView
          data={noteInfo}
          disableRightSwipe={true}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          recalculateHiddenLayout={true}
          rightOpenValue={-155}
          stopRightSwipe={-200}
        />
      </View>
      <UpdateNote
        open={open}
        handleOpenNoteUpdate={handleOpenNoteUpdate}
        updateNote={updateNote}
        currentNoteContent={currentNoteContent}
      />
    </>
  );
};

export default NoteList;
