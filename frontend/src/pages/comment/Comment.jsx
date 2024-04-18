import { Box, Text } from "@chakra-ui/react";
import WriteComment from "../../components/comment/WriteComment";
import OtherComments from "../../components/comment/OtherComments";
import { useFetchData } from "../../requests/FetchData";

const Comment = ({ id, lessonSlug }) => {
  const userData = useFetchData("auth/users/me", "");
  
  if (!lessonSlug) {
    lessonSlug = "";
  } else {
    lessonSlug = `/${lessonSlug}`;
  }
  const comments = useFetchData(`course/${id}${lessonSlug}`, "comments/");
  return (
    <Box>
      <WriteComment course_slug={id} lesson_slug={lessonSlug} />
      <Text fontSize={24} fontWeight={"bold"} mb={5}>
        Other Comments
      </Text>
      <OtherComments
        comments={comments}
        id={id}
        lesson_slug={lessonSlug}
        data={userData}
      />
    </Box>
  );
};

export default Comment;
