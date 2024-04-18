import CommentCard from "./CommentCard";

const OtherComments = ({ comments, id, lesson_slug, data }) => {
  
  return (
    <div>
      {comments?.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          id={id}
          lesson_slug={lesson_slug}
          data={data}
        />
      ))}
    </div>
  );
};

export default OtherComments;
