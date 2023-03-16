import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import App from "./App";

const mockStore = configureStore([thunk]);

describe("App", () => {
  it("renders Navbar component", () => {
    const store = mockStore({
      authenticationState: {
        isAuthenticated: false,
      },
      alertState: {
        alerts: [],
      },
    });
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const navbarElement = screen.getByRole("navigation");
    expect(navbarElement).toBeInTheDocument();
  });
});
