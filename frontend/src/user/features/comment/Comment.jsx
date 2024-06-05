import { Box, Text } from "@chakra-ui/react";
import WriteComment from "../../components/comment/WriteComment";
import OtherComments from "../../components/comment/OtherComments";
import { useEffect } from "react";
import useCommentStore from "../../../store/CommentStore";
import useFetchData from "../../../services/api";

const Comment = ({ id, lessonSlug }) => {
  const userData = useFetchData("auth/users/me", "");
  
  if (!lessonSlug) {
    lessonSlug = "";
  } else {
    lessonSlug = `/${lessonSlug}`;
  }

  const { comments, fetchComments } = useCommentStore();

  useEffect(() => {
    fetchComments(id, lessonSlug);
  }, [id, lessonSlug, fetchComments]);

  return (
    <Box>
      <WriteComment courseId={id} lessonSlug={lessonSlug} />
      <Text fontSize={24} fontWeight={"bold"} mb={5} mt={10}>
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
