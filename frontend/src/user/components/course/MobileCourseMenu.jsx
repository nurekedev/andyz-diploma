import { IoClose } from "react-icons/io5";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Button,
  useDisclosure,
  useColorModeValue,
  Image,
  VStack,
  Heading
} from "@chakra-ui/react";
import { Link, NavLink, useParams } from "react-router-dom";
import useFetchData from "../../../services/api";
import { FaArrowRightLong } from "react-icons/fa6";

const MobileCourseMenu = () => {
  const { id } = useParams();
  const courseDetailData = useFetchData("course", id);
  const firstLesson = courseDetailData?.course.sections[0]?.lessons[0].slug;

  const buttonBg = useColorModeValue("gray.600", "white");
  const buttonColor = useColorModeValue("white", "gray.dark");
  const buttonHoverBg = useColorModeValue("gray.800", "gray.100");
  const buttonHoverColor = useColorModeValue("white", "gray.dark");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Box
        pos={"fixed"}
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
            <DrawerHeader
              borderBottomWidth="1px"
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              Lesson List{" "}
              <Button onClick={onClose}>
                <IoClose />
              </Button>
            </DrawerHeader>
            <DrawerBody display={"flex"} flexDir={"column"} gap={5} p={0}>
              {courseDetailData ? (
                <>
                  <Image
                    src={courseDetailData.course.image}
                    alt={courseDetailData.course.title}
                    borderRadius={10}
                    boxSize={100}
                    objectFit={"cover"}
                  />
                  <VStack alignItems={"start"} mb={2}>
                    <Heading fontSize={24}>
                      {courseDetailData.course.title}
                    </Heading>
                  </VStack>

                  <Box
                    display={"flex"}
                    gap={2}
                    flexDir={"column"}
                    justifyContent={"space-between"}
                  >
                    <Link
                      to={`app/courses/${courseDetailData.course.slug}/${firstLesson}`}
                    >
                      <Button
                        bg={buttonBg}
                        color={buttonColor}
                        _hover={{
                          bg: buttonHoverBg,
                          color: buttonHoverColor
                        }}
                        fontSize={14}
                        w={"full"}
                      >
                        Continue the course{" "}
                        <FaArrowRightLong className="right" />
                      </Button>
                    </Link>
                  </Box>
                  <Box mt={4} display={"flex"} flexDir={"column"}>
                    <NavLink to={`/app/courses/${id}/`} className="side-link">
                      Description
                    </NavLink>
                    <NavLink
                      to={`/app/courses/${id}/content`}
                      className="side-link"
                    >
                      Content
                    </NavLink>
                    <NavLink to={`app/courses/${id}/review`} className="side-link">
                      Reviews
                    </NavLink>
                    <NavLink
                      to={`/app/courses/${id}/comment`}
                      className="side-link"
                    >
                      Comments
                    </NavLink>
                  </Box>
                </>
              ) : (
                <Box>Loading...</Box>
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </div>
  );
};

export default MobileCourseMenu;
