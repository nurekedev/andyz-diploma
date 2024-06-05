import {
  Box,
  Button,
  Heading,
  Image,
  VStack,
  useColorModeValue
} from "@chakra-ui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink, Link, useParams } from "react-router-dom";
import useFetchData from "../../../services/api";

const Sidebar = () => {
  const { id } = useParams();
  const courseDetailData = useFetchData("course", id);
  const firstLesson = courseDetailData?.course.sections[0]?.lessons[0].slug;

  const bgColor = useColorModeValue("white", "gray.dark");
  const buttonBg = useColorModeValue("gray.600", "white");
  const buttonColor = useColorModeValue("white", "gray.dark");
  const buttonHoverBg = useColorModeValue("gray.800", "gray.100");
  const buttonHoverColor = useColorModeValue("white", "gray.dark");

  return (
    <Box
      w={"full"}
      minW={300}
      bg={bgColor}
      position={"sticky"}
      p={5}
      borderRadius={10}
    >
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
            <Heading fontSize={24}>{courseDetailData.course.title}</Heading>
          </VStack>

          <Box
            display={"flex"}
            gap={2}
            flexDir={"column"}
            justifyContent={"space-between"}
          >
            <Link
              to={`/courses/${courseDetailData.course.slug}/${firstLesson}`}
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
                Continue the course <FaArrowRightLong className="right" />
              </Button>
            </Link>
          </Box>
          <Box mt={4} display={"flex"} flexDir={"column"}>
            <NavLink to={`/courses/${id}/`} className="side-link">
              Description
            </NavLink>
            <NavLink to={`/courses/${id}/content`} className="side-link">
              Content
            </NavLink>
            <NavLink to={`/courses/${id}/review`} className="side-link">
              Reviews
            </NavLink>
            <NavLink to={`/courses/${id}/comment`} className="side-link">
              Comments
            </NavLink>
          </Box>
        </>
      ) : (
        <Box>Loading...</Box>
      )}
    </Box>
  );
};

export default Sidebar;
