import { Grid } from "@mui/material";
import React from "react";
import {
  PostCard,
  PostContent,
  PostHeader,
  PostTitle,
  PostUser,
  PostDate,
} from "../styles/HomepageStyles";
import { Avatar, Button } from "@fattureincloud/fic-design-system";
import { useNavigate } from "react-router-dom";
import dateFormat from "dateformat";
import { useDispatch } from "react-redux";
import { deletePost } from "../postsSlice";

const PostsGrid = ({ posts, userInfo, handleEditModal, accessToken }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Grid container spacing={3}>
      {posts.map((post) => (
        <Grid
          item
          xs={12}
          md={4}
          key={post.id} // Make sure to add a unique key
        >
          <PostCard elevation="1" color="blue" type="secondary">
            <PostHeader>
              <PostTitle>{post.title}</PostTitle>
              <PostContent>{post.text.substring(0, 125)}...</PostContent>
              {post.user?.picture ? (
                <PostUser>
                  <Avatar size={32} image={post.user.picture} randomColor />
                  <p>{post.user.full_name}</p>
                </PostUser>
              ) : (
                <PostUser>
                  <Avatar size={32} text={post.user.full_name} randomColor />
                  <p>{post.user.full_name}</p>
                </PostUser>
              )}

              <PostDate>
                {dateFormat(post.created_at, "dddd, mmmm dS, yyyy")}
              </PostDate>
            </PostHeader>
            <p>{post.comments_count} comments</p>
            {userInfo?.id === post.user.id && (
              <>
                <Button
                  type="text"
                  text="Edit"
                  onClick={() =>
                    handleEditModal(post.title, post.text, post.id)
                  }
                ></Button>
                <Button
                  type="text"
                  text="Remove"
                  color="red"
                  onClick={() =>
                    dispatch(deletePost({ id: post.id, accessToken }))
                  }
                ></Button>
              </>
            )}
            <Button
              type="text"
              text="Details"
              onClick={() => navigate(`/posts/${post?.id}`)}
            ></Button>
          </PostCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default PostsGrid;
