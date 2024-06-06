import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Image,
  Progress,
  Text,
  VStack
} from "@chakra-ui/react";
import axios from "axios";

const OtherEnrollments = ({ enrollments, patientId }) => {
  const [progressData, setProgressData] = useState({});
  const figure =
    "https://www.focusphysiotherapy.com/wp-content/uploads/stroke-rehab-methods-2.jpeg";

  useEffect(() => {
    const fetchProgress = async () => {
      const progressPromises = enrollments.map((enrollment) =>
        axios
          .get(
            `/api/v1/progress/get-patient-enrollment-data/${enrollment.slug}/${patientId}`
          )
          .then((response) => ({
            courseId: enrollment.id,
            progress: response.data.progress
          }))
      );

      const progressResults = await Promise.all(progressPromises);
      const progressMap = progressResults.reduce(
        (acc, { courseId, progress }) => {
          acc[courseId] = progress;
          return acc;
        },
        {}
      );

      setProgressData(progressMap);
    };

    fetchProgress();
  }, [enrollments, patientId]);

  return (
    <Box mt={10}>
      {enrollments
        .slice()
        .reverse()
        .map((enrollment) => {
          const progress = progressData[enrollment.id] || 0;
          return (
            <Box
              display={"flex"}
              flexDir={{ base: "column", md: "row" }}
              key={enrollment.id + 12}
              mb={5}
              gap={5}
            >
              <Image
                src={figure}
                w={300}
                height={180}
                objectFit={"cover"}
                borderRadius={10}
              />
              <Box
                display={"flex"}
                flexDir={"column"}
                justifyContent={"space-between"}
                height={160}
                w={"80%"}
                gap={5}
              >
                <VStack alignItems={"start"} gap={0}>
                  <Heading fontSize={14}>course name</Heading>
                  <Text fontSize={24}>{enrollment.title}</Text>
                </VStack>
                <VStack alignItems={"start"} gap={0}>
                  <Heading fontSize={14}>author</Heading>
                  <Text fontSize={24}>{enrollment.created_by.full_name}</Text>
                </VStack>
                <Box display={"flex"} flexDir={"column"} gap={2}>
                  <Heading fontSize={14}>User progress</Heading>
                  <Progress value={progress} />
                </Box>
              </Box>
            </Box>
          );
        })}
    </Box>
  );
};

export default OtherEnrollments;
