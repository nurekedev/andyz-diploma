import { Box, Divider, HStack, Heading, Text } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import useRecordStore from "../../../store/RecordStore";

const RecordCard = ({ record, userId }) => {
  const { deleteRecord } = useRecordStore();
  const handleDelete = async () => {
    try {
      await deleteRecord(userId, record.id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box mb={4}>
      <HStack justifyContent={"space-between"}>
        <Heading fontSize={20}>{record.title}</Heading>
        <Box
          display={"flex"}
          alignItems={"center"}
          onClick={() => {
            handleDelete();
          }}
          color="red.300"
          _hover={{ color: "red.500" }}
          cursor={"pointer"}
          fontWeight={"bold"}
        >
          Delete
          <MdDelete />
        </Box>
      </HStack>
      <Text fontSize={14} color={"teal.400"}>
        {record.date}
      </Text>
      <Text>{record.description}</Text>
      <Divider mt={4}></Divider>
    </Box>
  );
};

export default RecordCard;
