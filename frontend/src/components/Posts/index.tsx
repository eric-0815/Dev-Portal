import React, { useEffect } from "react";
import { getPostsAsync } from "../../slices/postSlice";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import PostItem from "./PostItem";

const Posts = () => {
  const dispatch = useAppDispatch();

  const { posts } = useAppSelector((state) => state.postState);

  useEffect(() => {
    dispatch(getPostsAsync());
  }, [dispatch]);

  return (
    <section className="container">
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      {/* <PostForm /> */}
      <div className="posts">
        {posts?.map((post: any) => (
          <PostItem key={post?._id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default Posts;
