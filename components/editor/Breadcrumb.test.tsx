import { describe, expect, mock, test } from "bun:test";
import { fireEvent, render } from "@testing-library/react";
import { Breadcrumb } from "./Breadcrumb";

const expandRecursivelyMock = mock(() => {});

mock.module("@/lib/store/useExplorerStore", () => ({
  useExplorerStore: () => ({
    expandRecursively: expandRecursivelyMock,
  }),
}));

describe("Breadcrumb", () => {
  test("calls expandRecursively when clicking a directory segment", () => {
    const { getByText } = render(<Breadcrumb path="a/b/c.md" />);

    const segmentA = getByText("a");
    fireEvent.click(segmentA);

    expect(expandRecursivelyMock).toHaveBeenCalledWith("a");

    const segmentB = getByText("b");
    fireEvent.click(segmentB);

    expect(expandRecursivelyMock).toHaveBeenCalledWith("a/b");
  });

  test("does not call expandRecursively when clicking the last segment (file)", () => {
    expandRecursivelyMock.mockClear();
    const { getByText } = render(<Breadcrumb path="a/b/c.md" />);

    const segmentC = getByText("c.md");
    fireEvent.click(segmentC);

    expect(expandRecursivelyMock).not.toHaveBeenCalled();
  });

  test("truncates long paths", () => {
    const { getByText, queryByText } = render(
      <Breadcrumb path="one/two/three/four/five.md" />,
    );

    expect(getByText("one")).toBeTruthy();
    expect(getByText("...")).toBeTruthy();
    expect(getByText("four")).toBeTruthy();
    expect(getByText("five.md")).toBeTruthy();

    expect(queryByText("two")).toBeNull();
    expect(queryByText("three")).toBeNull();
  });
});
