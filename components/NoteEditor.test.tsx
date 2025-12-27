import { describe, expect, test, mock, beforeEach } from "bun:test";
import { render, fireEvent, waitFor } from "@testing-library/react";
import NoteEditor from "./NoteEditor";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock Preview
mock.module("./Preview", () => ({
  default: ({ content }: any) => <div data-testid="preview-content">{content}</div>,
}));

mock.module("./InternalSearch", () => ({
  default: () => <div data-testid="internal-search">Search</div>,
}));

const createQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0,
    },
  },
});

describe("NoteEditor", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createQueryClient();
    // Mock global fetch
    global.fetch = mock((url: string) => {
      if (url.includes("/api/notes/")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ content: "Initial content" }),
        });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    }) as any;
  });

  test("toggles between edit and preview modes on mobile", async () => {
    // Force mobile width
    global.window.innerWidth = 500;
    
    const { getByLabelText, findByPlaceholderText, queryByTestId, queryByPlaceholderText, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <NoteEditor path="test.md" />
      </QueryClientProvider>
    );

    const textarea = await findByPlaceholderText("Start writing...");
    expect(textarea).toBeTruthy();
    
    // Initially in edit mode on mobile
    expect(queryByTestId("preview-content")).toBeNull();

    // Switch to preview
    const previewButton = getByLabelText("Preview mode");
    fireEvent.click(previewButton);

    expect(getByTestId("preview-content")).toBeTruthy();
    expect(queryByPlaceholderText("Start writing...")).toBeNull();
  });

  test("enables save button only when content changes", async () => {
    const { getByLabelText, findByPlaceholderText } = render(
      <QueryClientProvider client={queryClient}>
        <NoteEditor path="test.md" />
      </QueryClientProvider>
    );

    const textarea = await findByPlaceholderText("Start writing...") as HTMLTextAreaElement;
    
    await waitFor(() => expect(textarea.value).toBe("Initial content"));
    
    const saveButton = getByLabelText("Save note") as HTMLButtonElement;
    expect(saveButton.disabled).toBe(true);

    fireEvent.change(textarea, { target: { value: "Updated content" } });
    
    await waitFor(() => expect(saveButton.disabled).toBe(false), { timeout: 2000 });

    fireEvent.change(textarea, { target: { value: "Initial content" } });
    await waitFor(() => expect(saveButton.disabled).toBe(true), { timeout: 2000 });
  });
});
