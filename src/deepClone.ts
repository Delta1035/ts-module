/**
 *
 * @param obj y要拷贝的对象
 * @param map 用于存储循环引用的对象的地址
 */
export function deepClone(obj: Object = {}, map: Map<any, any> = new Map()) {
  if (typeof obj !== "object") {
    // 当不等于
    return obj;
  }
  const result =
    obj instanceof Array ||
    Object.prototype.toString.call(obj) === "[object Array]"
      ? []
      : {};
  // 记录一下obj的引用
  map.set(obj, result);
  for (const k in obj) {
    if (obj.hasOwnProperty(k)) {
      const value = obj[k as keyof typeof obj];
      // @ts-ignore
      result[k] = deepClone(value, map) as any;
    }
  }

  return result;
}
