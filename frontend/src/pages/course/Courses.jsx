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
import { Link } from "react-router-dom";
import NotCoursePage from "./NotCoursePage";
import { useFetchData } from "../../requests/FetchData";
import axiosInstance from "../../services/axiosInstance";

const Courses = () => {
  const courseData = useFetchData("course", "my-courses/");
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    async function fetchProgressData() {
      if (courseData && courseData.length > 0) {
        const progressDataPromises = courseData.map(async (course) => {
          const response = await axiosInstance.get(
            `/progress/get-enrollment-courses/${course.slug}`
          );
          return { slug: course.slug, progress: response.data.score };
        });
        const progressData = await Promise.all(progressDataPromises);
        setProgressData(progressData);
      }
    }
    fetchProgressData();
  }, [courseData]);

  const getCourseProgress = (slug) => {
    const progress = progressData.find((item) => item.slug === slug);
    return progress ? progress.progress : 0;
  };


  return (
    <Box
      display={"flex"}
      flexWrap={"wrap"}
      gap={5}
      m={{
        base: "0 10px",
        md: "0 50px",
        xl: "0 100px",
        "2xl": "auto"
      }}
      justifyContent={{
        base: "center",
        md: "flex-start",
      }}
      mt={10}
      maxWidth={1200}
    >
      {courseData && courseData.length > 0 ? (
        courseData.map((course, index) => (
          <Link key={index} to={`/courses/${course.slug}`}>
            <Box
              boxShadow="md"
              borderRadius={15}
              bg={useColorModeValue("white", "gray.dark")}
              w={{ base: "340px", xl: "360px" }}
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
                  base: "320px",
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
                    value={getCourseProgress(course.slug)}
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
        ))
      ) : (
        <NotCoursePage />
      )}
    </Box>
  );
};

export default Courses;
