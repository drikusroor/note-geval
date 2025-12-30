import { GlobalWindow } from "happy-dom";
import { expect, afterEach } from "bun:test";
import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";

const window = new GlobalWindow();
global.window = window as any;
global.document = window.document as any;
global.navigator = window.navigator as any;
global.HTMLElement = window.HTMLElement as any;
global.HTMLInputElement = window.HTMLInputElement as any;
global.HTMLButtonElement = window.HTMLButtonElement as any;
global.HTMLAnchorElement = window.HTMLAnchorElement as any;
global.HTMLDivElement = window.HTMLDivElement as any;
global.HTMLSpanElement = window.HTMLSpanElement as any;
global.HTMLTextAreaElement = window.HTMLTextAreaElement as any;
global.HTMLSelectElement = window.HTMLSelectElement as any;
global.HTMLFormElement = window.HTMLFormElement as any;
global.Node = window.Node as any;
global.NodeFilter = window.NodeFilter as any;
global.MouseEvent = window.MouseEvent as any;
global.KeyboardEvent = window.KeyboardEvent as any;
global.FocusEvent = window.FocusEvent as any;
global.PointerEvent = window.PointerEvent as any;
global.SVGElement = window.SVGElement as any;
global.CustomEvent = window.CustomEvent as any;
global.MutationObserver = window.MutationObserver as any;
global.getComputedStyle = window.getComputedStyle.bind(window) as any;
global.requestAnimationFrame = window.requestAnimationFrame.bind(window) as any;
global.cancelAnimationFrame = window.cancelAnimationFrame.bind(window) as any;
global.DocumentFragment = window.DocumentFragment as any;
global.CharacterData = window.CharacterData as any;
global.Comment = window.Comment as any;
global.Text = window.Text as any;
global.Element = window.Element as any;
global.Event = window.Event as any;

// @ts-expect-error
expect.extend(matchers);

afterEach(() => {
  cleanup();
});
