import { useParams } from "react-router-dom";
import useFetchData from "../../../services/api";
import { FaStar } from "react-icons/fa";
import {
  Box,
  Divider,
  HStack,
  Heading,
  Progress,
  Text,
  VStack
} from "@chakra-ui/react";

const AverageReview = () => {
  const { id } = useParams();
  const reviews = useFetchData("/course/get_average_rating", id);
  const avg = reviews?.average_rating?.rating__avg;
  const totalRatingCount = reviews?.rating_by_star.reduce(
    (total, item) => total + item.rating_count,
    0
  );
  const result = reviews?.rating_by_star.map((item) => {
    const key = `rating_${item.rating}`;
    return { [key]: item.rating_count };
  });
  const ratings = [1, 2, 3, 4, 5];
  const percentages = {};

  ratings.forEach((rating) => {
    const ratingObj = result?.find(
      (item) => item[`rating_${rating}`] !== undefined
    );
    percentages[`rating_${rating}`] = ratingObj
      ? (ratingObj[`rating_${rating}`] / totalRatingCount) * 100
      : 0;
  });

  const one = percentages.rating_1;
  const two = percentages.rating_2;
  const three = percentages.rating_3;
  const four = percentages.rating_4;
  const five = percentages.rating_5;

  const stars = Array(5)
    .fill(0)
    .map((_, i) => i + 1);
  return (
    <Box mb={10}>
      <HStack>
        <VStack>
          <Heading fontSize={80}>{avg}</Heading>

          <HStack>
            {stars.map((star) => (
              <span
                key={star}
                className={`star ${star <= avg ? "gold" : "gray"}`}
              >
                <FaStar fontSize={30} />
              </span>
            ))}
          </HStack>
          <Heading fontSize={16}>
            Total Rating Count: {totalRatingCount}
          </Heading>
          <Text textAlign={"center"}>Average rating of this course</Text>
        </VStack>
        <Box w={"full"} display={"flex"} flexDir={"column"} gap={5} ml={10}>
          <Box display={"flex"} w={"100%"} gap={5} alignItems={"center"}>
            <Text w={20}>5 stars</Text>
            <Progress
              value={five}
              colorScheme="yellow"
              w={"full"}
            />
          </Box>
          <Box display={"flex"} w={"100%"} gap={5} alignItems={"center"}>
            <Text w={20}>4 stars</Text>
            <Progress value={four} colorScheme="yellow" w={"full"} />
          </Box>
          <Box display={"flex"} w={"100%"} gap={5} alignItems={"center"}>
            <Text w={20}>3 stars</Text>
            <Progress value={three} colorScheme="yellow" w={"full"} />
          </Box>
          <Box display={"flex"} w={"100%"} gap={5} alignItems={"center"}>
            <Text w={20}>2 stars</Text>
            <Progress value={two} colorScheme="yellow" w={"full"} />
          </Box>
          <Box display={"flex"} w={"100%"} gap={5} alignItems={"center"}>
            <Text w={20}>1 stars</Text>
            <Progress value={one} colorScheme="yellow" w={"full"} />
          </Box>
        </Box>
      </HStack>
      <Divider mt={5} />
    </Box>
  );
};

export default AverageReview;
