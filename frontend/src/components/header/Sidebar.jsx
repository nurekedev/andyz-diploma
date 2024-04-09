import {Box} from "@chakra-ui/react"
import {useParams} from "react-router-dom"
import { useDetailCourseData } from "../../requests/CourseDetail";


const Sidebar = () => {
    const { id } = useParams();
    const courseDetailData = useDetailCourseData(id);
    
  return (
    <Box>
          
    </Box>
  )
}

export default Sidebar