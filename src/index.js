const { DataFrame, Series } = require("./dataframe")

const out = {
  abs: require("./abs.js"),
  add: require("./add.js"),
  append: require("./append.js"),
  apply: require("./apply.js"),
  arccos: require("./arccos.js"),
  arcsin: require("./arcsin.js"),
  arctan: require("./arctan.js"),
  argmax: require("./argmax.js"),
  argmin: require("./argmin.js"),
  assert: require("./assert.js"),
  ceil: require("./ceil.js"),
  chop: require("./chop.js"),
  clamp: require("./clamp.js"),
  cohensd: require("./cohens-d.js"),
  combine: require("./combine.js"),
  copy: require("./copy.js"),
  correl: require("./correl.js"),
  cos: require("./cos.js"),
  count: require("./count.js"),
  covariance: require("./covariance.js"),
  DataFrame,
  diff: require("./diff.js"),
  distance: require("./distance.js"),
  divide: require("./divide.js"),
  dot: require("./dot.js"),
  dropMissing: require("./drop-missing.js"),
  dropMissingPairwise: require("./drop-missing-pairwise.js"),
  dropNaN: require("./drop-nan.js"),
  dropNaNPairwise: require("./drop-nan-pairwise.js"),
  exp: require("./exp.js"),
  factorial: require("./factorial.js"),
  flatten: require("./flatten.js"),
  float: require("./float.js"),
  floor: require("./floor.js"),
  getValueAt: require("./get-value-at.js"),
  identity: require("./identity.js"),
  indexOf: require("./index-of.js"),
  int: require("./int.js"),
  intersect: require("./intersect.js"),
  inverse: require("./inverse.js"),
  isArray: require("./is-array.js"),
  isBoolean: require("./is-boolean.js"),
  isEqual: require("./is-equal.js"),
  isFunction: require("./is-function.js"),
  isNumber: require("./is-number.js"),
  isObject: require("./is-object.js"),
  isString: require("./is-string.js"),
  isUndefined: require("./is-undefined.js"),
  lerp: require("./lerp.js"),
  log: require("./log.js"),
  map: require("./map.js"),
  MathError: require("./math-error.js"),
  max: require("./max.js"),
  mean: require("./mean.js"),
  median: require("./median.js"),
  min: require("./min.js"),
  mode: require("./mode.js"),
  multiply: require("./multiply.js"),
  ndarray: require("./ndarray.js"),
  normal: require("./normal.js"),
  ones: require("./ones.js"),
  permute: require("./permute.js"),
  pow: require("./pow.js"),
  print: require("./print.js"),
  random: require("./random.js").random,
  range: require("./range.js"),
  reshape: require("./reshape.js"),
  reverse: require("./reverse.js"),
  round: require("./round.js"),
  scale: require("./scale.js"),
  seed: require("./random.js").seed,
  Series,
  set: require("./set.js"),
  setValueAt: require("./set-value-at.js"),
  shape: require("./shape.js"),
  shuffle: require("./shuffle.js"),
  sign: require("./sign.js"),
  sin: require("./sin.js"),
  slice: require("./slice.js"),
  sort: require("./sort.js"),
  sqrt: require("./sqrt.js"),
  std: require("./std.js"),
  stdev: require("./stdev.js"),
  subtract: require("./subtract.js"),
  sum: require("./sum.js"),
  tan: require("./tan.js"),
  time: require("./time.js").timeSync,
  timeSync: require("./time.js").timeSync,
  timeAsync: require("./time.js").timeAsync,
  transpose: require("./transpose.js"),
  union: require("./union.js"),
  variance: require("./variance.js"),
  vectorize: require("./vectorize.js"),
  where: require("./where.js"),
  zeros: require("./zeros.js"),

  dump: function () {
    Object.keys(out).forEach(key => {
      if (typeof global !== "undefined") {
        global[key] = out[key]
      }

      if (typeof window !== "undefined") {
        window[key] = out[key]
      }
    })
  },
}

if (typeof module !== "undefined") {
  module.exports = out
}

if (typeof window !== "undefined") {
  window.JSMathTools = out
}
