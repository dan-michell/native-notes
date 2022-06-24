import React, { useState, useEffect } from "react";
import { Button, Modal, TextArea, KeyboardAvoidingView, Text } from "native-base";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

type Props = {
  open: boolean;
  currentNoteContent: string;
  handleOpenNoteUpdate: (state: boolean) => void;
  updateNote: (updatedNoteContent: string) => void;
};

const UpdateNote = ({ open, handleOpenNoteUpdate, updateNote, currentNoteContent }: Props): JSX.Element => {
  const [noteContent, setNoteContent] = useState<string>("");

  useEffect(() => {
    setNoteContent(currentNoteContent);
  }, [currentNoteContent]);

  return (
    <Modal isOpen={open} onClose={() => handleOpenNoteUpdate(false)} safeAreaTop={true}>
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
                Update Note
              </Text>
            </Modal.Header>
            <Modal.Body>
              <TextArea
                placeholder="Type here..."
                value={noteContent}
                mb={3}
                fontSize={18}
                h={200}
                borderWidth={"1"}
                borderColor={"gray.700"}
                color={"gray.200"}
                autoCompleteType={true}
                selectionColor={"gray.300"}
                onChangeText={(noteContent) => {
                  setNoteContent(noteContent);
                }}
                _focus={{
                  bg: "gray.800",
                  borderColor: "primary.600",
                }}
              />
              <Button
                w={"30%"}
                alignSelf="flex-end"
                borderRadius={"100%"}
                onPress={() => {
                  updateNote(noteContent);
                  handleOpenNoteUpdate(false);
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

export default UpdateNote;
