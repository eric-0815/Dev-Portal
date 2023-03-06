import React from "react";
import { Link } from "react-router-dom";
import formatDate from "../../../utils/formtDate";
import { useAppSelector } from "../../../store/configureStore";
// import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({ post }: any) => {
  const { _id, text, name, avatar, likes, comments, date } = post;

  const { user, loading } = useAppSelector(
    (state) => state.authenticationState
  );

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${post?.user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">Posted on {formatDate(date)}</p>

        <button
          //onClick={() => addLike(_id)}
          type="button"
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-up" />{" "}
          <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
        </button>
        <button
          //onClick={() => removeLike(_id)}
          type="button"
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-down" />
        </button>
        <Link to={`/posts/${_id}`} className="btn btn-primary">
          Discussion{" "}
          {comments.length > 0 && (
            <span className="comment-count">{comments.length}</span>
          )}
        </Link>
        {!loading && post?.user === user._id && (
          <button
            //onClick={() => deletePost(_id)}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PostItem;
