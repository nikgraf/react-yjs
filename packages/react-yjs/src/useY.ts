import { useRef, useSyncExternalStore } from "react";
import * as Y from "yjs";
import { deepEqual } from "./deepEqual.js";
import { YJsonValue } from "./types.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useY(yData: Y.Array<any>): any[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useY(yData: Y.Map<any>): Record<string, any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useY(yData: Y.XmlElement | Y.XmlFragment | Y.Text): string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useY(yData: any): any {
  const prevDataRef = useRef<YJsonValue | null>(null);
  return useSyncExternalStore(
    (callback) => {
      yData.observeDeep(callback);
      return () => yData.unobserveDeep(callback);
    },
    // Note: React requires reference equality
    () => {
      const data = yData.toJSON();
      if (deepEqual(prevDataRef.current, data)) {
        return prevDataRef.current;
      } else {
        prevDataRef.current = data;
        return prevDataRef.current;
      }
    },
    () => yData.toJSON()
  );
}
