import { rootReducer, store } from '../configureStore';
import { increment } from "../../slices/counterSlice";

describe('store configuration', () => {
  it('should have the correct initial state', () => {
    const expectedState = {
      counterState: {
        title: 'YARC (yet another redux counter with redux toolkit)',
        data: 42
      },
      alertState: { alerts: [] },
      authenticationState: { token: null, isAuthenticated: false, loading: true, user: null },
      profileState: { profile: null, profiles: [], repos: [], loading: true, error: {} },
      postState: { posts: [], post: null, loading: true, error: {} },
      _persist: { version: -1, rehydrated: true }
    }
    expect(store.getState()).toEqual(expectedState);
  });

  it('should update the state correctly', () => {
    store.dispatch(increment(1));
    expect(store.getState().counterState.data).toEqual(43);
  });
});

describe('rootReducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      counterState: {
        title: 'YARC (yet another redux counter with redux toolkit)',
        data: 42
      },
      alertState: { alerts: [] },
      authenticationState: { token: null, isAuthenticated: false, loading: true, user: null },
      profileState: { profile: null, profiles: [], repos: [], loading: true, error: {} },
      postState: { posts: [], post: null, loading: true, error: {} },
    };
    // @ts-ignore
    expect(rootReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle counter/increment', () => {
    store.dispatch(increment(1));
    const expectedState = {
      counterState: {
        title: 'YARC (yet another redux counter with redux toolkit)',
        data: 43
      },
      alertState: { alerts: [] },
      authenticationState: { token: null, isAuthenticated: false, loading: true, user: null },
      profileState: { profile: null, profiles: [], repos: [], loading: true, error: {} },
      postState: { posts: [], post: null, loading: true, error: {} },
    };
    //@ts-ignore
    expect(rootReducer(undefined, increment(1))).toEqual(expectedState);
  });
});
