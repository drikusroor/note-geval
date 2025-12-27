import { describe, expect, test, mock, beforeEach } from "bun:test";
import { render, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "./ThemeToggle";
import React from "react";

// Mock next-themes
const setThemeMock = mock(() => {});
mock.module("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: setThemeMock,
  }),
}));

// Mock Shadcn UI components to render content inline for testing
mock.module("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: any) => <div>{children}</div>,
  DropdownMenuTrigger: ({ children }: any) => <div>{children}</div>,
  DropdownMenuContent: ({ children }: any) => <div>{children}</div>,
  DropdownMenuItem: ({ children, onClick }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

describe("ThemeToggle", () => {
  beforeEach(() => {
    setThemeMock.mockClear();
  });

  test("calls setTheme when a theme option is selected", () => {
    const { getByText } = render(<ThemeToggle />);
    
    // Select Dark theme (button rendered by our mock)
    const darkOption = getByText(/dark/i);
    fireEvent.click(darkOption);

    expect(setThemeMock).toHaveBeenCalledWith("dark");
  });
});
