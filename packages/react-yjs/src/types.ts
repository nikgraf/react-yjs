export type YJsonPrimitive = string | number | boolean | null | Uint8Array;

export type YJsonValue =
  | YJsonPrimitive
  | YJsonValue[]
  | {
      [key: string]: YJsonValue;
    };
