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
  Textarea,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

import { BiDotsHorizontalRounded } from "react-icons/bi";
import useReviewStore from "@store/ReviewStore";

const ReviewCard = ({ slug, review, edit }) => {
  const { deleteReview, updateReview } = useReviewStore();
  // Состояние для отслеживания развернуто ли описание
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose
  } = useDisclosure(); // Edit modal
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose
  } = useDisclosure(); // Delete modal

  const [rating, setRating] = useState(review?.rating);
  const [hover, setHover] = useState(null);
  const [description, setDescription] = useState(review?.description);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateReview(slug, review?.id, rating, description);
      onEditClose();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  const handleDeleteConfirmation = async () => {
    try {
      await deleteReview(slug, review?.id);
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      onDeleteClose();
    }
  };

  const stars = Array(5)
    .fill(0)
    .map((_, i) => i + 1);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box mb={"25px"}>
      <Box display={"flex"} justifyContent={"space-between"} mb={2}>
        <Box display={"flex"} gap={3}>
          <Avatar src={review?.user?.avatar} />
          <Box>
            <Text>
              {review?.user?.full_name}
              <div className="rating">
                {stars.map((star) => (
                  <span
                    key={star} // Добавлен ключ
                    className={`star ${
                      star <= review?.rating ? "gold" : "gray"
                    }`}
                  >
                    <FaStar />
                  </span>
                ))}
              </div>
            </Text>
          </Box>
        </Box>
        <Box display={edit ? "block" : "none"} gap={4}>
          <Menu>
            <MenuButton>
              <BiDotsHorizontalRounded fontSize={25} />
            </MenuButton>
            <MenuList>
              <MenuItem gap={3} onClick={onEditOpen}>
                Edit <AiFillEdit fontSize={20} />
              </MenuItem>
              <MenuItem gap={3} onClick={onDeleteOpen}>
                Delete
                <AiFillDelete fontSize={20} />
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      {/* Показ описание, развернуто или обрезано */}
      <Text>
        {isExpanded ? (
          // Если описание развернуто, показать все описание
          <>
            {review?.description}
            <Link onClick={toggleExpand} className="read-more">
              Read Less
            </Link>
          </>
        ) : (
          // Если описание не развернуто, обрезать его до 200 символов и показать "Read More"
          <>
            {review?.description?.slice(0, 300)}
            {review?.description?.length > 300 && (
              <>
                ...
                <Link onClick={toggleExpand} className="read-more">
                  Read More
                </Link>
              </>
            )}
          </>
        )}
      </Text>
      <Modal
        onClose={onEditClose}
        isOpen={isEditOpen}
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
                  {[...Array(5)].map((_, index) => {
                    const currentRating = index + 1;
                    return (
                      <label key={currentRating}>
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

      {/* Delete confirmation modal */}
      <Modal onClose={onDeleteClose} isOpen={isDeleteOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this comment?</Text>
            <Text mb={10}>This action cannot be undone.</Text>

            <Box
              display={"flex"}
              justifyContent={"space-between"}
              gap={3}
              mt={4}
            >
              <Button onClick={onDeleteClose}>Cancel</Button>
              <Button colorScheme="red" onClick={handleDeleteConfirmation}>
                Delete
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ReviewCard;
