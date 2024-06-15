import { YJsonValue } from "./types.js";

export const deepEqual = (a: YJsonValue, b: YJsonValue): boolean => {
  // handle null and undefined
  if (a === null || b === null) return a === b;
  if (typeof a === "undefined" || typeof b === "undefined") return a === b;

  // handle simple types
  if (typeof a !== "object" && typeof b !== "object") return a === b;
  if (typeof a !== typeof b) return false;

  // handle arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      // @ts-expect-error - a and b are arrays
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  // handle Uint8Array
  if (a instanceof Uint8Array && b instanceof Uint8Array) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  // handle objects
  if (typeof a === "object" && typeof b === "object") {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    for (const key of aKeys) {
      if (!(key in b)) return false;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!deepEqual((a as any)[key], (b as any)[key])) return false;
    }
    return true;
  }

  return false;
};
