import { afterEach, expect } from "bun:test";
import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { GlobalWindow } from "happy-dom";

const window = new GlobalWindow();
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.window = window as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.document = window.document as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.navigator = window.navigator as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.HTMLElement = window.HTMLElement as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.HTMLInputElement = window.HTMLInputElement as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.HTMLButtonElement = window.HTMLButtonElement as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.HTMLAnchorElement = window.HTMLAnchorElement as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.HTMLDivElement = window.HTMLDivElement as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.HTMLSpanElement = window.HTMLSpanElement as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.HTMLTextAreaElement = window.HTMLTextAreaElement as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.HTMLSelectElement = window.HTMLSelectElement as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.HTMLFormElement = window.HTMLFormElement as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.Node = window.Node as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.NodeFilter = window.NodeFilter as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.MouseEvent = window.MouseEvent as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.KeyboardEvent = window.KeyboardEvent as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.FocusEvent = window.FocusEvent as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.PointerEvent = window.PointerEvent as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.SVGElement = window.SVGElement as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.CustomEvent = window.CustomEvent as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.MutationObserver = window.MutationObserver as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.getComputedStyle = window.getComputedStyle.bind(window) as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.requestAnimationFrame = window.requestAnimationFrame.bind(window) as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.cancelAnimationFrame = window.cancelAnimationFrame.bind(window) as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.DocumentFragment = window.DocumentFragment as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.CharacterData = window.CharacterData as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.Comment = window.Comment as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.Text = window.Text as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.Element = window.Element as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.Event = window.Event as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.localStorage = window.localStorage as any;
// biome-ignore lint/suspicious/noExplicitAny: polyfilling globals for happy-dom
global.sessionStorage = window.sessionStorage as any;

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
