import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import App from "../App";

describe("App Component", () => {
  it("should render input and button plus and minus", () => {
    render(<App />);
    expect(screen.getByTestId("amount-input")).toBeInTheDocument();
    expect(screen.getByTestId("plus-button")).toBeInTheDocument();
    expect(screen.getByTestId("minus-button")).toBeInTheDocument();
  });

  it("should not allow non-numeric or negative values in the input", () => {
    render(<App />);
    const input = screen.getByTestId("amount-input");

    fireEvent.change(input, { target: { value: "abc" } });
    expect(input).toHaveValue("");

    fireEvent.change(input, { target: { value: "-10" } });
    expect(input).toHaveValue("");

    fireEvent.change(input, { target: { value: "0" } });
    expect(input).toHaveValue("");

    fireEvent.change(input, { target: { value: "100" } });
    expect(input).toHaveValue("100");
  });

  it("should add a new transaction when plus button is clicked", () => {
    render(<App />);
    const input = screen.getByTestId("amount-input");
    const plusButton = screen.getByTestId("plus-button");

    fireEvent.change(input, { target: { value: "200" } });
    fireEvent.click(plusButton);

    expect(screen.getByText("New Transaction")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
  });

  it("should add a new transaction when minus button is clicked", () => {
    render(<App />);
    const input = screen.getByTestId("amount-input");
    const minusButton = screen.getByTestId("minus-button");

    fireEvent.change(input, { target: { value: "150" } });
    fireEvent.click(minusButton);

    expect(screen.getByText("New Transaction")).toBeInTheDocument();
    expect(screen.getByText("-150")).toBeInTheDocument();
  });
});
