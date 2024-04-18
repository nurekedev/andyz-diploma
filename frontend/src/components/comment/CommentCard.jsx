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

const CommentCard = ({ id, lesson_slug, comment, data }) => {
   const [newComment, setNewComment] = useState(comment?.body);
   const {
     isOpen: isEditOpen,
     onOpen: onEditOpen,
     onClose: onEditClose
   } = useDisclosure(); // Edit modal
   const {
     isOpen: isDeleteOpen,
     onOpen: onDeleteOpen,
     onClose: onDeleteClose
   } = useDisclosure(); // Delete modal

  const edit = data?.id === comment?.created_by?.id;
  
   const handleSubmit = async (event) => {
     event.preventDefault();
     try {
       await PatchComment(`${id}`, lesson_slug, newComment, comment?.id);
       console.log("Review submitted successfully!");
       setNewComment(""); // Clear comment after successful edit
       onEditClose(); // Close edit modal
       location.reload();
     } catch (error) {
       console.error("Error submitting review:", error);
     }
   };

   const handleDeleteConfirmation = async () => {
     try {
       await DeleteData(`${id}${lesson_slug}/comments`, comment?.id);
       console.log("Comment deleted successfully!");
       // Consider additional actions after successful deletion (e.g., remove comment from UI, reload page)
     } catch (error) {
       console.error("Error deleting comment:", error);
     } finally {
       onDeleteClose(); // Close delete confirmation modal
       location.reload(); // Reload page after successful deletion
     }
   };

   return (
     <Box mb={"20px"} minW={320}>
       <Box display={"flex"} justifyContent={"space-between"}>
         {/* User info */}
         <Box display={"flex"} alignItems={"center"} gap={2}>
           <Avatar src={comment.created_by.avatar} size={"sm"} />
           <Text>{comment?.created_by?.full_name}</Text>
         </Box>

         {/* Edit/Delete menu (visible only for comment owner) */}
         {edit && (
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

       <Text>{comment?.body}</Text>
       <Divider mt={2} />

       {/* Edit modal */}
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
               <Button onClick={handleSubmit}>Submit</Button>
             </Box>
           </ModalBody>
         </ModalContent>
       </Modal>

       {/* Delete confirmation modal */}
       <Modal onClose={onDeleteClose} isOpen={isDeleteOpen} isCentered>
         <ModalOverlay />
         <ModalContent>
           <ModalHeader>Confirm Deletion</ModalHeader>
           <ModalCloseButton />
           <ModalBody>
             <Text >Are you sure you want to delete this comment?</Text>
             <Text mb={10}>This action cannot be undone.</Text>

             <Box
               display={"flex"}
               justifyContent={"space-between"}
               gap={3}
               mt={4}
             >
               <Button onClick={onDeleteClose}>Cancel</Button>
               <Button colorScheme="red" onClick={handleDeleteConfirmation}>
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
