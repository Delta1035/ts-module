import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi,
  vitest,
} from "vitest";
import { debounce } from "./../debounce";

describe("debounce fn", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    // 每次测试之后，恢复所有的模拟
    vi.restoreAllMocks();
  });
  test("debounce func after 1s to call", (done) => {
    const mockFn = vitest.fn();
    const debounceFn = debounce(mockFn, 3000);
    debounceFn();
    debounceFn();
    debounceFn();
    vi.runAllTimers();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
