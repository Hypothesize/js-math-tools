const { DataFrame, Series } = require("./dataframe")
const isArray = require("./is-array")
const normal = require("./normal")
class SubArray extends Array {}

test("tests that arrays can be identified correctly", () => {
  const selfReferencer = [2, 3, 4]
  selfReferencer.push(selfReferencer)

  const sub = new SubArray()
  sub.push("a")
  sub.push("b")
  sub.push("c")

  const rights = [
    selfReferencer,
    normal(100),
    normal([10, 10]),
    normal([2, 3, 4, 5]),
    sub,
  ]

  rights.forEach(item => {
    expect(isArray(item)).toBe(true)
  })

  const wrongs = [
    0,
    1,
    2.3,
    -2.3,
    Infinity,
    -Infinity,
    NaN,
    "foo",
    true,
    false,
    null,
    undefined,
    Symbol.for("Hello, world!"),
    x => x,
    function (x) {
      return x
    },
    { hello: "world" },
    new Series({ hello: [10, 20, 30, 40, 50] }),
    new DataFrame({ foo: [1, 2, 4, 8, 16], bar: [1, 3, 9, 27, 81] }),
  ]

  wrongs.forEach(item => {
    expect(isArray(item)).toBe(false)
  })
})
