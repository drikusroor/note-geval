import { describe, expect, test } from "bun:test";
import { render, fireEvent } from "@testing-library/react";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "./sheet";
import React from "react";

describe("Sheet", () => {
  test("opens and closes correctly", async () => {
    const { queryByTestId, getByTestId, findByTestId, getByText, getByRole, queryByRole } = render(
      <Sheet>
        <SheetTrigger data-testid="trigger">Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
          <div data-testid="content">Content</div>
        </SheetContent>
      </Sheet>
    );

    expect(queryByTestId("content")).toBeNull();

    fireEvent.click(getByTestId("trigger"));

    const content = await findByTestId("content");
    expect(content).toBeTruthy();
    expect(getByText("Title")).toBeTruthy();

    fireEvent.click(getByRole("button", { name: /close/i }));
  });
});