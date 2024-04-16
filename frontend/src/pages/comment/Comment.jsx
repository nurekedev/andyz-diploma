import { Box, Text } from "@chakra-ui/react";
import WriteComment from "../../components/comment/WriteComment";
import OtherComments from "../../components/comment/OtherComments";
import { useFetchData } from "../../requests/FetchData";

const Comment = ({id, lessonSlug}) => {
  if (lessonSlug === undefined) {
    lessonSlug = "";
  } else {
    lessonSlug = `/${lessonSlug}`;
  }
  const comments = useFetchData(`course/${id}${lessonSlug}`, "comments/");
  console.log(comments);
  return (
    <Box>
      <WriteComment course_slug={id} lesson_slug={lessonSlug} />
      <Text fontSize={24} fontWeight={"bold"}>
        Other Comments
      </Text>
      <OtherComments comments={comments}  id={id} lesson_slug={lessonSlug}/>
    </Box>
  );
};

export default Comment;
