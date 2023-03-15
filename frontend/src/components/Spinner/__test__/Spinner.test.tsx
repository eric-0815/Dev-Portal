import React from "react";
import { render, screen } from "@testing-library/react";
import Spinner from "..";

describe("Spinner", () => {
  it("renders the spinner text", () => {
    render(<Spinner />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
