import { Box, Skeleton, Text } from "@chakra-ui/react";

const CourseMainSkeleton = () => {
  return (
    <div>
      <Box>
        <Text fontSize={16}>
          <Skeleton height="20px" />
        </Text>
        <Box>
          <Skeleton height="20px" />
        </Box>
        <Text >
          <Skeleton height="20px" />
        </Text>
        <Text>
          <Skeleton height="80px" />
        </Text>
      </Box>
    </div>
  );
};

export default CourseMainSkeleton;
