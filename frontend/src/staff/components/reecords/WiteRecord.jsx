import { Button, Divider, Input, Textarea, VStack } from "@chakra-ui/react";
import useRecordStore from "../../../store/RecordStore";
import { useState } from "react";
import { useParams } from "react-router-dom";

const WriteRecord = () => {
  const { userId } = useParams();
  const { addRecord } = useRecordStore();
  const [inputs, setInputs] = useState({
    date: "",
    title: "",
    description: ""
  });

  const handleCreate = async (inputs) => {
    try {
      console.log(inputs);
        await addRecord(userId, inputs);
        setInputs({
          date: "",
          title: "",
          description: ""
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VStack alignItems={"flex-start"} gap={3}>
      <Input
        type="text"
        placeholder="Title of record"
        value={inputs.title}
        onChange={(e) => {
          setInputs((prev) => ({
            ...prev,
            title: e.target.value
          }));
        }}
      />
      <Input
        type="date"
        w={200}
        value={inputs.date}
        onChange={(e) => {
          setInputs((prev) => ({
            ...prev,
            date: e.target.value
          }));
        }}
      />
      <Textarea
        placeholder="Message of record"
        resize={"none"}
        value={inputs.description}
        onChange={(e) => {
          setInputs((prev) => ({
            ...prev,
            description: e.target.value
          }));
        }}
      />
      <Button
        onClick={() => {
          handleCreate(inputs);
        }}
      >
        Add record
      </Button>
      <Divider></Divider>
    </VStack>
  );
};

export default WriteRecord;
