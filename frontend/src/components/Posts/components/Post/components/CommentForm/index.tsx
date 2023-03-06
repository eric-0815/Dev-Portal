import React, { useState } from "react";
import { useAppDispatch } from "../../../../../../store/configureStore";
import { addCommentAsync } from "../../../../../../slices/postSlice";

const CommentForm = ({ postId }: any) => {
  const [text, setText] = useState("");

  const dispatch = useAppDispatch();
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a Comment</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addCommentAsync({ postId, text }));
          setText("");
        }}
      >
        <textarea
          name="text"
          cols={30}
          rows={5}
          placeholder="Comment the post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default CommentForm;
