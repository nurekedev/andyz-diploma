import { PostComment } from "../../requests/PostComment";
import { useState, useEffect } from "react";
import { Box, Button, Input, useToast } from "@chakra-ui/react";
import { MdSend } from "react-icons/md";
import Cookies from "js-cookie";

const WriteComment = ({ course_slug, lesson_slug }) => {
  const toast = useToast();
  const [comment, setComment] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // Инициализация состояния `disabled` и `timeLeft` из localStorage при загрузке компонента
  useEffect(() => {
    const savedDisabledState = localStorage.getItem("commentDisabled");
    const savedTimeLeft = localStorage.getItem("timeLeft");

    console.log("Saved Disabled State:", savedDisabledState);
    console.log("Saved Time Left:", savedTimeLeft);

    if (savedDisabledState !== null) {
      setDisabled(savedDisabledState === "true");
    }

    if (savedTimeLeft !== null) {
      setTimeLeft(Number(savedTimeLeft));
    }
  }, []);

  console.log(disabled, timeLeft);
  // Сохранение состояния `disabled` и `timeLeft` в localStorage при изменении
  useEffect(() => {
    if (disabled) {
      localStorage.setItem("commentDisabled", "true");
      localStorage.setItem("timeLeft", timeLeft);
    } else {
      localStorage.removeItem("commentDisabled");
      localStorage.removeItem("timeLeft");
    }
  }, [disabled, timeLeft]);

  // Управление таймером
  useEffect(() => {
    let timer;
    if (disabled && timeLeft > 0) {
      // Уменьшаем оставшееся время каждую секунду
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    // Когда время истекает, сбрасываем состояние `disabled` и очищаем таймер
    if (timeLeft <= 0) {
      setDisabled(false);
      setTimeLeft(0);
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [disabled, timeLeft]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Проверка на пустой комментарий
    if (!comment) {
      toast({
        title: "Комментарий не может быть пустым",
        status: "error",
        duration: 2000
      });
      return;
    }

    try {
      const data = await PostComment(course_slug, lesson_slug, comment);
      setComment("");
      console.log(data);

      // Если код ответа 429, установить `disabled` в `true`, показать уведомление и запустить таймер
      if (data === 429) {
        setDisabled(true);
        setTimeLeft(40); // Устанавливаем 40 секунд
        toast({
          title: "Слишком много запросов",
          description:
            "Пожалуйста, подождите 40 секунд перед отправкой еще одного комментария.",
          status: "error",
          duration: 2000
        });
      }
    } catch (error) {
      toast({
        title: `Ошибка: ${error.message}`,
        status: "error",
        duration: 2000
      });
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
        disabled={disabled}
      />

      <Box display="flex" gap="3px">
        <Button bg="none" size="sm" onClick={() => setComment("")}>
          Очистить
        </Button>
        <Button
          bg="none"
          size="sm"
          onClick={handleSubmit}
          loadingText={timeLeft}
          isLoading={disabled}
        >
          <MdSend fontSize={25} />
        </Button>
      </Box>
    </Box>
  );
};

export default WriteComment;