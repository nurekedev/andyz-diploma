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

  return (
    <Box>
      {data.length === 0 ? (
        <Text>There is no data</Text>
      ) : (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Avatar</Th>
                <Th>Email</Th>
                <Th>Full Name</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentData.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.id}</Td>
                  <Td>
                    <Avatar src={item.avatar} />
                  </Td>
                  <Td>
                    <Link to={`${item.id}`}>{item.email}</Link>
                  </Td>
                  <Td>{item.full_name}</Td>
                  <Td>
                    <Button
                      bg={"red.500"}
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
