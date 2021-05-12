let assert = require("./assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let vectorize = require("./vectorize.js")

let sign = vectorize(function(x){
  try {
		if (x < 0) return -1
  	if (x > 0) return 1
  	return 0
	} catch(e) {
		return NaN
	}
})

module.exports = sign

// tests
if (!module.parent && typeof(window) === "undefined"){
  let random = require("./random.js")
  let normal = require("./normal.js")
  let round = require("./round.js")
  let set = require("./set.js")
  let sort = require("./sort.js")
  let chop = require("./chop.js")
  let scale = require("./scale.js")
  let add = require("./add.js")

  let x = sort(set(sign(chop(normal(10000)))).concat(0))
  assert(x[0] === -1 && x[1] === 0 && x[2] === 1, `sort(set(sign(chop(normal(10000))))) should be [-1, 0, 1]!`)

  x = sign(add(random(10000), 100))
  x.forEach(v => assert(v >= 0), `sign(add(random(10000), 100)) should only result in positive values!`)

  x = sign(scale(random(10000), -1))
  x.forEach(v => assert(v <= 0), `sign(scale(random(10000), -1)) should only result in negative values!`)

  let hasFailed

  try {
    hasFailed = false
    sign()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sign() should have failed!`)

  try {
    hasFailed = false
    sign("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sign("foo") should have failed!`)

  try {
    hasFailed = false
    sign(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sign(true) should have failed!`)

  try {
    hasFailed = false
    sign({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sign({}) should have failed!`)

  try {
    hasFailed = false
    sign(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sign(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    sign(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sign(foo) should have failed!`)

  try {
    hasFailed = false
    sign([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sign([1, 2, "three"]) should have failed!`)

  console.log("All tests passed!")
}
