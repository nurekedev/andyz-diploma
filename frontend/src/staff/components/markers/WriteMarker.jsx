import {
  Button,
  Divider,
  Heading,
  Input,
  Textarea,
  VStack
} from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useMarkerStore from "../../../store/MarkerStore";

const WriteMarker = () => {
  const { userId } = useParams();
  const { addMarker } = useMarkerStore();
  const [inputs, setInputs] = useState({
    date: "",
    title: "",
    description: ""
  });

  const handleCreate = async (inputs) => {
    console.log(inputs);
    try {
      await addMarker(userId, inputs);
      setInputs({
        date: "",
        title: ""
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VStack alignItems={"flex-start"} gap={3}>
      <Heading fontSize={"2xl"}>Type important markers</Heading>

      <Input
        type="text"
        placeholder="Title of marker"
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
        placeholder="Message of marker"
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
        Add marker
      </Button>
      <Divider></Divider>
    </VStack>
  );
};

export default WriteMarker;
