import { Button, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavigationButtons = ({ id, previousLesson, nextLesson }) => (
  <HStack justifyContent={"space-between"} w={"full"} mt={5}>
    <Button
      as={Link}
      to={previousLesson ? `/courses/${id}/${previousLesson}` : "#"}
      isDisabled={!previousLesson}
    >
      Previous Lesson
    </Button>
    <Button
      as={Link}
      to={nextLesson ? `/courses/${id}/${nextLesson}` : "#"}
      isDisabled={!nextLesson}
    >
      Next Lesson
    </Button>
  </HStack>
);

export default NavigationButtons;
