import { decrement, increment } from "../../../../slices/counterSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../store/configureStore";

const Contact = () => {
  const dispatch = useAppDispatch(); //useDispatch();
  const { data, title } = useAppSelector((state) => state.counterState); //useSelector((state: CounterState) => state);
  return (
    <div>
      <h5>{title}</h5>
      <h2>{data.toString()}</h2>
      <button onClick={() => dispatch(decrement(1))}>Decrement</button>
      <button onClick={() => dispatch(increment(1))}>Increment</button>
    </div>
  );
};

export default Contact;
