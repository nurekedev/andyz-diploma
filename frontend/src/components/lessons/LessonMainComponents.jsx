import { Box, Heading, Image, Text, VStack } from "@chakra-ui/react";
import Comment from "../../pages/comment/Comment";
import NavigationButtons from "../features/NavigationButtons";

function LessonHeader({ lessonTitle, id, previousLesson, nextLesson }) {
  return (
    <VStack alignItems={"start"} mb={5} w={"full"}>
      <Heading fontSize={25}>{lessonTitle}</Heading>
      <NavigationButtons
        id={id}
        previousLesson={previousLesson}
        nextLesson={nextLesson}
      />
    </VStack>
  );
}


function LessonContent({ lessonDetailData, sortedContents }) {
  return (
    <Box>
      <Text as={"b"} fontSize={24}>
        What is this course about?
      </Text>
      <Box>
        {lessonDetailData?.lessons.yt_id ? (
          <iframe
            src={`https://www.youtube.com/embed/${lessonDetailData?.lessons.yt_id}`}
            width="100%"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
          ></iframe>
        ) : null}
      </Box>
      {sortedContents.map((content) => (
        <div key={content.id}>
          <h3>{content.text}</h3>
          {content.photo ? <Image src={content.photo} /> : null}
        </div>
      ))}
    </Box>
  );
}

function LessonComments({ id, lessonSlug }) {
  return (
    <Box>
      <Heading>Comments</Heading>
      <Comment id={id} lessonSlug={`${lessonSlug}`} />
    </Box>
  );
}

export { LessonHeader, LessonContent, LessonComments}