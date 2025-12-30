import { beforeEach, describe, expect, mock, test } from "bun:test";
import { renderHook } from "@testing-library/react";
import { settingsStore } from "../store/useSettings";
import { useAutoSave } from "./useAutoSave";

describe("useAutoSave", () => {
  beforeEach(() => {
    settingsStore.setState(() => ({
      isAutoSaveEnabled: true,
      autoSaveDelay: 50, // Short delay for tests
    }));
  });

  test("should trigger onSave after delay when dirty", async () => {
    const onSave = mock(() => {});
    renderHook(() => useAutoSave(onSave, "new content", true));

    expect(onSave).toHaveBeenCalledTimes(0);

    // Wait for more than 50ms
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(onSave).toHaveBeenCalledTimes(1);
  });

  test("should reset timer on content change", async () => {
    const onSave = mock(() => {});
    const { rerender } = renderHook(
      ({ content }) => useAutoSave(onSave, content, true),
      {
        initialProps: { content: "initial" },
      },
    );

    // Wait 30ms
    await new Promise((resolve) => setTimeout(resolve, 30));

    // Change content
    rerender({ content: "changed" });

    // Wait another 30ms (total 60ms from start, but only 30ms since last change)
    await new Promise((resolve) => setTimeout(resolve, 30));
    expect(onSave).toHaveBeenCalledTimes(0);

    // Wait another 40ms
    await new Promise((resolve) => setTimeout(resolve, 40));
    expect(onSave).toHaveBeenCalledTimes(1);
  });

  test("should not trigger if auto-save disabled", async () => {
    settingsStore.setState(() => ({
      isAutoSaveEnabled: false,
      autoSaveDelay: 50,
    }));

    const onSave = mock(() => {});
    renderHook(() => useAutoSave(onSave, "content", true));

    // Wait for more than 50ms
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(onSave).toHaveBeenCalledTimes(0);
  });

  test("should not trigger if not dirty", async () => {
    const onSave = mock(() => {});
    renderHook(() => useAutoSave(onSave, "content", false));

    // Wait for more than 50ms
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(onSave).toHaveBeenCalledTimes(0);
  });
});
