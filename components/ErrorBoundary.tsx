"use client";

import { Component, type ReactNode } from "react";

// Minimal error boundary for decorative/non-essential subtrees. If a child
// throws (during render OR in an effect), we render an optional fallback
// instead of letting the error propagate up and unmount the whole page.
//
// This exists specifically so a WebGL/Three.js failure on a machine without
// hardware acceleration (corporate lockdowns, VMs, GPU blocklisted, a11y
// setups) degrades to a static background rather than blanking the site.
export default class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // Intentionally swallowed — the guarded subtree is decorative.
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}
