import { Box, Button, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { PostComment } from "../../requests/PostComment";
import { MdSend } from "react-icons/md";

const WriteComment = ({ course_slug, lesson_slug }) => {
  const toast = useToast();
  const [disabled, setDisabled] = useState(false);
  const [comment, setComment] = useState("");

  const handleSubmit = async (event) => {
    if (!comment) {
      toast({
        title: "Комментарий не может быть пустым",
        status: "error",
        duration: 2000
      });
      return null;
    }
    event.preventDefault();
    try {
      await PostComment(`${course_slug}`, `${lesson_slug}`, comment);
      console.log("Comment submitted successfully!");
      setComment("");
    } catch (error) {
      // Если код ошибки равен 429, отключите кнопку на 40 секунд
      if (error.response && error.response.status === 429) {
        setDisabled(true);
        toast({
          title: "Слишком много запросов",
          description:
            "Пожалуйста, подождите 40 секунд перед отправкой еще одного комментария.",
          status: "error",
          duration: 2000
        });

        // Включите кнопку после 40 секунд
        setTimeout(() => {
          setDisabled(false);
        }, 40000);
      } 
    }
  };

  return (
    <Box display={"flex"} alignItems={"end"} gap={2}>
      <Input
        resize={"none"}
        maxLength={100}
        value={comment}
        variant="flushed"
        onChange={(e) => setComment(e.target.value)}
        disabled={disabled}
      />

      <Box display={"flex"} gap={"3px"}>
        <Button bg={"none"} size={"sm"} onClick={() => setComment("")}>
          Clear
        </Button>
        <Button
          bg={"none"}
          size={"sm"}
          onClick={handleSubmit}
          disabled={disabled}
        >
          <MdSend fontSize={25} />
        </Button>
      </Box>
    </Box>
  );
};


export default WriteComment;
