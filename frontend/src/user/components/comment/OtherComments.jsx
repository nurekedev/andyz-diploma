import CommentCard from "./CommentCard";

const OtherComments = ({ comments, id, lesson_slug, data }) => {
  return (
    <div>
      {comments
        .map((comment) => (
          <CommentCard
            key={comment.id}
            course_slug={id}
            lesson_slug={lesson_slug}
            comment={comment}
            data={data}
          />
        ))}
    </div>
  );
};

export default OtherComments;
