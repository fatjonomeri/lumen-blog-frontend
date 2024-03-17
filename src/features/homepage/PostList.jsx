import { Button } from "@fattureincloud/fic-design-system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchPosts } from "./postsSlice";

const PostList = () => {
  const { status, posts, error } = useSelector((state) => state.posts);
  const { userInfo, accessToken } = useSelector((state) => state.auth);
  console.log("🚀 ~ PostList ~ accessToken:", accessToken);

  const dispatch = useDispatch();

  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.text.substring(0, 75)}...</p>
          <p>{post.comments_count} comments</p>
          {userInfo?.id === post.user.id && (
            <>
              <Button text="Edit"></Button>
              <Button
                text="Remove"
                color="red"
                onClick={() =>
                  dispatch(deletePost({ id: post.id, accessToken })).then(() =>
                    dispatch(fetchPosts())
                  )
                }
              ></Button>
            </>
          )}
        </article>
      ))}
    </div>
  );
};

export default PostList;
