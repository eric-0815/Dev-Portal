import { useState } from "react";
import { useAppDispatch } from "../../../../store/configureStore";
import { addPostAsync } from "../../../../slices/postSlice";

const PostForm = () => {
  const [text, setText] = useState("");

  const dispatch = useAppDispatch();

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addPostAsync({ text: text }));
          setText("");
        }}
      >
        <textarea
          name="text"
          cols={30}
          rows={5}
          placeholder="Create a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default PostForm;
