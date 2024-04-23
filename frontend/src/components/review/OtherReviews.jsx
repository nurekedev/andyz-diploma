import { Box, Spinner,} from "@chakra-ui/react";
import ReviewCard from "./ReviewCard";

const OtherReviews = ({ reviews, userData }) => {
  if (!reviews || !userData) {
    // Если `reviews` или `userData` равны null/undefined, выходим из компонента
    return <div><Spinner /></div>;
  }

  const filteredReviews = reviews.filter(
    (review) => review.user?.id !== userData.id
  );

  if (!filteredReviews) {
    // Handle no review case (optional: display a message)
    return <div>No reviews found for this course.</div>;
  }

  return (
    <Box>
      {filteredReviews.map((review) => (
        <ReviewCard key={review.id} review={review} edit={false} />
      ))}
    </Box>
  );
}
export default OtherReviews;
