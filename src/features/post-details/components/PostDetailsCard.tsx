import React from "react";
import {
  PostDate,
  PostDetailCard,
  PostUser,
} from "../styles/PostDetailsStyles";
import { FormTitle } from "../../auth/styles/LoginStyles";
import dateFormat from "dateformat";
import { Avatar } from "@fattureincloud/fic-design-system";
import { Post } from "../../homepage/postsSlice.ts";

const PostDetailsCard: React.FC<Post> = ({ data }) => {
  return (
    <PostDetailCard elevation="1" color="blue" type="secondary">
      <FormTitle>{data?.title}</FormTitle>
      <p>{data?.text}</p>
      {data?.user.picture ? (
        <PostUser>
          <p>Posted by </p>
          <Avatar size={32} image={data?.user.picture} randomColor />
          <p>{data?.user.full_name} </p>
          <PostDate>
            on {dateFormat(data?.created_at, "dddd, mmmm dS, yyyy")}
          </PostDate>
        </PostUser>
      ) : (
        <PostUser>
          <p>Posted by </p>
          <Avatar size={32} text={data?.user.full_name} randomColor />
          <p>{data?.user.full_name}</p>
          <PostDate>
            on {dateFormat(data?.created_at, "dddd, mmmm dS, yyyy")}
          </PostDate>
        </PostUser>
      )}
    </PostDetailCard>
  );
};

export default PostDetailsCard;
