let assert = require("./assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let flatten = require("./flatten.js")
let sum = require("./sum.js")
let dropNaN = require("./drop-nan.js")

function mean(arr){
  try {
		let temp = dropNaN(flatten(arr))
  	if (temp.length === 0) return NaN
  	return sum(temp) / temp.length
	} catch(e) {
		return NaN
	}
}

module.exports = mean

// tests
if (!module.parent && typeof(window) === "undefined"){
  let normal = require("./normal.js")
  let random = require("./random.js")
  let abs = require("./abs.js")

  let x = [2, 3, 4]
  let yTrue = 3
  let yPred = mean(x)
  assert(yTrue === yPred, `mean(2, 3, 4) should be 3, but instead is ${yPred}!`)

  x = normal([10000])
  yPred = mean(x)
  assert(abs(yPred) < 0.05, `mean(normal([10000])) should be approximately 0, but instead was ${yPred}!`)

  x = random([10000])
  yPred = mean(x)
  assert(yPred - 0.5 < 0.05, `mean(random([10000])) should be approximately 0.5, but instead was ${yPred}!`)

  x = normal([10, 10, 10, 10])
  yPred = mean(x)
  assert(abs(yPred) < 0.05, `mean(normal([10, 10, 10, 10])) should be approximately 0, but instead was ${yPred}!`)

  let hasFailed

  try {
    hasFailed = false
    mean()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mean() should have failed!`)

  try {
    hasFailed = false
    mean("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mean("foo") should have failed!`)

  try {
    hasFailed = false
    mean({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mean({}) should have failed!`)

  try {
    hasFailed = false
    mean(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mean(true) should have failed!`)

  try {
    let foo
    hasFailed = false
    mean(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mean(foo) should have failed!`)

  try {
    hasFailed = false
    mean(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mean(() => {}) should have failed!`)

  try {
    hasFailed = false
    mean([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(!hasFailed, `mean([1, 2, "three"]) should have failed!`)

  console.log("All tests passed!")
}
