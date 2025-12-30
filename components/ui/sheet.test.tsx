import { describe, expect, test } from "bun:test";
import { fireEvent, render } from "@testing-library/react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./sheet";

describe("Sheet", () => {
  test("opens and closes correctly", async () => {
    const { queryByTestId, getByTestId, findByTestId, getByText, getByRole } =
      render(
        <Sheet>
          <SheetTrigger data-testid="trigger">Open</SheetTrigger>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
            <div data-testid="content">Content</div>
          </SheetContent>
        </Sheet>,
      );

    expect(queryByTestId("content")).toBeNull();

    fireEvent.click(getByTestId("trigger"));

    const content = await findByTestId("content");
    expect(content).toBeTruthy();
    expect(getByText("Title")).toBeTruthy();

    fireEvent.click(getByRole("button", { name: /close/i }));
  });
});
