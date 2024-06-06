import { useParams } from "react-router-dom";
import useMarkerStore from "../../../store/MarkerStore";
import OtherMarkers from "../../components/markers/OtherMarkers";
import WriteMarker from "../../components/markers/WriteMarker";
import { useEffect } from "react";
import { AbsoluteCenter, Box, Divider, Text, useColorModeValue } from "@chakra-ui/react";

const Markers = () => {
  const { userId } = useParams();
  const { markers, fetchMarkers } = useMarkerStore();
    useEffect(() => {
      fetchMarkers(userId);
    }, [fetchMarkers, userId])
    console.log(markers);
  return (
    <div>
      <WriteMarker />
      <Box position="relative" padding="10" mt={10} mb={5}>
        <Divider />
        <AbsoluteCenter bg={useColorModeValue("white", "gray.dark")} px={4}>
          <Text fontSize={24} textAlign={"center"}>Other markers</Text>
        </AbsoluteCenter>
      </Box>
      <OtherMarkers markers={markers} userId={userId} />
    </div>
  );
};

export default Markers;
