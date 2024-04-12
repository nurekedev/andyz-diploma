import { Box, Divider, Text, Badge } from "@chakra-ui/react";
export default function CourseMain({ courseDetailData }) {
  return (
    <div>
      <Box>
        <Text fontSize={16}>
          <b>Author: </b>
          {courseDetailData?.course.created_by.full_name}
        </Text>
        <Box>
          {courseDetailData?.course.categories.map((category, index) => (
            <Badge variant="solid" colorScheme="green" key={index} mr={2} p={1}>
              {category.title}
            </Badge>
          ))}
        </Box>

        <Divider mt={4} mb={2} />
        <Text as={"b"} fontSize={24}>
          What is this course about?
        </Text>
        <Text>{courseDetailData?.course.short_description}</Text>
      </Box>
    </div>
  );
}
