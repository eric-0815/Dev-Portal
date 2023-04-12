import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Navigate } from "react-router-dom";
import { render as rtlRender, screen } from "@testing-library/react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authenticationSlice } from "../../../slices/authenticationSlice";
import Landing from "..";

describe("Landing component", () => {
  function render(ui: any) {
    return rtlRender(ui, { wrapper: Wrapper })
  }

  let initialState = {
    authenticationState: {
      token: null, //localStorage.getItem('token'),
      isAuthenticated: false,
      loading: true,
      user: null
    },
  };

  const rootReducer = combineReducers({
    authenticationState: authenticationSlice.reducer,
  })

  function Wrapper({ children }: any) {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
    })
    return (
      <Provider store={store} >
        <Router>
          {children}
        </Router>
      </Provider >
    )
  }

  it("renders the landing component without crashing", () => {
    render(<Landing />);
    expect(screen.getByText("Developer Portal")).toBeInTheDocument();
  });

  it("renders the sign up and login buttons", () => {
    render(<Landing />);
    const signUpButton = screen.getByRole("link", { name: /Sign Up/i });
    const loginButton = screen.getByRole("link", { name: /Login/i });
    expect(signUpButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

});
