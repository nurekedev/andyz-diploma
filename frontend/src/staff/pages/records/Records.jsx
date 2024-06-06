import { useEffect } from "react";
import useRecordStore from "../../../store/RecordStore";
import { useParams } from "react-router-dom";
import RecordCard from "../../components/reecords/RecordCard";
import WiteRecord from "../../components/reecords/WiteRecord";
import {
  AbsoluteCenter,
  Box,
  Divider,
  Text,
  useColorModeValue
} from "@chakra-ui/react";

const Records = () => {
  const { userId } = useParams();
  const { records, fetchRecords } = useRecordStore();
  useEffect(() => {
    fetchRecords(userId);
  }, [fetchRecords, userId]);
  return (
    <div>
      <WiteRecord />
      <Box position="relative" padding="10" mt={10} mb={5}>
        <Divider />
        <AbsoluteCenter bg={useColorModeValue("white", "gray.dark")} px={4}>
          <Text fontSize={24} textAlign={"center"}>
            Other records
          </Text>
        </AbsoluteCenter>
      </Box>

      {records
        .slice()
        .reverse()
        .map((record) => {
          return <RecordCard key={record.id} record={record} userId={userId} />;
        })}
    </div>
  );
};

export default Records;
