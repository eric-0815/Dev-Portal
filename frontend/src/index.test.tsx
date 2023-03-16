import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import App from "./App";
import { store, persistor } from "./store/configureStore";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const mockStore = configureStore([thunk]);

describe("index", () => {
  it("renders the App component", () => {
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
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    );
    const appElement = screen.getByTestId("app");
    expect(appElement).toBeInTheDocument();
  });
});
