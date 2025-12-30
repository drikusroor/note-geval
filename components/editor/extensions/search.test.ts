import { describe, expect, test } from "bun:test";
import { EditorState } from "@codemirror/state";
import { searchState, setSearchQuery } from "./search";

describe("search extension", () => {
  const extensions = [searchState];

  test("highlights matches when query is set", () => {
    const doc = "Hello world, hello again";
    let state = EditorState.create({
      doc,
      extensions,
    });

    // Apply search query effect
    state = state.update({
      effects: setSearchQuery.of("hello"),
    }).state;

    const { query, decorations } = state.field(searchState);
    expect(query).toBe("hello");

    let count = 0;
    decorations.between(0, doc.length, () => {
      count++;
    });

    expect(count).toBe(2); // "Hello" and "hello" (case-insensitive)
  });

  test("clears highlights when query is cleared", () => {
    const doc = "Hello world";
    let state = EditorState.create({
      doc,
      extensions,
    });

    state = state.update({ effects: setSearchQuery.of("hello") }).state;
    expect(state.field(searchState).query).toBe("hello");

    state = state.update({ effects: setSearchQuery.of("") }).state;
    expect(state.field(searchState).query).toBe("");

    let count = 0;
    state.field(searchState).decorations.between(0, doc.length, () => {
      count++;
    });
    expect(count).toBe(0);
  });
});
