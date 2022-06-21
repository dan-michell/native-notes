import React from "react";
import { Checkbox, Box, Text } from "native-base";

type Props = {
  content: string;
  date: string;
};

const Note = ({ content, date }: Props): JSX.Element => {
  return (
    <Box
      bg={"rgba(52,52,52, 0.9)"}
      w={"90%"}
      mt={3}
      rounded={"2xl"}
      flexDirection={"row"}
      alignItems={"center"}
      alignSelf={"center"}
      p={3}
    >
      <Box w={"80%"}>
        <Text color={"gray.200"} fontSize={16}>
          {content}
        </Text>
        <Text fontSize={14} italic color={"gray.400"}>
          Created: {date}
        </Text>
      </Box>
      <Box w={"20%"} alignItems={"center"}>
        <Checkbox value="test" accessibilityLabel="This is a dummy checkbox" />
      </Box>
    </Box>
  );
};

export default Note;
