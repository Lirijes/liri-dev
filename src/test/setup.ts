import "@testing-library/jest-dom";

// jsdom has no IntersectionObserver; framer-motion's whileInView needs one.
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
Object.defineProperty(window, "IntersectionObserver", { writable: true, value: IntersectionObserverStub });
Object.defineProperty(globalThis, "IntersectionObserver", { writable: true, value: IntersectionObserverStub });

// Each test starts without a saved language and with a clean URL.
import { afterEach } from "vitest";
afterEach(() => {
  window.localStorage.clear();
  window.history.replaceState(null, "", "/");
  document.documentElement.lang = "";
});

// jsdom doesn't implement scrolling; the page scrolls after view changes.
Element.prototype.scrollIntoView = () => {};
window.scrollTo = (() => {}) as typeof window.scrollTo;

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
