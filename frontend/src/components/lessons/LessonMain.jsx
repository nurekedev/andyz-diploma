import { Box, Divider, Skeleton, useColorModeValue } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../requests/FetchData";
import { findAdjacentLessons } from "../../services/functions";
import useCourseStore from "../../store/CourseStore";
import { useEffect } from "react";
import {
  LessonComments,
  LessonContent,
  LessonHeader
} from "./LessonMainComponents";

function LessonMain() {
  const { id, lessonSlug } = useParams();
  const lessonDetailData = useFetchData("course/lessons", lessonSlug);
  const courseData = useFetchData("course", id);
  const { courseDetailData, setDefaultSectionIndex } = useCourseStore();

  useEffect(() => {
    if (courseDetailData) {
      const sectionIndex = courseDetailData.course.sections.findIndex(
        (section) =>
          section.lessons.some((lesson) => lesson.slug === lessonSlug)
      );
      setDefaultSectionIndex(sectionIndex);
    }
  }, [courseDetailData, lessonSlug, setDefaultSectionIndex]);

  const { previousLesson, nextLesson } = findAdjacentLessons(
    courseData,
    lessonSlug
  );

  const sortedContents = lessonDetailData
    ? lessonDetailData.lessons.contents.sort((a, b) => a.my_order - b.my_order)
    : [];

  return (
    <Box
      display={"flex"}
      w={"full"}
      p={5}
      justifyContent={"space-between"}
      bg={useColorModeValue("white", "gray.dark")}
    >
      <Box w={"full"}>
        {lessonDetailData ? (
          <>
            <LessonHeader
              lessonTitle={lessonDetailData.lessons.title}
              id={id}
              previousLesson={previousLesson}
              nextLesson={nextLesson}
            />
            <Divider mt={4} mb={2} />
            <LessonContent
              lessonDetailData={lessonDetailData}
              sortedContents={sortedContents}
            />
            <Divider mt={4} mb={2} />
            <LessonComments id={id} lessonSlug={lessonSlug} />
          </>
        ) : (
          <Skeleton height="100vh" />
        )}
      </Box>
    </Box>
  );
}

export default LessonMain;
