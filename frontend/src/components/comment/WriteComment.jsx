import { Box, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { PostComment } from "../../requests/PostComment";
import { MdSend } from "react-icons/md";

const WriteComment = ({ course_slug, lesson_slug, refreshComments }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await PostComment(`${course_slug}`, `${lesson_slug}/`, comment);
      console.log("Comment submitted successfully!");
      setComment("");

      // После успешной отправки комментария вызываем функцию обновления данных
      refreshComments();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <Box display={"flex"} flexDir={"column"} alignItems={"end"} gap={2}>
      <Input
        resize={"none"}
        maxLength={100}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></Input>

      <Box display={"flex"} gap={2}>
        <Button bg={"none"} onClick={() => setComment("")}>
          Clear
        </Button>
        <Button bg={"none"} onClick={handleSubmit}>
          <MdSend fontSize={25} />
        </Button>
      </Box>
    </Box>
  );
};

export default WriteComment;
