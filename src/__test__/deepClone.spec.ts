// sum.test.js
import { expect, test } from "vitest";
import { deepClone } from "../deepClone";

test("deep clone number", () => {
  expect(deepClone(1)).toBe(1);
});

test("deep clone object", () => {
  const origin = { name: "zha" };
  const expected = deepClone(origin);
  expect(expected).toEqual(origin);
  expect(origin).not.toBe(expected);
});

test("deep clone array", () => {
  const origin = [1, 2, 3, { address: { city: "wuhan" } }];
  const expected = deepClone(origin);
  expect(expected).toEqual(origin);
  const r = expected === origin;
  console.log(r);

  expect(origin).not.toBe(expected);
});
