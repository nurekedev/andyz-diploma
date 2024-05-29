import { Box, Divider, Heading, Image, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../requests/FetchData";
import Comment from "../../pages/comment/Comment";

function LessonMain() {
  const {id} = useParams();
  const { lessonSlug } = useParams();
  const lessonDetailData = useFetchData("course/lessons", lessonSlug);
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
        <VStack alignItems={"start"} mb={5}>
          <Heading fontSize={25}> {lessonDetailData?.lessons.title}</Heading>
        </VStack>

        {console.log(lessonDetailData?.lessons.contents.photo)}
        <Divider mt={4} mb={2} />
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
            {content.photo ? (
              null
            ) : (
              <Image src={content.photo} />
            )}

            {console.log(content.photo)}
          </div>
        ))}
        <Divider mt={4} mb={2} />
        <Comment id={id} lessonSlug={`${lessonSlug}`} />
      </Box>
    </Box>
  );
}

export default LessonMain;
