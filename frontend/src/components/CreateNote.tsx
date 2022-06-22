import React, { useState } from "react";
import { Button, Modal, TextArea, KeyboardAvoidingView, Text } from "native-base";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

type Props = {
  open: boolean;
  handleOpenNoteCreation: (state: boolean) => void;
};

const CreateNote = ({ open, handleOpenNoteCreation }: Props): JSX.Element => {
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
                mb={3}
                fontSize={18}
                h={200}
                borderColor={"gray.700"}
                color={"gray.200"}
                autoCompleteType={true}
                selectionColor={"gray.300"}
              />
              <Button w={"30%"} alignSelf="flex-end" borderRadius={"100%"}>
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
