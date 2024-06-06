import { useParams } from "react-router-dom";
import { Divider, Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import useReviewStore from "../../../store/ReviewStore";
import ReviewCard from "../../components/review/ReviewCard";
import WriteReview from "../../components/review/WriteReview";
import OtherReviews from "../../components/review/OtherReviews";
import AverageReview from "../../components/review/AverageReview";

const Review = () => {
  const { id } = useParams();
  const { fetchReviews, fetchUser, getUserReview, getOtherUserReviews } =
    useReviewStore();

  useEffect(() => {
    fetchUser();
    fetchReviews(id);
  }, [fetchUser, fetchReviews, id]);

  const userReview = getUserReview();
  const otherUserReviews = getOtherUserReviews();

  return (
    <Box display={"flex"} flexDir={"column"} gap={2} p={4} maxW={850}>
      <AverageReview />
      {userReview?.length > 0 ? (
        <ReviewCard review={userReview[0]} slug={id} edit={true} />
      ) : (
        <WriteReview slug={id} />
      )}
      <Text fontSize={24} fontWeight={"bold"} mt={5}>
        Other rewies
      </Text>
      <Divider />
      <OtherReviews reviews={otherUserReviews} />
    </Box>
  );
};

export default Review;
