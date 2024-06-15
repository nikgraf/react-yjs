// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, renderHook } from "@testing-library/react";
import { useEffect, useState } from "react";
import { afterEach, expect, test } from "vitest";
import * as Y from "yjs";
import { useY } from "./useY.js";

afterEach(() => {
  cleanup();
});

test("should return the initial empty yDoc", () => {
  const yDoc = new Y.Doc();
  const { result } = renderHook(() => {
    const yArray = yDoc.getArray("myList");
    const array = useY(yArray);

    return array;
  });

  expect(result.current).toStrictEqual([]);
});

test("should return the initial yDoc", () => {
  const yDoc = new Y.Doc();
  const yArray = yDoc.getArray("myList");
  yArray.insert(0, ["Alice"]);

  const { result } = renderHook(() => {
    const yArray = yDoc.getArray("myList");
    const array = useY(yArray);

    return array;
  });

  expect(result.current).toStrictEqual(["Alice"]);
});

test("should return the JSON data of the yDoc array", () => {
  const { result } = renderHook(() => {
    const [yDoc] = useState(() => new Y.Doc());
    const yArray = yDoc.getArray("myList");
    const array = useY(yArray);

    useEffect(() => {
      yArray.insert(0, ["Bob"]);
    }, []);

    return array;
  });

  expect(result.current).toStrictEqual(["Bob"]);
});

test("should return the JSON data of the yDoc map", () => {
  const { result } = renderHook(() => {
    const [yDoc] = useState(() => new Y.Doc());
    const yMap = yDoc.getMap("myMap");
    const map = useY(yMap);

    useEffect(() => {
      yMap.set("name", "Charlie");
    }, []);

    return map;
  });

  expect(result.current).toStrictEqual({ name: "Charlie" });
});

test("should return the JSON data of the yDoc text", () => {
  const { result } = renderHook(() => {
    const [yDoc] = useState(() => new Y.Doc());
    const yText = yDoc.getText("myText");
    const text = useY(yText);

    useEffect(() => {
      yText.insert(0, "David");
    }, []);

    return text;
  });

  expect(result.current).toStrictEqual("David");
});

test("should return the JSON data of the yDoc xml element", () => {
  const { result } = renderHook(() => {
    const [yDoc] = useState(() => new Y.Doc());
    const yXmlElement = yDoc.get("myElement", Y.XmlElement);
    const element = useY(yXmlElement);

    useEffect(() => {
      yXmlElement.insert(0, [new Y.XmlText("Eve")]);
    }, []);

    return element;
  });

  expect(result.current).toStrictEqual("<undefined>Eve</undefined>");
});

test("should return the JSON data of the yDoc xml fragment", () => {
  const { result } = renderHook(() => {
    const [yDoc] = useState(() => new Y.Doc());
    const yXmlFragment = yDoc.get("myFragment", Y.XmlFragment);
    const fragment = useY(yXmlFragment);

    useEffect(() => {
      yXmlFragment.insert(0, [new Y.XmlText("Frank")]);
    }, []);

    return fragment;
  });

  expect(result.current).toStrictEqual("Frank");
});
