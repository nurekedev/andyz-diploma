/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Image,
  Progress,
  Stack,
  Tag,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { useCourseData } from "../requests/MyCourses";
import { fetchData } from "../requests/DataFetcher";

const Courses = () => {
  const courseData = useCourseData();
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    async function fetchProgressData() {
      if (courseData && courseData.length > 0) {
        const progressData = await Promise.all(
          courseData.map((course) => fetchData(course.slug))
        );
        setProgressData(progressData);
      }
    }
    fetchProgressData();
  }, [courseData]);

  return (
    <Flex display={"flex"} gap={5} m={"auto"} flexWrap={"wrap"} w={{
      base: "100%",
      xl: "1220px"
    }}>
      {courseData &&
        courseData.length > 0 &&
        courseData.map((course, index) => (
          <Box
            key={index}
            boxShadow="md"
            borderRadius={15}
            bg={useColorModeValue("white", "gray.dark")}
            minWidth={300}
            w={{ base: "100%",lg: "49%", xl: "600px" }}
            display="flex"
          >
            <Image
              borderRadius={15}
              m={3}
              src="../../public/zuck-avatar.png"
              alt={course.title}
              boxSize={{
                base: "100px",
                md: "140px",
                lg: "160px",
                xl: "180px"
              }}
            />
            <Box
              p={5}
              w="full"
              display="flex"
              flexDir="column"
              justifyContent="space-between"
            >
              <Box>
                <Heading fontSize={{
                  base: 15,
                  md: 20,
                  lg: 25,
                }}>{course.title}</Heading>
                <Box
                  display="flex"
                  gap={{
                    base: 1,
                    md: 5,
                  }}
                  flexDir={"row"}
                >
                  <Text fontSize={{
                    base: 12,
                    md: 15,
                  }}>Created by: </Text>
                  <Text fontSize={{
                    base: 12,
                    md: 15,
                  }}> {course.created_by.full_name}</Text>
                </Box>
              </Box>
              <Stack>
                <Text>Your progress</Text>
                <Progress
                  value={progressData[index]?.progress}
                  max={100}
                  size="md"
                />
              </Stack>
              {/* <p>
              {course.short_description.length > 150
                ? course.short_description.substring(0, 150) + "..."
                : course.short_description}
            </p> */}
              <Box
                mt={2}
                display={{
                base: "none",
                md: "flex",
              }} gap={2} >
                {course.categories.map((category, index) => (
                  <Tag key={index}>{category.title}</Tag>
                ))}
              </Box>
            </Box>
          </Box>
        ))}
    </Flex>
  );
};

export default Courses;
