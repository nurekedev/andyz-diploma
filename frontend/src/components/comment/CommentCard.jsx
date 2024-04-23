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
  Textarea,
  useToast
} from "@chakra-ui/react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useState } from "react";
import useCommentStore from "../../store/CommentStore";

const CommentCard = ({ course_slug, lesson_slug, comment, data }) => {
  console.log(course_slug, lesson_slug);
  const [newComment, setNewComment] = useState(comment.body);
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose
  } = useDisclosure();
  const { updateComment, deleteComment } = useCommentStore((state) => ({
    updateComment: state.updateComment,
    deleteComment: state.deleteComment
  }));
  const toast = useToast();
  const canEdit = comment?.created_by.id === data?.id;
  const handleEdit = async () => {
    try {
      await updateComment(course_slug, lesson_slug, comment.id, newComment);
      onEditClose();
      toast({
        title: "Comment Updated",
        description: "The comment has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true
      });
    } catch (error) {
      toast({
        title: "Failed to Update Comment",
        description:
          error.response?.data?.message ||
          "An error occurred while updating the comment.",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteComment(course_slug, lesson_slug, comment.id);
      onDeleteClose();
      toast({
        title: "Comment Deleted",
        description: "The comment has been successfully deleted.",
        status: "success",
        duration: 3000,
        isClosable: true
      });
    } catch (error) {
      toast({
        title: "Failed to Delete Comment",
        description:
          error.response?.data?.message ||
          "An error occurred while deleting the comment.",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
  };

  return (
    <Box mb={"20px"} minW={320}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <Avatar src={comment.created_by.avatar} size={"sm"} />
          <Text>{comment.created_by.full_name}</Text>
        </Box>

        {canEdit && (
          <Menu>
            <MenuButton>
              <BiDotsHorizontalRounded fontSize={25} />
            </MenuButton>
            <MenuList>
              <MenuItem gap={3} onClick={onEditOpen}>
                Edit <AiFillEdit fontSize={20} />
              </MenuItem>
              <MenuItem gap={3} onClick={onDeleteOpen}>
                Delete <AiFillDelete fontSize={20} />
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Box>

      <Text>{comment.body}</Text>
      <Divider mt={2} />

      <Modal
        onClose={onEditClose}
        isOpen={isEditOpen}
        scrollBehavior={"inside"}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              minHeight={150}
              resize={"none"}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              gap={3}
              mt={3}
            >
              <Button onClick={handleEdit}>Submit</Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal onClose={onDeleteClose} isOpen={isDeleteOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this comment?</Text>
            <Text mb={10}>This action cannot be undone.</Text>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              gap={3}
              mt={4}
            >
              <Button onClick={onDeleteClose}>Cancel</Button>
              <Button colorScheme="red" onClick={handleDelete}>
                Delete
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CommentCard;