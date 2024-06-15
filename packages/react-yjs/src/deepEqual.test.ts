import { expect, test } from "vitest";
import { deepEqual } from "./deepEqual.js";

test("should return true for the same number", () => {
  expect(deepEqual(1, 1)).toBe(true);
});

test("should return false for different numbers", () => {
  expect(deepEqual(1, 2)).toBe(false);
});

test("should return true for the same string", () => {
  expect(deepEqual("hello", "hello")).toBe(true);
});

test("should return false for different strings", () => {
  expect(deepEqual("hello", "world")).toBe(false);
});

test("should return true for the same boolean", () => {
  expect(deepEqual(true, true)).toBe(true);
});

test("should return false for different booleans", () => {
  expect(deepEqual(true, false)).toBe(false);
});

test("should return true for both null", () => {
  expect(deepEqual(null, null)).toBe(true);
});

test("should return false for null and undefined", () => {
  // @ts-expect-error Testing for undefined
  expect(deepEqual(null, undefined)).toBe(false);
});

test("should return true for the same object", () => {
  const obj1 = { a: 1, b: [2, 3] };
  const obj2 = { a: 1, b: [2, 3] };
  expect(deepEqual(obj1, obj2)).toBe(true);
});

test("should return false for different objects", () => {
  const obj1 = { a: 1, b: [2, 3] };
  const obj2 = { a: 1, b: [2, 4] };
  expect(deepEqual(obj1, obj2)).toBe(false);
});

test("should return true for the same arrays", () => {
  const arr1 = [1, 2, 3];
  const arr2 = [1, 2, 3];
  expect(deepEqual(arr1, arr2)).toBe(true);
});

test("should return false for different arrays", () => {
  const arr1 = [1, 2, 3];
  const arr2 = [1, 2, 4];
  expect(deepEqual(arr1, arr2)).toBe(false);
});

test("should return true for the same Uint8Array", () => {
  const arr1 = new Uint8Array([1, 2, 3]);
  const arr2 = new Uint8Array([1, 2, 3]);
  expect(deepEqual(arr1, arr2)).toBe(true);
});

test("should return false for different Uint8Array", () => {
  const arr1 = new Uint8Array([1, 2, 3]);
  const arr2 = new Uint8Array([1, 2, 4]);
  expect(deepEqual(arr1, arr2)).toBe(false);
});

test("should return true for nested objects", () => {
  const obj1 = { a: { b: { c: 1 } } };
  const obj2 = { a: { b: { c: 1 } } };
  expect(deepEqual(obj1, obj2)).toBe(true);
});

test("should return false for different nested objects", () => {
  const obj1 = { a: { b: { c: 1 } } };
  const obj2 = { a: { b: { c: 2 } } };
  expect(deepEqual(obj1, obj2)).toBe(false);
});

test("should return false for objects with different keys", () => {
  const obj1 = { a: 1, b: 2 };
  const obj2 = { a: 1, c: 2 };
  expect(deepEqual(obj1, obj2)).toBe(false);
});

test("should return false for arrays of different lengths", () => {
  const arr1 = [1, 2, 3];
  const arr2 = [1, 2];
  expect(deepEqual(arr1, arr2)).toBe(false);
});
