import { useParams } from "react-router-dom";
import OtherReviews from "./OtherReviews";
import WriteReview from "./WriteReview";
import { Divider, Box, Text } from "@chakra-ui/react";
const Review = () => {
  const { id } = useParams();
  return (
    <Box display={"flex"} flexDir={"column"} gap={5} p={4}>
      <WriteReview slug={id} />
      <Divider />
      <Text>Other revies</Text>
      <OtherReviews />
    </Box>
  );
};

export default Review;
