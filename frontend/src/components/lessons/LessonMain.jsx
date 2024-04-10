import {
  Box,
  Divider,
  Heading,
  Text,
  VStack
} from "@chakra-ui/react";
import LessonList from "./LessonList";
import { useParams } from "react-router-dom";
import { useDetailLessonData } from "../../requests/LessonDetail";

function LessonMain() {
  const { lessonSlug } = useParams();
  const lessonDetailData = useDetailLessonData(lessonSlug);
  return (
    <Box display={"flex"} margin={"auto"}>
      <Box>
        <VStack alignItems={"start"} mb={5}>
          <Heading fontSize={25}> {lessonDetailData?.lessons.title}</Heading>
        </VStack>

        <Box
          display={"flex"}
          gap={10}
          flexDir={{
            base: "column",
            md: "row"
          }}
          justifyContent={"space-between"}
        ></Box>
        <Divider mt={4} mb={2} />
        <Text as={"b"} fontSize={24}>
          What is this course about?
        </Text>
        <Text>{lessonDetailData?.lessons.short_description}</Text>
        <Divider mt={4} mb={2} />
      </Box>
      <Divider orientation="vertical" height={400} m={"0 30px"} display={{
        base: "none",
        md: "block"
      }} />
      <Box display={{
        base: "none",
        md: "block"
      }}>
        <LessonList />
      </Box>
    </Box>
  );
}

export default LessonMain;