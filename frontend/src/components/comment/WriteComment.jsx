import { useState} from "react";
import { Box, Button, Input, useToast } from "@chakra-ui/react";
import { MdSend } from "react-icons/md";
import Cookies from "js-cookie";
import useCommentStore from "../../store/CommentStore";

const WriteComment = ({ courseId, lessonSlug }) => {
  const toast = useToast();
  const [comment, setComment] = useState("");
  const { addComment } = useCommentStore((state) => ({
    addComment: state.addComment
  }));


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!comment.trim()) {
      toast({
        title: "Comment cannot be empty",
        status: "error",
        duration: 2000
      });
      return;
    }

    try {
      await addComment(courseId, lessonSlug, comment);
      setComment(""); // Clear input after adding
      toast({
        title: "Comment added successfully",
        status: "success",
        duration: 2000
      });
    } catch (error) {
      if (error.response && error.response.status === 429) {
        const coolDownPeriod = 60; // 60 seconds cool-down
        Cookies.set("disableTime", Date.now() + coolDownPeriod * 1000);
        toast({
          title: "Too many requests",
          description:
            "Please wait for 60 seconds before posting another comment.",
          status: "error",
          duration: 5000
        });
      } else {
        toast({
          title: `Error: ${error.message}`,
          status: "error",
          duration: 2000
        });
      }
    }
  };

  return (
    <Box display="flex" alignItems="end" gap={2}>
      <Input
        resize="none"
        maxLength={100}
        value={comment}
        variant="flushed"
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        onClick={handleSubmit}
      >
        <MdSend fontSize={25} />
      </Button>
    </Box>
  );
};

export default WriteComment;
