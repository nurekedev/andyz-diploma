import {
  Button,
  Divider,
  FormControl,
  FormLabel,
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
        title: "",
        description: ""
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VStack alignItems={"flex-start"} gap={3} mt={10}>
      <Heading fontSize={32} mb={5}>
        Type important markers
      </Heading>

      <FormControl>
        <FormLabel>Title of marker</FormLabel>
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
      </FormControl>
      <FormControl>
        <FormLabel>Pick a date</FormLabel>
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
      </FormControl>
      <FormControl>
        <FormLabel>Write more information</FormLabel>
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
      </FormControl>

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
