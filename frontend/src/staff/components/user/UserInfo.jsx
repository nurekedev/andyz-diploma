import { useParams } from "react-router-dom";
import useFetchData from "../../../services/api";

const UserInfo = () => {
    const { userId } = useParams();
    console.log(userId);
    const userData = useFetchData("/cm-users/custom-users", userId);
    console.log(userData);
  return <div>{userData?.full_name}</div>;
};

export default UserInfo;
