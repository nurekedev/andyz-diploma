import { useEffect, useState } from "react";
import { Box, Button, Input, useToast } from "@chakra-ui/react";
import { MdSend } from "react-icons/md";
import useCommentStore from "../../store/CommentStore";

const WriteComment = ({ courseId, lessonSlug }) => {
  const toast = useToast();
  const [comment, setComment] = useState("");
  const { addComment } = useCommentStore((state) => ({
    addComment: state.addComment
  }));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(
    localStorage.getItem("rateLimited") === "true"
  );
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    let timer;
    if (isRateLimited) {
      timer = setInterval(() => {
        const errorDate = localStorage.getItem("errorDate");
        if (errorDate) {
          const elapsedTime = Date.now() - parseInt(errorDate);
          const remaining = 60000 - elapsedTime;
          if (remaining <= 0) {
            setIsRateLimited(false);
            localStorage.removeItem("rateLimited");
            localStorage.removeItem("errorDate");
          } else {
            setRemainingTime(remaining);
          }
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRateLimited]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addComment(`${courseId}`, `${lessonSlug}`, comment);
      setComment("");
      setIsRateLimited(false);
      localStorage.removeItem("rateLimited");
      localStorage.removeItem("errorDate");
      toast({
        title: "Comment added successfully",
        status: "success",
        duration: 2000
      });
    } catch (error) {
      toast({
        title: `Error: ${error.message}`,
        status: "error",
        duration: 2000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box display="flex" alignItems="end" gap={2}>
      <Input
        disabled={isSubmitting || isRateLimited}
        value={comment}
        variant="flushed"
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        onClick={handleSubmit}
        isLoading={isSubmitting || isRateLimited}
        loadingText={
          isRateLimited
            ? `${Math.ceil(remainingTime / 1000)}`
            : undefined
        }
      >
        <MdSend fontSize={25} />
      </Button>
    </Box>
  );
};

export default WriteComment;