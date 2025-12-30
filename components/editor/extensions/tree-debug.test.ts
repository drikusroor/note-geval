import { test } from "bun:test";
import { EditorState } from "@codemirror/state";
import { markdown } from "@codemirror/lang-markdown";
import { syntaxTree } from "@codemirror/language";

test("dump tree", () => {
  const doc = "*italic*";
  const state = EditorState.create({
    doc,
    extensions: [markdown()]
  });

  syntaxTree(state).iterate({
    enter: (node) => {
      console.log(`Node: ${node.name} [${node.from}-${node.to}]`);
    }
  });
});
