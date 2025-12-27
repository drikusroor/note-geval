import { describe, expect, test } from "bun:test";
import { render } from "@testing-library/react";
import { ThemeProvider } from "./ThemeProvider";
import React from "react";

describe("ThemeProvider", () => {
  test("renders children correctly", () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider attribute="class">
        <div data-testid="child">Test Child</div>
      </ThemeProvider>
    );
    expect(getByTestId("child")).toBeTruthy();
    expect(getByText("Test Child")).toBeTruthy();
  });
});