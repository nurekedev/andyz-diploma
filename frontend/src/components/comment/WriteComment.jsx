import { PostComment } from "../../requests/PostComment";
import { useState, useEffect } from "react";
import { Box, Button, Input,  useToast } from "@chakra-ui/react";
import { MdSend } from "react-icons/md";
import Cookies from "js-cookie";

const WriteComment = ({ course_slug, lesson_slug }) => {
  const toast = useToast();
  const [comment, setComment] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  // Инициализация состояния `disabled` и `remainingTime` из куки при загрузке компонента
  useEffect(() => {
    const savedDisabledState = Cookies.get("commentDisabled");
    const savedTimestamp = Cookies.get("commentTimestamp");

    if (savedDisabledState !== undefined && savedTimestamp !== undefined) {
      const elapsedTime = Date.now() - parseInt(savedTimestamp);
      const remaining = 60000 - elapsedTime;

      if (remaining > 0) {
        setDisabled(savedDisabledState === "true");
        setRemainingTime(Math.ceil(remaining / 1000)); // Преобразуем в секунды

        // Установить таймер для обновления `remainingTime` каждую секунду
        const intervalId = setInterval(() => {
          setRemainingTime((prevTime) => prevTime - 1);
        }, 1000);

        // Очищаем интервал по окончании таймера
        setTimeout(() => {
          clearInterval(intervalId);
          setDisabled(false);
          setRemainingTime(0);
          Cookies.remove("commentDisabled");
          Cookies.remove("commentTimestamp");
        }, remaining);
      }
    }
  }, []);

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

      // Если код ответа 429, установить `disabled` в `true` и установить куку на 40 секунд
      if (data === 429) {
        setDisabled(true);
        toast({
          title: "Слишком много запросов",
          description:
            "Пожалуйста, подождите 60 секунд перед отправкой еще одного комментария.",
          status: "error",
          duration: 10000
        });

        // Устанавливаем куку `commentDisabled` и `commentTimestamp`
        const timestamp = Date.now();
        Cookies.set("commentDisabled", "true", { expires: 40 / 86400 });
        Cookies.set("commentTimestamp", timestamp.toString(), {
          expires: 60 / 86400
        });

        // Устанавливаем `remainingTime` на 40 секунд
        setRemainingTime(60);

        // Сброс `disabled` и очистка таймера после 40 секунд
        setTimeout(() => {
          setDisabled(false);
          setRemainingTime(0);
          Cookies.remove("commentDisabled");
          Cookies.remove("commentTimestamp");
        }, 60000);

        // Обновление `remainingTime` каждую секунду
        const intervalId = setInterval(() => {
          setRemainingTime((prevTime) => prevTime - 1);
        }, 1000);

        // Очистка интервала после окончания таймера
        setTimeout(() => {
          clearInterval(intervalId);
        }, 60000);
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
          isLoading={disabled}
          loadingText={ remainingTime }
          onClick={handleSubmit}
        >
          <MdSend fontSize={25} />
        </Button>
      </Box>
    </Box>
  );
};


export default WriteComment;
