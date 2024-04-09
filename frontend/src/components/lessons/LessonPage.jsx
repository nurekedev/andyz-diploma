import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Button,
  useDisclosure
} from "@chakra-ui/react";
import LessonMain from "./LessonMain";
import LessonComment from "./LessonComment";
import LessonList from "./LessonList";
import { IoClose } from "react-icons/io5";
const LessonPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      margin={"auto"}
      p={10}
      borderRadius={10}
      bg={useColorModeValue("white", "gray.dark")}
    >
      <Box
        display={{
          base: "flex",
          md: "none"
        }}
        justifyContent={"center"}
      >
        <button onClick={onOpen} className="bottom-button">
          Open the Lesson List
        </button>
        <Drawer onClose={onClose} isOpen={isOpen} placement="bottom">
          <DrawerOverlay />
          <DrawerContent pb={20}>
            <DrawerHeader borderBottomWidth="1px" display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
              Lesson List{" "}
              <Button onClick={onClose}>
                <IoClose />
              </Button>
            </DrawerHeader>
            <DrawerBody display={"flex"} flexDir={"column"} gap={5} p={0}>
              <LessonList />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>

      <LessonMain />
      <LessonComment />
    </Box>
  );
};

export default LessonPage;
