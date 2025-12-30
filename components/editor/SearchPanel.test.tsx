/**
 * @jest-environment jsdom
 */

import { describe, expect, mock, test } from "bun:test";
import type { EditorView } from "@codemirror/view";
import { fireEvent, render } from "@testing-library/react";
import { SearchPanel } from "./SearchPanel";

describe("SearchPanel", () => {
  const mockOnClose = mock(() => {});
  const mockDispatch = mock((_tr: unknown) => {});
  const mockView = {
    dispatch: mockDispatch,
  } as unknown as EditorView;

  test("renders search input", () => {
    const { getByPlaceholderText } = render(
      <SearchPanel view={mockView} onClose={mockOnClose} />,
    );
    expect(getByPlaceholderText("Search...")).toBeTruthy();
  });

  test("calls onClose when X button is clicked", () => {
    const { getByRole } = render(
      <SearchPanel view={mockView} onClose={mockOnClose} />,
    );
    const closeButton = getByRole("button");
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("dispatches clear search effect on close", () => {
    const { getByRole } = render(
      <SearchPanel view={mockView} onClose={mockOnClose} />,
    );
    const closeButton = getByRole("button");
    fireEvent.click(closeButton);

    // Should have dispatched once with empty query
    expect(mockDispatch).toHaveBeenCalled();
  });

  test("dispatches search effect on input change", () => {
    const { getByPlaceholderText } = render(
      <SearchPanel view={mockView} onClose={mockOnClose} />,
    );
    const input = getByPlaceholderText("Search...");

    fireEvent.change(input, { target: { value: "test query" } });

    expect(mockDispatch).toHaveBeenCalled();
    // Use .value for current input value instead of .getAttribute("value")
    expect((input as HTMLInputElement).value).toBe("test query");
  });
});
