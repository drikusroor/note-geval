import { describe, expect, test, mock, afterAll } from "bun:test";
import { render } from "@testing-library/react";
import DashboardLayout from "./layout";

// Mock child components
mock.module("@/components/FileExplorer", () => ({
  default: () => <div data-testid="file-explorer">File Explorer</div>,
}));
mock.module("@/components/FileSearch", () => ({
  default: () => <div data-testid="file-search">File Search</div>,
}));
mock.module("@/components/SearchDialog", () => ({
  default: () => <div data-testid="search-dialog">Search Dialog</div>,
}));

afterAll(() => {
  mock.restore();
});

describe("DashboardLayout", () => {
  test("renders both sidebars and main content", () => {
    const { getByTestId } = render(
      <DashboardLayout>
        <div data-testid="children">Children</div>
      </DashboardLayout>
    );

    expect(getByTestId("file-explorer")).toBeTruthy();
    expect(getByTestId("mobile-nav")).toBeTruthy();
    expect(getByTestId("children")).toBeTruthy();
  });

  test("desktop sidebar is hidden on small screens via CSS", () => {
    const { getByTestId } = render(
      <DashboardLayout>
        <div data-testid="children">Children</div>
      </DashboardLayout>
    );
    
    const desktopAside = getByTestId("file-explorer").parentElement;
    expect(desktopAside?.className).toContain("hidden");
    expect(desktopAside?.className).toContain("md:block");
  });
});