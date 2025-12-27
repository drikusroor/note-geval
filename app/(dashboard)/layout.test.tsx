import { describe, expect, test, mock } from "bun:test";
import { render } from "@testing-library/react";
import DashboardLayout from "./layout";
import React from "react";

// Mock child components
mock.module("@/components/FileExplorer", () => ({
  default: () => <div data-testid="file-explorer">File Explorer</div>,
}));
mock.module("@/components/FileSearch", () => ({
  default: () => <div data-testid="file-search">File Search</div>,
}));
mock.module("@/components/MobileNav", () => ({
  default: () => <div data-testid="mobile-nav">Mobile Nav</div>,
}));
mock.module("@/components/SearchDialog", () => ({
  default: () => <div data-testid="search-dialog">Search Dialog</div>,
}));

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