import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("https://socio-blog.onrender.com/post/", {
      method: "GET",
      headers: { Authorization: `${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `https://socio-blog.onrender.com/post/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `${token}` },
      }
    );

    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };
  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({ _id, userId, userName, content, location, likes, comments }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${userName}`}
            content={content}
            location={location}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
