/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Image,
  Progress,
  Stack,
  Tag,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { fetchData } from "../../requests/DataFetcher";
import { Link } from "react-router-dom";
import NotCoursePage from "./NotCoursePage";
import { useFetchData } from "../../requests/FetchData";

const Courses = () => {
  const courseData = useFetchData("course", "my-courses/");
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
    <Box
      display={"flex"}
      gap={5}
      m={{
        base: "0 10px",
        md: "0 50px",
        xl: "0 100px",
        "2xl": "auto"
      }}
      justifyContent={"center"}
      mt={10}
      maxWidth={1200}
    >
      {courseData &&
        courseData.length > 0 ?
        courseData.map((course, index) => (
          <Link key={index} to={`/courses/${course.slug}`}>
            <Box
              boxShadow="md"
              borderRadius={15}
              bg={useColorModeValue("white", "gray.dark")}
              w={{ base: "300px", xl: "360px" }}
              m={"auto"}
            >
              <Image
                borderRadius={15}
                src={course?.image}
                alt={course.title}
                transform={"translateY(10px)"}
                m={"auto"}
                objectFit={"cover"}
                height={200}
                w={{
                  base: "280px",
                  xl: "340px"
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
                  <Heading
                    fontSize={{
                      base: 15,
                      lg: 25
                    }}
                  >
                    {course.title}
                  </Heading>
                  <Box
                    display="flex"
                    gap={{
                      base: 1,
                      md: 5
                    }}
                    flexDir={"row"}
                  >
                    <Text
                      fontSize={{
                        base: 12,
                        xl: 15
                      }}
                    >
                      Created by:{" "}
                    </Text>
                    <Text
                      fontSize={{
                        base: 12,
                        xl: 15
                      }}
                    >
                      {" "}
                      {course.created_by.full_name}
                    </Text>
                  </Box>
                </Box>
                <Stack gap={0} mt={2} mb={2}>
                  <Text>Your progress</Text>
                  <Progress
                    value={progressData[index]?.progress}
                    max={100}
                    size="md"
                  />
                </Stack>

                <Box
                  mt={2}
                  display={{
                    base: "none",
                    md: "flex"
                  }}
                  gap={2}
                >
                  {course.categories.map((category, index) => (
                    <Tag key={index}>{category.title}</Tag>
                  ))}
                </Box>
              </Box>
            </Box>
          </Link>
        )) : <NotCoursePage />}
    </Box>
  );
};

export default Courses;
