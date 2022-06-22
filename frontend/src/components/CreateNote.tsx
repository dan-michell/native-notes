import React, { useState } from "react";
import { Button, Modal, TextArea, KeyboardAvoidingView, Text } from "native-base";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

type Props = {
  open: boolean;
  handleOpenNoteCreation: (state: boolean) => void;
  createNote: (note: string, createdAt: string) => void;
};

const CreateNote = ({ open, handleOpenNoteCreation, createNote }: Props): JSX.Element => {
  const [noteContent, setNoteContent] = useState("");

  const getCurrentDate = (): string => {
    return new Date().toLocaleString();
  };

  return (
    <Modal isOpen={open} onClose={() => handleOpenNoteCreation(false)} safeAreaTop={true}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <KeyboardAvoidingView behavior="position" w={"100%"} pb={3}>
          <Modal.Content minWidth="90%" bg="gray.800" alignSelf={"center"} borderColor={"gray.600"} borderWidth={1}>
            <Modal.Header bg={"gray.700"} borderWidth={0} borderBottomColor={"gray.800"}>
              <Modal.CloseButton mt={0.5} />
              <Text color={"gray.200"} fontSize={18} fontWeight="semibold">
                Add Note
              </Text>
            </Modal.Header>
            <Modal.Body>
              <TextArea
                placeholder="Type here..."
                value={noteContent}
                mb={3}
                fontSize={18}
                h={200}
                borderColor={"gray.700"}
                color={"gray.200"}
                autoCompleteType={true}
                selectionColor={"gray.300"}
                onChangeText={setNoteContent}
              />
              <Button
                w={"30%"}
                alignSelf="flex-end"
                borderRadius={"100%"}
                onPress={() => {
                  createNote(noteContent, getCurrentDate());
                  setNoteContent("");
                  handleOpenNoteCreation(false);
                }}
              >
                <Text fontSize={17} color={"gray.200"}>
                  Save
                </Text>
              </Button>
            </Modal.Body>
          </Modal.Content>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CreateNote;
