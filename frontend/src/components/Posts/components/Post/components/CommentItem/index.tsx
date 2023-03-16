import { Link } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../store/configureStore";
import formatDate from "../../../../../../utils/formatDate";
import { deleteCommentAsync } from "../../../../../../slices/postSlice";

const CommentItem = ({ comment, postId }: any) => {
  const { _id, text, name, avatar, date } = comment;

  const { user, loading } = useAppSelector(
    (state) => state.authenticationState
  );

  const dispatch = useAppDispatch();
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${comment.user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">Posted on {formatDate(date)}</p>
        {!loading && user === user._id && (
          <button
            onClick={() => dispatch(deleteCommentAsync({ postId, _id }))}
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

export default CommentItem;
