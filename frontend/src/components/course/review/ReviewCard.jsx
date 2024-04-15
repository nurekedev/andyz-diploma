import { useState } from "react";
import {
  Avatar,
  Box,
  Text,
  Link,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Textarea
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { PatchData } from "../../../requests/PatchData";
import { DeleteData } from "../../../requests/DeleteData";
const ReviewCard = ({slug, review, edit }) => {
  // Состояние для отслеживания развернуто ли описание
  const [isExpanded, setIsExpanded] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [description, setDescription] = useState(review?.description); // Add state for description

  if (!review) {
    return null;
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await PatchData(slug, rating, description, review?.id);
      console.log("Review submitted successfully!");
      setRating(null);
      setDescription("");
      location.reload();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      await DeleteData(slug, review?.id);
      console.log("Review submitted successfully!");
      location.reload();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const stars = Array(5)
    .fill(0)
    .map((_, i) => i + 1);

  // Функция для переключения состояния развернутости описания
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box display={"flex"} gap={3} mb={2}>
          <Avatar src={review.user?.avatar} />
          <Box>
            <Text>
              {review?.user?.full_name}
              <div className="rating">
                {stars.map((star) => (
                  <span
                    key={star}
                    className={`star ${
                      star <= review.rating ? "gold" : "gray"
                    }`}
                  >
                    <FaStar />
                  </span>
                ))}
              </div>
            </Text>
          </Box>
        </Box>
        <Box display={edit ? "flex" : "none"} gap={4}>
          <Button onClick={onOpen}>
            <AiFillEdit fontSize={20} />
          </Button>
          <Button onClick={handleDelete}>
            <AiFillDelete fontSize={20} />
          </Button>
        </Box>
      </Box>

      {/* Показ описание, развернуто или обрезано */}
      <Text>
        {isExpanded ? (
          // Если описание развернуто, показать все описание
          <>
            {review.description}
            <Link onClick={toggleExpand} className="read-more">
              {" "}
              Read Less
            </Link>
          </>
        ) : (
          // Если описание не развернуто, обрезать его до 200 символов и показать "Read More"
          <>
            {review.description.slice(0, 300)}
            {review.description.length > 300 && (
              <>
                ...{" "}
                <Link onClick={toggleExpand} className="read-more">
                  Read More
                </Link>
              </>
            )}
          </>
        )}
      </Text>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior={"inside"}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <>
              <Textarea
                minHeight={350}
                resize={"none"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Textarea>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                gap={3}
                mt={3}
              >
                <Box display={"flex"} alignItems={"center"} gap={3}>
                  {[...Array(5)].map((star, index) => {
                    const currentRating = index + 1;
                    return (
                      <label key={star}>
                        <input
                          className="rating-input"
                          type="radio"
                          name="rating"
                          value={review?.rating}
                          checked={rating === currentRating} // Set checked based on state
                          onChange={() => setRating(currentRating)}
                        />
                        <FaStar
                          size={25}
                          className="star"
                          color={
                            currentRating <= (hover || rating)
                              ? "#ffc107"
                              : "#e4e5e9"
                          }
                          onMouseEnter={() => setHover(currentRating)}
                          onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                  <Text fontSize={20} fontWeight={"bold"}>
                    {rating === null ? (
                      <p>How do you like our course?</p>
                    ) : rating === 1 ? (
                      <p style={{ color: "red" }}>Very bad 😒</p>
                    ) : rating === 2 ? (
                      <p style={{ color: "tomato" }}>Bad 🙂</p>
                    ) : rating === 3 ? (
                      <p style={{ color: "gray" }}>Neutral 😊</p>
                    ) : rating === 4 ? (
                      <p style={{ color: "yellowgreen" }}>Good! 🫰</p>
                    ) : (
                      <p style={{ color: "green" }}>Excellent! ❤️</p>
                    )}
                  </Text>
                </Box>
                <Button onClick={handleSubmit}>Submit</Button>
              </Box>
            </>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ReviewCard;
