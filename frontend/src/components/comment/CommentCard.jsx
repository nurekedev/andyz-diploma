import {
  Avatar,
  Box,
  Divider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea
} from "@chakra-ui/react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { PatchComment } from "../../requests/PatchComment";
import { useState } from "react";
import { DeleteData } from "../../requests/DeleteData";

const CommentCard = ({ id, lesson_slug, comment }) => {
  const [newComment, setNewComment] = useState(comment?.body);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await PatchComment(`${id}`, lesson_slug, newComment, comment?.id);
      console.log("Review submitted successfully!");
      setNewComment("null");
      location.reload();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  if (!lesson_slug) {
    lesson_slug = "";
  } else {
    lesson_slug = `${lesson_slug}/`;
  }
  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      await DeleteData(`${id}${lesson_slug}/comments`, comment?.id);
      console.log("Review submitted successfully!");
      location.reload();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  return (
    <Box mb={"20px"} minW={320}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <Avatar src={comment.created_by.avatar} size={"sm"} />
          <Text>{comment?.created_by?.full_name}</Text>
        </Box>
        <Menu>
          <MenuButton>
            <BiDotsHorizontalRounded fontSize={25} />
          </MenuButton>
          <MenuList>
            <MenuItem gap={3} onClick={onOpen}>
              Edit <AiFillEdit fontSize={20} />
            </MenuItem>
            <MenuItem gap={3} onClick={handleDelete}>
              Delete
              <AiFillDelete fontSize={20} />
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Text>{comment?.body}</Text>
      <Divider mt={2} />
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior={"inside"}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <>
              <Textarea
                minHeight={350}
                resize={"none"}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></Textarea>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                gap={3}
                mt={3}
              >
                <Button onClick={handleSubmit}>Submit</Button>
              </Box>
            </>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CommentCard;
