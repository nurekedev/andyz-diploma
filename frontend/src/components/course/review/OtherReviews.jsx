import { Box, Spinner,} from "@chakra-ui/react";
import ReviewCard from "./ReviewCard";

const OtherReviews = ({ reviews, userData }) => {
  if (!reviews || !userData) {
    // Если `reviews` или `userData` равны null/undefined, выходим из компонента
    return <div><Spinner /></div>;
  }

  const filteredData = reviews?.find((item) => item?.user?.id !== userData.id);

  if (!filteredData) {
    // Handle no review case (optional: display a message)
    return <div>No reviews found for this course.</div>;
  }

  return (
    <Box>
      <ReviewCard key={filteredData.id} review={filteredData} edit={false}/> {/* Use ID for key */}
    </Box>
  );
}
export default OtherReviews;
