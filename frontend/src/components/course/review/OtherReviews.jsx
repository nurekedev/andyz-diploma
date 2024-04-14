import { Box, Text, Avatar } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useReviewData } from "../../../requests/ReviewData";

const OtherReviews = () => {
  const { id } = useParams();
  const reviews = useReviewData(id);
  
  if (!reviews || reviews.length === 0) {
    return (
      <div>
        There are no reviews for this course yet, be the first to write one!
      </div>
    );
  }

  return (
    <Box>
      {reviews.map((review) => {
        const stars = Array(5)
          .fill(0)
          .map((_, i) => i + 1); // Create an array of numbers from 1 to 5

        return (
          <Box key={review} mb={3}>
            <Box display={"flex"} gap={3} alignItems={"center"} mb={2}>
              <Avatar src={review.user.avatar} />
              <Box>
                <Text>
                  {review.user.full_name}
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
            Y37fCh_CVRxQzUL
            {review.user.id}
            {review.description}
          </Box>
        );
      })}
    </Box>
  );
};
export default OtherReviews;
