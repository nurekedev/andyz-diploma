import { Button, Flex } from "@chakra-ui/react";
import useStore from "../../store/UserStore";

const PaginationComponent = () => {
  const { currentPage, itemsPerPage, data, setPage } = useStore();
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setPage(currentPage + 1);
  };

  return (
    <Flex justify="center" mt="4">
      <Button onClick={handlePrev} disabled={currentPage === 1}>
        Previous
      </Button>
      <Button ml="4" onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </Button>
    </Flex>
  );
};

export default PaginationComponent;
