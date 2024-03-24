import React from "react";
import Header from "../Header.tsx";
import PostList from "../PostList.tsx";

const Homepage: React.FC = () => {
  return (
    <>
      <Header />
      <PostList />
    </>
  );
};

export default Homepage;
