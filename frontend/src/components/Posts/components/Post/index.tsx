import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../../store/configureStore";
import { getPostAsync } from "../../../../slices/postSlice";
import Spinner from "../../../Spinner";
import PostItem from "../PostItem";
import CommentForm from "./components/CommentForm";
import CommentItem from "./components/CommentItem";

const Post = () => {
  const { id } = useParams();

  const { post, loading } = useAppSelector((state) => state.postState);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) dispatch(getPostAsync(id));
  }, [dispatch, id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <section className="container">
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map((comment: any) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </section>
  );
};

export default Post;
