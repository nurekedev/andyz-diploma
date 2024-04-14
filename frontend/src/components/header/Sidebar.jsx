import {
  Box,
  Button,
  Heading,
  Image,
  VStack,
  useColorModeValue
} from "@chakra-ui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink, Link,useParams } from "react-router-dom";
import { useDetailCourseData } from "../../requests/CourseDetail";

const Sidebar = () => {
  const { id } = useParams();
  const courseDetailData = useDetailCourseData(id);
  const firstLesson = courseDetailData?.course.sections[0]?.lessons[0].slug;

  return (
    <Box
      minW={300}
      height={400}
      bg={useColorModeValue("white", "gray.dark")}
      p={5}
      borderRadius={10}
    >
      <Image
        src={courseDetailData?.course.image}
        alt={courseDetailData?.course.title}
        borderRadius={10}
        boxSize={100}
        objectFit={"cover"}
      />
      <VStack alignItems={"start"} mb={2}>
        <Heading fontSize={24}> {courseDetailData?.course.title}</Heading>
      </VStack>

      <Box
        display={"flex"}
        gap={2}
        flexDir={"column"}
        justifyContent={"space-between"}
      >
        <Link to={`/courses/${courseDetailData?.course.slug}/${firstLesson}`}>
          <Button
            bg={useColorModeValue("gray.600", "white")}
            color={useColorModeValue("white", "gray.dark")}
            _hover={{
              bg: useColorModeValue("gray.800", "gray.100"),
              color: useColorModeValue("white", "gray.dark")
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
        <NavLink className="side-link">Comments</NavLink>
      </Box>
    </Box>
  );
};

export default Sidebar;
