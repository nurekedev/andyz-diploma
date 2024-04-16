import { useParams } from "react-router-dom";
import OtherReviews from "../../../components/course/review/OtherReviews";
import WriteReview from "../../../components/course/review/WriteReview";
import { Divider, Box, Text } from "@chakra-ui/react";
import { useFetchData } from "../../../requests/FetchData";
const Review = () => {
  const { id } = useParams();
  const reviews = useFetchData(`course/${id}`, "review/");
  const userData = useFetchData("auth/users/me", "");

  return (
    <Box display={"flex"} flexDir={"column"} gap={2}>
      <WriteReview slug={id} reviews={reviews} userData={userData} />
      <Text fontSize={24} fontWeight={"bold"} mt={5}>
        Other rewies
      </Text>
      <Divider />
      <OtherReviews reviews={reviews} userData={userData} />
    </Box>
  );
};

export default Review;
