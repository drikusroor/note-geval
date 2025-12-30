import { beforeEach, describe, expect, mock, test } from "bun:test";
import { fireEvent, render } from "@testing-library/react";
import { ThemeToggle } from "./ThemeToggle";

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
  // biome-ignore lint/suspicious/noExplicitAny: mock components
  DropdownMenu: ({ children }: any) => <div>{children}</div>,
  // biome-ignore lint/suspicious/noExplicitAny: mock components
  DropdownMenuTrigger: ({ children }: any) => <div>{children}</div>,
  // biome-ignore lint/suspicious/noExplicitAny: mock components
  DropdownMenuContent: ({ children }: any) => <div>{children}</div>,
  // biome-ignore lint/suspicious/noExplicitAny: mock components
  DropdownMenuItem: ({ children, onClick }: any) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
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
