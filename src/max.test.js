const max = require("./max.js")
const normal = require("./normal.js")
const { random } = require("./random.js")

test("gets the max of arrays of values of mixed types", () => {
  expect(max([2, 3, 4])).toBe(4)
  expect(max([-10, -5, -20])).toBe(-5)
  expect(max(random([10, 10, 10, 10]))).toBeLessThanOrEqual(1)
  expect(max(random([10, 10, 10, 10]))).toBeGreaterThanOrEqual(0)
  expect(max([2, 3, "four"])).toBe(3)
  expect(max([null, undefined, 3])).toBe(3)
  expect(max([true, false])).toBe(true)
  expect(max([-Infinity, Infinity, 0])).toBe(Infinity)
})

test("returns NaN when attempting to get the max of non-arrays", () => {
  expect(max()).toBeNaN()
  expect(max("foo")).toBeNaN()
  expect(max(null)).toBeNaN()
  expect(max(undefined)).toBeNaN()
  expect(max(() => {})).toBeNaN()
  expect(max({})).toBeNaN()
  expect(max([])).toBeNaN()
  expect(max(true)).toBeNaN()
  expect(max(false)).toBeNaN()
})
