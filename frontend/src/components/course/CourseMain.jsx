import {
  Box,
  Button,
  Divider,
  Heading,
  Image,
  Badge,
  Text,
  VStack,
  useColorModeValue
} from "@chakra-ui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
export default function CourseMain({ courseDetailData }) {
  const firstLesson = courseDetailData?.course.sections[0]?.lessons[0].slug;
  console.log(firstLesson);
  return (
    <div>
      <Box>
        <VStack alignItems={"start"} mb={5}>
          <Heading fontSize={25}> {courseDetailData?.course.title}</Heading>
          <Text>
            <b>author: </b>
            {courseDetailData?.course.created_by.full_name}
          </Text>
        </VStack>
        <Image
          src={courseDetailData?.course.image}
          alt={courseDetailData?.course.title}
          maxW={"100%"}
          borderRadius={10}
          m={"20px 0"}
        />
        <Box
          display={"flex"}
          gap={10}
          flexDir={{
            base: "column",
            md: "row"
          }}
          justifyContent={"space-between"}
        >
          <Box>
            {courseDetailData?.course.categories.map((category, index) => (
              <Badge variant="solid" colorScheme="green" key={index} mr={2} p={1}>
                {category.title}
              </Badge>
            ))}
          </Box>
          <Link to={`/courses/${courseDetailData?.course.slug}/${firstLesson}`}>
            <Button
              w={"100%"}
              bg={useColorModeValue("gray.400", "blue")}
              color={useColorModeValue("blue", "white")}
            >
              Continue the course <FaArrowRightLong className="right" />
            </Button>
          </Link>
        </Box>
        <Divider mt={4} mb={2} />
        <Text as={"b"} fontSize={24}>
          What is this course about?
        </Text>
        <Text>{courseDetailData?.course.short_description}</Text>
        <Divider mt={4} mb={2} />
      </Box>
    </div>
  );
}
