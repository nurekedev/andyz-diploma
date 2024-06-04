import { Box, Textarea, Text, Button } from "@chakra-ui/react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import useReviewStore from "../../store/ReviewStore";

const WriteReview = ({ slug }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [description, setDescription] = useState("");
  const { addReview } = useReviewStore();
  const handleRatingChange = (currentRating) => {
    currentRating === rating ? setRating(null) : setRating(currentRating);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addReview(slug, rating, description);
      setRating(null);
      setDescription("");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <Box display={"flex"} flexDir={"column"} gap={5}>
      <Textarea
        minHeight={150}
        resize={"none"}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></Textarea>
      <Box display={"flex"} justifyContent={"space-between"} gap={3}>
        <Box display={"flex"} alignItems={"center"} gap={3}>
          {[...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return (
              <label key={star}>
                <input
                  className="rating-input"
                  type="radio"
                  name="rating"
                  value={currentRating}
                  checked={rating === currentRating} // Set checked based on state
                  onChange={() => handleRatingChange(currentRating)}
                />
                <FaStar
                  size={35}
                  className="star"
                  color={
                    currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"
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
    </Box>
  );
};

export default WriteReview;
