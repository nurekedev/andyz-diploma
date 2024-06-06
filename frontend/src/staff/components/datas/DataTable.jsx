import { useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Avatar,
  Button,
  Text
} from "@chakra-ui/react";
import useUserStore from "../../../store/UserStore";
import PaginationComponent from "../../features/PaginationComponent";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const DataTable = () => {
  const { data, currentPage, itemsPerPage, fetchData, deleteUser } =
    useUserStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = async (id) => {
    try {
      const response = await deleteUser(id);
      if (response.status === 204) {
        console.log("User deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);

  return (
    <Box>
      {data.length === 0 ? (
        <Text>There is no data</Text>
      ) : (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th display={{ base: "none", md: "table-cell" }}>ID</Th>
                <Th display={{ base: "none", md: "table-cell" }}>Avatar</Th>
                <Th display={{ base: "none", xl: "table-cell" }}>Email</Th>
                <Th>Full Name</Th>
                <Th display={{ base: "none", md: "table-cell" }}>gender</Th>
                <Th display={{ base: "none", md: "table-cell" }}>Is active</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentData.map((item) => (
                <Tr key={item.id}>
                  <Td display={{ base: "none", md: "table-cell" }}>
                    {item.id}
                  </Td>
                  <Td display={{ base: "none", md: "table-cell" }}>
                    <Avatar src={item.avatar} />
                  </Td>
                  <Td display={{ base: "none", xl: "table-cell" }}>
                    <Link to={`${item.id}`}>{item.email}</Link>
                  </Td>
                  <Td>
                    <Link to={`${item.id}`}>
                      {item.first_name} {item.last_name}
                    </Link>
                  </Td>
                  <Td display={{ base: "none", md: "table-cell" }}>
                    <Link to={`${item.id}`}>{item.gender}</Link>
                  </Td>
                  <Td display={{ base: "none", md: "table-cell" }}>
                    {item.is_active ? (
                      <Text color={"green.500"}>Yes</Text>
                    ) : (
                      <Text color={"red.500"}>No</Text>
                    )}
                  </Td>
                  <Td>
                    <Button
                      bg={"red.400"}
                      color={"white"}
                      _hover={{
                        bg: "red.600"
                      }}
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                    >
                      <MdDelete fontSize={24} />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <PaginationComponent />
    </Box>
  );
};

export default DataTable;
