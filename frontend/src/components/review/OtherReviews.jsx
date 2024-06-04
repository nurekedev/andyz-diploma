import { Box, Text } from "@chakra-ui/react";
import ReviewCard from "./ReviewCard";

const OtherReviews = ({ reviews }) => {
  return (
    <Box>
      {reviews?.length > 0 ? (
        reviews.map((review) => (
          <ReviewCard key={review.id} review={review} edit={false} />
        ))
      ) : (
        <Text>Nobody wrote a review</Text>
      )}
    </Box>
  );
}
export default OtherReviews;
