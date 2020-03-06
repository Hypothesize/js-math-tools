let assert = require("../misc/assert.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let covariance = require("./covariance.js")
let std = require("./std.js")

function correl(x, y){
  assert(isArray(x) && isArray(y), "The `correl` function works on exactly two arrays!")
  assert(x.length === y.length, "The two arrays passed into the `correl` function must have the same length!")

  x.concat(y).forEach(function(value){
    assert(isNumber(value), "The two arrays passed into the `correl` function must contain only numbers!")
  })

  return covariance(x, y) / (std(x) * std(y))
}

module.exports = correl

// tests
if (!module.parent){
  let normal = require("./normal.js")
  let abs = require("./abs.js")
  let add = require("./add.js")
  let scale = require("./scale.js")

  let x = normal([10000])
  let y = normal([10000])
  let r = correl(x, y)

  assert(abs(r) < 0.05, `correl(normal([10000]), normal([10000])) should be approximately 0, but instead was ${r}!`)

  y = add(x, scale(0.01, normal([10000])))
  r = correl(x, y)
  assert(r > 0.95, `correl(x, x + 0.01 * normal([10000])) should be approximately 1, but instead was ${r}!`)

  y = add(scale(-1, x), scale(0.01, normal([10000])))
  r = correl(x, y)
  assert(r < -0.95, `correl(x, -x + 0.01 * normal([10000])) should be approximately -1, but instead was ${r}!`)

  let hasFailed = false

  try {
    correl(1, 2)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl(1, 2) should have failed!`)

  hasFailed = false

  try {
    correl(true, false)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl(true, false) should have failed!`)

  hasFailed = false

  try {
    correl([], {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl([], {}) should have failed!`)

  hasFailed = false

  try {
    correl("foo", "bar")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl("foo", "bar") should have failed!`)

  hasFailed = false

  try {
    correl([2, 3, 4], ["a", "b", "c"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl([2, 3, 4], ["a", "b", "c"]) should have failed!`)

  hasFailed = false

  try {
    correl([[2, 3, 4], [5, 6, 7]], [[8, 9, 10], [11, 12, 13]])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl([[2, 3, 4], [5, 6, 7]], [[8, 9, 10], [11, 12, 13]]) should have failed!`)

  let fn = () => {}
  hasFailed = false

  try {
    correl(fn, fn)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl(fn, fn) should have failed!`)

  assert(isNaN(correl([2, 3, 4], [1, 1, 1])), `correl([2, 3, 4], [1, 1, 1]) should have returned NaN!`)

  console.log("All tests passed!")
}