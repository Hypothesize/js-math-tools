const { random } = require("./random")
const cast = require("./cast")
const int = require("./int")
const isEqual = require("./is-equal")
const normal = require("./normal")
const range = require("./range")

test("tests that both individual values and arrays can be cast", () => {
  const date = new Date()

  expect(cast("true", "boolean")).toBe(true)
  expect(isEqual(cast(date.toJSON(), "date"), date)).toBe(true)
  expect(cast("undefined", "null")).toBe(null)
  expect(cast("234.567", "number")).toBe(234.567)
  expect(isEqual(cast(`{"foo": "bar"}`, "object"), { foo: "bar" })).toBe(true)
  expect(cast(234, "string")).toBe("234")
})

test("tests that the `cast` function correctly casts values into their specified data types", () => {
  // types = ["boolean", "date", "null", "number", "object", "string"]

  // booleans
  const bTrue = []

  const a = range(0, 100).map(() => {
    // true values
    if (random() < 0.5) {
      const possibleValues = [
        true,
        "true",
        "True",
        "TRUE",
        "yes",
        "YES",
        "Yes",
        "Y",
        "y",
      ]

      bTrue.push(true)
      return possibleValues[int(random() * possibleValues.length)]
    }

    // false values
    else {
      const possibleValues = [
        false,
        "false",
        "False",
        "FALSE",
        "no",
        "NO",
        "No",
        "N",
        "n",
      ]

      bTrue.push(false)
      return possibleValues[int(random() * possibleValues.length)]
    }
  })

  const bPred = cast(a, "boolean")
  expect(isEqual(bPred, bTrue)).toBe(true)

  // dates
  const dTrue = []

  const c = range(0, 100).map(() => {
    const date = new Date()
    date.setTime(int(random() * 100000 - 50000))
    dTrue.push(date)
    return random() < 0.5 ? date.toJSON() : date.toLocaleString()
  })

  const dPred = cast(c, "date")
  expect(isEqual(dPred, dTrue)).toBe(true)

  // nulls
  const e = range(0, 100).map(() => {
    const possibleValues = [
      "null",
      "none",
      "nan",
      "na",
      "n/a",
      "",
      "undefined",
      null,
      undefined,
    ]

    return possibleValues[int(random() * possibleValues.length)]
  })

  const fTrue = range(0, 100).map(() => null)
  const fPred = cast(e, "null")
  expect(isEqual(fPred, fTrue)).toBe(true)

  // numbers
  const hTrue = []

  const g = range(0, 100).map(() => {
    const r = normal() * 1000
    hTrue.push(r)
    return random() < 0.5 ? r : r.toString()
  })

  const hPred = cast(g, "number")
  expect(isEqual(hPred, hTrue)).toBe(true)

  // object
  const jTrue = []

  const i = range(0, 100).map(() => {
    const obj = {
      x: random(),
      y: random(),
    }

    jTrue.push(obj)
    return JSON.stringify(obj)
  })

  const jPred = cast(i, "object")
  expect(isEqual(jPred, jTrue)).toBe(true)

  // strings
  const k = range(0, 100).map(() => random().toString())
  const lTrue = k.map(v => v.toString())
  const lPred = cast(k, "string")
  expect(isEqual(lPred, lTrue)).toBe(true)
})

test("tests that missing values are correctly cast as null or NaN", () => {
  // types = ["boolean", "date", "null", "number", "object", "string"]

  // booleans
  const a = ["true", null, "false"]
  const bTrue = [true, null, false]
  const bPred = cast(a, "boolean")
  expect(isEqual(bPred, bTrue)).toBe(true)

  const c = [
    new Date(1234567890123).toJSON(),
    undefined,
    new Date(12345678901234).toJSON(),
  ]

  // dates
  const dTrue = [new Date(1234567890123), null, new Date(12345678901234)]
  const dPred = cast(c, "date")
  expect(isEqual(dPred, dTrue)).toBe(true)

  // nulls
  const e = [234, "hello", false]
  const fTrue = [null, null, null]
  const fPred = cast(e, "null")
  expect(isEqual(fPred, fTrue)).toBe(true)

  // numbers
  const g = ["234", "NaN", null, Infinity, "Infinity", "three"]
  const hTrue = [234, NaN, NaN, Infinity, Infinity, NaN]
  const hPred = cast(g, "number")
  expect(isEqual(hPred, hTrue)).toBe(true)

  // objects
  const i = [
    JSON.stringify({ hello: "world" }),
    "",
    undefined,
    JSON.stringify({ foo: "bar" }),
    null,
  ]

  const jTrue = [{ hello: "world" }, null, null, { foo: "bar" }, null]
  const jPred = cast(i, "object")
  expect(isEqual(jPred, jTrue)).toBe(true)

  // strings
  const k = [234, { hello: "world" }, "", undefined]
  const lTrue = ["234", JSON.stringify({ hello: "world" }), null, null]
  const lPred = cast(k, "string")
  expect(isEqual(lPred, lTrue)).toBe(true)
})
