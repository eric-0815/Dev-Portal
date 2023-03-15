import React from "react";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { render as rtlRender, screen } from "@testing-library/react";
import Alert from "..";
import { alertSlice } from "../../../slices/alertSlice";
import { storeFactory } from "../../../mocks/storeFactory";


describe("Alert", () => {
  function render(ui: any) {
    return rtlRender(ui, { wrapper: Wrapper })
  }

  const initialState = {
    alertState: {
      alerts: [
        {
          id: "1",
          msg: "Test Alert 1",
          alertType: "success",
        },
        {
          id: "2",
          msg: "Test Alert 2",
          alertType: "danger",
        },
      ],
    },
  };

  const rootReducer = combineReducers({
    alertState: alertSlice.reducer,
  })

  function Wrapper({ children }: any) {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
    })
    return <Provider store={store} >{children}</Provider >
  }

  it("does not display alerts if there are none", () => {

    render(<Alert />);
    const alertElements = screen.queryAllByRole("alert");
    expect(alertElements.length).toEqual(0);
    expect(screen.getByText('Test Alert 1')).toBeInTheDocument();
    expect(screen.getByText('Test Alert 2')).toBeInTheDocument();
  });

});


// describe("Alert2222", () => {
//   function render(ui: any) {
//     return rtlRender(ui, { wrapper: Wrapper })
//   }

//   function Wrapper({ children }: any) {
//     const store = storeFactory({
//       alertState: {
//         alerts: [
//           { id: "1", msg: "Test alert 1", alertType: "success" },
//           { id: "2", msg: "Test alert 2", alertType: "danger" },
//         ]
//       }
//     })
//     return <Provider store={store} >{children}</Provider >
//   }


//   it("display alerts if there is any", () => {

//     render(<Alert />);
//     expect(screen.getByText('Test alert 1')).toBeInTheDocument();
//     expect(screen.getByText('Test alert 2')).toBeInTheDocument();
//   });
// });
