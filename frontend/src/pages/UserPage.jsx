import { UserHeader } from "../components/UserHeader";
import { UserPost } from "../components/UserPost";

export default function UserPage() {
  return (
    <>
      <UserHeader />
      <UserPost
        likes={1200}
        replies={12}
        postImg={"./post1.png"}
        postTitle={"Hello guys~"}
      />
      <UserPost
        likes={456}
        replies={7678}
        postImg={"./post2.png"}
        postTitle={"Hello guys~"}
      />
      <UserPost
        likes={86}
        replies={12}
        postImg={"./post3.png"}
        postTitle={"Hello guys~"}
      />
    </>
  );
}
