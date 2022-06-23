import { SwipeListView } from "react-native-swipe-list-view";
import { TouchableOpacity, StyleSheet } from "react-native";
import { View, Box, Text, Checkbox, Pressable, Icon } from "native-base";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Networking } from "../../networking";

type Props = {
  notes: any[];
  getNotes: () => Promise<any>;
};

const NoteList = ({ notes, getNotes }: Props) => {
  const [noteInfo, setNoteInfo] = useState<any>([]);
  const networking = new Networking();

  useEffect(() => {
    populateNotes();
  }, [notes]);

  const populateNotes = () => {
    if (notes != null) {
      const noteData = notes.map((note, i) => {
        return { key: i, content: note.note, date: note.createdAt, id: note.id };
      });
      setNoteInfo(noteData);
    }
  };

  const deleteNote = async (noteId: string) => {
    await networking.deleteNote(noteId);
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
      mt={3}
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
      maxHeight={69}
      alignSelf={"flex-end"}
      mt={3}
      mr={"6%"}
      justifyContent={"flex-end"}
      alignItems={"center"}
      flexDirection={"row"}
      bg={"gray.900"}
      roundedRight={"2xl"}
    >
      <Pressable w={50} h={"100%"} bg={"gray.900"} alignItems={"center"} justifyContent={"center"}>
        <Icon color="gray.300" as={AntDesign} name="staro" size="lg" />
      </Pressable>
      <Pressable w={50} h={"100%"} bg={"gray.900"} alignItems={"center"} justifyContent={"center"}>
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
    <View flex={1}>
      <SwipeListView
        data={noteInfo}
        disableRightSwipe={true}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-155}
        stopRightSwipe={-200}
      />
    </View>
  );
};

export default NoteList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 40,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
  },
  backRightBtn: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 2,
    position: "absolute",
    height: "100%",
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
});
