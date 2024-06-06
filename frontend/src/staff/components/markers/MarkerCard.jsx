import { RiErrorWarningFill } from "react-icons/ri";
import { Box, HStack, Heading,  Text } from "@chakra-ui/react";
import useMarkerStore from "../../../store/MarkerStore";
import { MdDelete } from "react-icons/md";

const MarkerCard = ({ marker, userId }) => {
  const { deleteMarker } = useMarkerStore();
  const handleDelete = async () => {
    try {
      await deleteMarker(userId, marker.id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <HStack alignItems={"flex-start"}>
      <Box color={"orange.700"} mt={2} fontSize={20}>
        <RiErrorWarningFill />
      </Box>
      <Box width={"95%"}>
        <HStack>
          <Heading fontSize={20}>{marker?.title}</Heading>
          <Box
            onClick={() => {
              handleDelete();
            }}
            _hover={{color: "red.400"}}
            cursor={"pointer"}
          >
            <MdDelete />
          </Box>
        </HStack>
        <Text>{marker?.date}</Text>
        <Text>{marker?.description}</Text>
      </Box>
    </HStack>
  );
};

export default MarkerCard;
