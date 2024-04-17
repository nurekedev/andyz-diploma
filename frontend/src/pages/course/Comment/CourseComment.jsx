import { Box } from "@chakra-ui/react"
import Comment from "../../comment/Comment"
import { useParams } from "react-router-dom"

const CourseComment = () => {
  const { id } = useParams();
  return (
    <Box><Comment id={id} lessonSlug={""}/></Box>
  )
}

export default CourseComment