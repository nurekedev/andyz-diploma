import { Box, useColorModeValue } from "@chakra-ui/react";
import LessonMain from "./LessonMain"
import LessonComment from "./LessonComment"

const LessonPage = () => {
  return (
    <Box
      maxW={1200}
      margin={"auto"}
      p={10}
      borderRadius={10}
      bg={useColorModeValue("white", "gray.dark")}
    >
      <LessonMain />
      <LessonComment />
    </Box>
  );
}

export default LessonPage