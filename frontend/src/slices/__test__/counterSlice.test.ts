import { counterSlice } from '../counterSlice';

describe('counterSlice', () => {
  it('should increment data when calling increment action', () => {
    const initialState = { title: '', data: 0 };
    const newState = counterSlice.reducer(initialState, counterSlice.actions.increment(2));
    expect(newState.data).toEqual(2);
  });

  it('should decrement data when calling decrement action', () => {
    const initialState = { title: '', data: 4 };
    const newState = counterSlice.reducer(initialState, counterSlice.actions.decrement(2));
    expect(newState.data).toEqual(2);
  });
});
