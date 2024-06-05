import { useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Box,
  Avatar
} from "@chakra-ui/react";
import useUserStore from "../../../store/UserStore";
import PaginationComponent from "../../features/PaginationComponent";
import { Link } from "react-router-dom";

const DataTable = () => {
  const { data, currentPage, itemsPerPage, fetchData } = useUserStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box>
      {data.length === 0 ? (
        <Spinner />
      ) : (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Avatar</Th>
                <Th>Email</Th>
                <Th>Full Name</Th>
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
