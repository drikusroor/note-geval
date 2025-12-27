import { describe, expect, test, mock } from "bun:test";
import { render, fireEvent, waitFor } from "@testing-library/react";
import MobileNav from "./MobileNav";
import React from "react";

// Mock FileExplorer to avoid its dependencies
mock.module("./FileExplorer", () => ({
  default: () => <div data-testid="file-explorer">File Explorer</div>,
}));

describe("MobileNav", () => {
  test("toggles menu when button is clicked", async () => {
    const { queryByRole, getByLabelText, findByRole, getByTestId, getByRole } = render(<MobileNav />);
    
    // Initially, the dialog should not be in the document
    expect(queryByRole("dialog")).toBeNull();

    // Click toggle button
    const toggleButton = getByLabelText("Open menu");
    fireEvent.click(toggleButton);

    // Sidebar should now be visible (dialog role)
    const dialog = await findByRole("dialog");
    expect(dialog).toBeTruthy();
    expect(getByTestId("file-explorer")).toBeTruthy();

    // Click close button
    const closeButton = getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    // Wait for dialog to be removed
    await waitFor(() => {
      expect(queryByRole("dialog")).toBeNull();
    }, { timeout: 2000 });
  });
});
