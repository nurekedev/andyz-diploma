import { useParams } from "react-router-dom";
import OtherReviews from "../../components/review/OtherReviews";
import WriteReview from "../../components/review/WriteReview";
import { Divider, Box, Text } from "@chakra-ui/react";
import useReviewStore from "@store/ReviewStore";
import { useEffect } from "react";
import ReviewCard from "../../components/review/ReviewCard";

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
