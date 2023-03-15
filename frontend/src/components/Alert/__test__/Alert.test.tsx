import React from "react";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { render as rtlRender, screen } from "@testing-library/react";
import Alert from "..";
import { alertSlice } from "../../../slices/alertSlice";


describe("Alert", () => {
  function render(ui: any) {
    return rtlRender(ui, { wrapper: Wrapper })
  }

  const rootReducer = combineReducers({
    alertState: alertSlice.reducer,
  })

  function Wrapper({ children }: any) {
    const store = configureStore({
      reducer: rootReducer
    })
    return <Provider store={store} >{children}</Provider >
  }

  it("does not display alerts if there are none", () => {

    render(<Alert />);
    const alertElements = screen.queryAllByRole("alert");
    expect(alertElements.length).toEqual(0);
  });

  // Add more tests here
});
