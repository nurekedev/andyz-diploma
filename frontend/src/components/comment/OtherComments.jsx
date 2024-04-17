import CommentCard from "./CommentCard";

const OtherComments = ({ comments, id, lesson_slug }) => {
  return (
    <div>
      {comments?.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          id={id}
          lesson_slug={lesson_slug}
        />
      ))}
    </div>
  );
};

export default OtherComments;
