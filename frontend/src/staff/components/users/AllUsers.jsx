import useFetchData from "../../../services/api";


const AllUsers = () => {
  const users = useFetchData("cm-users/custom-users", "");
    console.log(users);
  return <div>{}</div>;
}

export default AllUsers