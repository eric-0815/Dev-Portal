import { AuthenticationState, authenticationSlice, loadUserAsync } from "../authenticationSlice";

describe('authenticationSlice', () => {
  const initialState: AuthenticationState = {
    token: null,
    isAuthenticated: false,
    loading: true,
    user: null,
  };

  // it.only('should handle loadUserAsync fulfilled', () => {
  //   const payload = { name: 'test', token: '123' };

  //   const previousState: AuthenticationState = {
  //     token: null,
  //     isAuthenticated: false,
  //     loading: true,
  //     user: null,
  //   };

  //   const action = {
  //     type: loadUserAsync.fulfilled.type,
  //     payload,
  //   };

  //   const newState = authenticationSlice.reducer(previousState, action);

  //   expect(newState.user).toEqual(payload);
  //   expect(newState.isAuthenticated).toBe(true);
  //   expect(newState.loading).toBe(false);
  // });

  it('should handle authSuccess', () => {
    const payload = { name: 'test', token: '123' };
    const newState = authenticationSlice.reducer(initialState, {
      type: 'authentication/authSuccess',
      payload,
    });

    expect(newState.token).toBe(payload.token);
    expect(newState.user).toBe(payload.name);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.loading).toBe(false);
  });

  it('should handle authFailOrLogout', () => {
    const newState = authenticationSlice.reducer(initialState, {
      type: 'authentication/authFailOrLogout',
    });

    expect(newState.token).toBe(null);
    expect(newState.user).toBe(null);
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.loading).toBe(false);
  });
});
