import { Box, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";

const WriteComment = () => {
  const [description, setDescription] = useState(""); // Add state for description
  return (
    <Box display={"flex"} flexDir={"column"} gap={5}>
      <Textarea
        minHeight={120}
        resize={"none"}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></Textarea>

        <Button w={120}>Submit</Button>
    </Box>
  );
}

export default WriteComment;