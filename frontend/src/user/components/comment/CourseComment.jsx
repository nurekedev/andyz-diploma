import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Comment from "../../features/comment/Comment";
const CourseComment = () => {
  const { id } = useParams();
  return (
    <Box>
      <Comment id={id} />
    </Box>
  );
};

export default CourseComment;
