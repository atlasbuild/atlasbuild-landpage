"use client";

import { useSyncExternalStore } from "react";

function getServerSnapshot() {
  return false;
}

function getSnapshot() {
  return true;
}

function subscribe() {
  return () => {};
}

export function useHasMounted() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
