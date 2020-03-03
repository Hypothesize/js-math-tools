(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = {
  downloadCanvas: require("./download-canvas.js"),
  Plot: require("./plot.js"),
}

},{"./download-canvas.js":2,"./plot.js":3}],2:[function(require,module,exports){
function downloadCanvas(canvas, filename){
  let a = document.createElement("a")
  a.href = canvas.toDataURL()
  a.download = filename
  a.dispatchEvent(new MouseEvent("click"))
}

module.exports = downloadCanvas

},{}],3:[function(require,module,exports){
let map = require("../math/map.js")
let downloadCanvas = require("./download-canvas.js")

function Plot(canvas){
  let self = this

  let xmin = -1
  let xmax = 1
  let ymin = -1
  let ymax = 1
  let fillColor = "black"
  let strokeColor = "black"
  let dotSize = 5
  let lineThickness = 1
  let axesAreVisible = true
  let textStyle = {
    family: "monospace",
    size: 12,
    alignment: "center",
    baseline: "middle",
    isBold: false,
    isItalicized: false,
    lineHeight: 14,
    color: "black",
  }

  let context = canvas.getContext("2d")
  let width = canvas.width
  let height = canvas.height

  self.setOpacity = function(a){
    context.globalAlpha = a
  }

  self.setFillColor = function(c){
    fillColor = c
    return self
  }

  self.setLineColor = function(c){
    strokeColor = c
    return self
  }

  self.setDotSize = function(s){
    dotSize = s
    return self
  }

  self.setLineThickness = function(t){
    lineThickness = t
    return self
  }

  self.setAxesAreVisible = function(v){
    axesAreVisible = v
    return self
  }

  self.setTextStyle = function(t){
    textStyle = t
  }

  self.setRange = function(a, b, c, d){
    xmin = a
    xmax = b
    ymin = c
    ymax = d
    return self
  }

  self.splitTextIntoLines = function(text, maxWidth){
    let lines = []
    let words = text.split(" ")
    let temp = ""

    words.forEach(function(word){
      let width = context.measureText(temp + " " + word).width

      if (width > maxWidth){
        lines.push(temp)
        temp = word
      } else {
        temp += " " + word
      }
    })

    if (temp.length > 0){
      lines.push(temp)
    }

    return lines
  }

  self.clear = function(){
    context.clearRect(0, 0, width, height)
    context.fillStyle = "white"
    context.fillRect(0, 0, width, height)
  }

  self.drawAxes = function(){
    if (axesAreVisible){
      context.fillStyle = "none"
      context.strokeStyle = "black"
      context.lineWidth = 1

      context.beginPath()
      context.moveTo(-width/2, map(0, ymin, ymax, -height/2, height/2))
      context.lineTo(width/2, map(0, ymin, ymax, -height/2, height/2))
      context.stroke()

      context.beginPath()
      context.moveTo(map(0, xmin, xmax, -width/2, width/2), -height/2)
      context.lineTo(map(0, xmin, xmax, -width/2, width/2), height/2)
      context.stroke()
    }

    return self
  }

  self.scatter = function(x, y){
    context.save()
    context.translate(width/2, height/2)
    context.scale(1, -1)

    self.drawAxes()

    context.fillStyle = fillColor
    context.strokeStyle = strokeColor
    context.lineWidth = lineThickness

    for (let i=0; i<x.length; i++){
      xTemp = map(x[i], xmin, xmax, -width/2, width/2)
      yTemp = map(y[i], ymin, ymax, -height/2, height/2)

      context.beginPath()
      context.ellipse(xTemp, yTemp, dotSize / 2, dotSize / 2, 0, 0, Math.PI * 2)
      if (fillColor !== "none") context.fill()
      if (lineThickness > 0) context.stroke()
    }

    context.restore()
    return self
  }

  self.line = function(x, y){
    context.save()
    context.translate(width/2, height/2)
    context.scale(1, -1)

    self.drawAxes()

    context.fillStyle = fillColor
    context.strokeStyle = strokeColor
    context.lineWidth = lineThickness

    for (let i=0; i<x.length-1; i++){
      xTemp1 = map(x[i], xmin, xmax, -width/2, width/2)
      yTemp1 = map(y[i], ymin, ymax, -height/2, height/2)
      xTemp2 = map(x[i+1], xmin, xmax, -width/2, width/2)
      yTemp2 = map(y[i+1], ymin, ymax, -height/2, height/2)

      context.beginPath()
      context.moveTo(xTemp1, yTemp1)
      context.lineTo(xTemp2, yTemp2)
      context.stroke()
    }

    context.restore()
    return self
  }

  self.dottedLine = function(x, y){
    context.save()
    context.translate(width/2, height/2)
    context.scale(1, -1)

    self.drawAxes()

    context.fillStyle = fillColor
    context.strokeStyle = strokeColor
    context.lineWidth = lineThickness

    for (let i=0; i<x.length-1; i+=2){
      try {
        xTemp1 = map(x[i], xmin, xmax, -width/2, width/2)
        yTemp1 = map(y[i], ymin, ymax, -height/2, height/2)
        xTemp2 = map(x[i+1], xmin, xmax, -width/2, width/2)
        yTemp2 = map(y[i+1], ymin, ymax, -height/2, height/2)

        context.beginPath()
        context.moveTo(xTemp1, yTemp1)
        context.lineTo(xTemp2, yTemp2)
        context.stroke()
      } catch(e){}
    }

    context.restore()
    return self
  }

  self.bar = function(values, colors){
    context.save()
    context.translate(width/2, height/2)
    context.scale(1, -1)

    context.strokeStyle = strokeColor
    context.lineWidth = lineThickness

    let barThickness = 0.5

    for (let i=0; i<values.length; i++){
      context.fillStyle = colors[i]

      let xTemp = map((i + 2) - barThickness / 2, xmin, xmax, -width/2, width/2)
      let yTemp = map(0, ymin, ymax, -height/2, height/2)
      let wTemp = map(barThickness, 0, xmax - xmin, 0, width)
      let hTemp = map(values[i], 0, ymax - ymin, 0, height)

      if (colors[i] !== "none") context.fillRect(xTemp, yTemp, wTemp, hTemp)
      if (lineThickness > 0) context.strokeRect(xTemp, yTemp, wTemp, hTemp)
    }

    self.drawAxes()
    context.restore()
    return self
  }

  self.text = function(text, x, y, maxWidth){
    context.save()
    context.translate(width/2, height/2)
    context.scale(1, -1)

    context.fillStyle = textStyle.color
    context.font = `${textStyle.isBold ? "bold" : ""} ${textStyle.isItalicized ? "italic" : ""} ${textStyle.size}px ${textStyle.family}`
    context.textAlign = textStyle.alignment
    context.textBaseline = textStyle.baseline

    let lines

    if (maxWidth){
      lines = self.splitTextIntoLines(text, map(maxWidth, 0, xmax - xmin, 0, width))
    } else {
      lines = [text]
    }

    lines.forEach(function(line, index){
      context.save()
      context.translate(map(x, xmin, xmax, -width/2, width/2), map(y, ymin, ymax, -height/2, height/2) - index * textStyle.lineHeight)
      context.scale(1, -1)
      context.fillText(line, 0, 0)
      context.restore()
    })

    context.restore()
    return self
  }

  self.getContext = function(){
    return context
  }

  self.download = function(filename){
    downloadCanvas(canvas, filename)
    return self
  }
}

module.exports = Plot

},{"../math/map.js":18,"./download-canvas.js":2}],4:[function(require,module,exports){
let out = {
  canvas: require("./canvas/__index__.js"),
  math: require("./math/__index__.js"),
  misc: require("./misc/__index__.js"),
}

try {
  module.exports = out
} catch(e){}

try {
  window.JSMathTools = out
} catch(e){}

},{"./canvas/__index__.js":1,"./math/__index__.js":5,"./misc/__index__.js":40}],5:[function(require,module,exports){
module.exports = {
  abs: require("./abs.js"),
  add: require("./add.js"),
  ceil: require("./ceil.js"),
  clamp: require("./clamp.js"),
  cohensd: require("./cohens-d.js"),
  correl: require("./correl.js"),
  cos: require("./cos.js"),
  covariance: require("./covariance.js"),
  floor: require("./floor.js"),
  isArray: require("./is-array.js"),
  lerp: require("./lerp.js"),
  log: require("./log.js"),
  map: require("./map.js"),
  max: require("./max.js"),
  mean: require("./mean.js"),
  min: require("./min.js"),
  ndarray: require("./ndarray.js"),
  normal: require("./normal.js"),
  normalize: require("./normalize.js"),
  ones: require("./ones.js"),
  pow: require("./pow.js"),
  random: require("./random.js"),
  range: require("./range.js"),
  round: require("./round.js"),
  scale: require("./scale.js"),
  sign: require("./sign.js"),
  sin: require("./sin.js"),
  sqrt: require("./sqrt.js"),
  std: require("./std.js"),
  sum: require("./sum.js"),
  tan: require("./tan.js"),
  variance: require("./variance.js"),
  vectorize: require("./vectorize.js"),
  zeros: require("./zeros.js"),
}

},{"./abs.js":6,"./add.js":7,"./ceil.js":8,"./clamp.js":9,"./cohens-d.js":10,"./correl.js":11,"./cos.js":12,"./covariance.js":13,"./floor.js":14,"./is-array.js":15,"./lerp.js":16,"./log.js":17,"./map.js":18,"./max.js":19,"./mean.js":20,"./min.js":21,"./ndarray.js":22,"./normal.js":23,"./normalize.js":24,"./ones.js":25,"./pow.js":26,"./random.js":27,"./range.js":28,"./round.js":29,"./scale.js":30,"./sign.js":31,"./sin.js":32,"./sqrt.js":33,"./std.js":34,"./sum.js":35,"./tan.js":36,"./variance.js":37,"./vectorize.js":38,"./zeros.js":39}],6:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let abs = vectorize(Math.abs)
module.exports = abs

},{"./vectorize.js":38}],7:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let add = vectorize((a, b) => a + b)
module.exports = add

},{"./vectorize.js":38}],8:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let ceil = vectorize(Math.ceil)
module.exports = ceil

},{"./vectorize.js":38}],9:[function(require,module,exports){
let isArray = require("./is-array.js")

function clamp(x, a, b){
  if (isArray(x)) return x.map(v => clamp(v, a, b))
  if (x < a) return a
  if (x > b) return b
  return x
}

module.exports = clamp

},{"./is-array.js":15}],10:[function(require,module,exports){
let mean = require("./mean.js")
let sqrt = require("./sqrt.js")
let variance = require("./variance.js")

function cohensd(arr1, arr2){
  let m1 = mean(arr1)
  let m2 = mean(arr2)
  let s = sqrt((variance(arr1) + variance(arr2)) / 2)
  return (m1 - m2) / s
}

module.exports = cohensd

},{"./mean.js":20,"./sqrt.js":33,"./variance.js":37}],11:[function(require,module,exports){
let covariance = require("./covariance.js")
let std = require("./std.js")

function correl(x, y){
  return covariance(x, y) / (std(x) * std(y))
}

module.exports = correl

},{"./covariance.js":13,"./std.js":34}],12:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let cos = vectorize(Math.cos)
module.exports = cos

},{"./vectorize.js":38}],13:[function(require,module,exports){
let mean = require("./mean.js")

function covariance(x, y){
  let mx = mean(x)
  let my = mean(y)
  let out = 0
  for (let i=0; i<x.length; i++) out += (x[i] - mx) * (y[i] - my)
  return out / x.length
}

module.exports = covariance

},{"./mean.js":20}],14:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let floor = vectorize(Math.floor)
module.exports = floor

},{"./vectorize.js":38}],15:[function(require,module,exports){
function isArray(obj){
  return obj.push ? true : false
}

module.exports = isArray

},{}],16:[function(require,module,exports){
function lerp(a, b, f){
  return f * (b - a) + a
}

module.exports = lerp

},{}],17:[function(require,module,exports){
let vectorize = require("./vectorize.js")

let log = vectorize(function(x, base){
  base = typeof(base) === "undefined" ? Math.E : base
  return Math.log(x) / Math.log(base)
})

module.exports = log

},{"./vectorize.js":38}],18:[function(require,module,exports){
let isArray = require("./is-array.js")

function map(x, a, b, c, d){
  if (isArray(x)) return x.map(v => map(v, a, b, c, d))
  return (d - c) * (x - a) / (b - a) + c
}

module.exports = map

},{"./is-array.js":15}],19:[function(require,module,exports){
function max(arr){
  let out

  arr.forEach(function(x){
    if (out === undefined || x > out){
      out = x
    }
  })

  return out
}

module.exports = max

},{}],20:[function(require,module,exports){
let sum = require("./sum.js")

function mean(arr){
  return sum(arr) / arr.length
}

module.exports = mean

},{"./sum.js":35}],21:[function(require,module,exports){
function min(arr){
  let out

  arr.forEach(function(x){
    if (out === undefined || x < out){
      out = x
    }
  })

  return out
}

module.exports = min

},{}],22:[function(require,module,exports){
let isArray = require("./is-array.js")
let range = require("./range.js")

function ndarray(shape){
  if (!isArray(shape)) shape = [shape]

  if (shape.length === 1){
    return range(0, shape[0]).map(v => 0)
  } else {
    let out = []
    for (let i=0; i<shape[0]; i++) out.push(ndarray(shape.slice(1, shape.length)))
    return out
  }
}

module.exports = ndarray

},{"./is-array.js":15,"./range.js":28}],23:[function(require,module,exports){
let ndarray = require("./ndarray.js")
let apply = require("../misc/apply.js")

function normal(shape){
  function n(){
    let u1 = Math.random()
    let u2 = Math.random()
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
  }

  if (!shape) return n()
  return apply(ndarray(shape), n)
}

module.exports = normal

},{"../misc/apply.js":41,"./ndarray.js":22}],24:[function(require,module,exports){
let min = require("./min.js")
let max = require("./max.js")

function normalize(arr){
  let arrMin = min(arr)
  let arrMax = max(arr)
  let arrRange = arrMax - arrMin
  return arr.map(v => (v - arrMin) / arrRange)
}

module.exports = normalize

},{"./max.js":19,"./min.js":21}],25:[function(require,module,exports){
let ndarray = require("./ndarray.js")

function ones(shape){
  return apply(ndarray(shape), v => 1)
}

module.exports = ones

},{"./ndarray.js":22}],26:[function(require,module,exports){
let isArray = require("./is-array.js")

function pow(x, p){
  if (isArray(x)) return x.map(v => pow(v, p))
  return Math.pow(x, p)
}

module.exports = pow

},{"./is-array.js":15}],27:[function(require,module,exports){
let ndarray = require("./ndarray.js")
let apply = require("../misc/apply.js")

function random(shape){
  if (!shape) return Math.random()
  return apply(ndarray(shape), Math.random)
}

module.exports = random

},{"../misc/apply.js":41,"./ndarray.js":22}],28:[function(require,module,exports){
function range(a, b, step=1){
  let out = []
  for (let i=a; i<b; i+=step) out.push(i)
  return out
}

module.exports = range

},{}],29:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let round = vectorize(Math.round)
module.exports = round

},{"./vectorize.js":38}],30:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let scale = vectorize((a, b) => a * b)
module.exports = scale

},{"./vectorize.js":38}],31:[function(require,module,exports){
let vectorize = require("./vectorize.js")

let sign = vectorize(function(x){
  if (x < 0) return -1
  if (x > 1) return 1
  return 0
})

module.exports = sign

},{"./vectorize.js":38}],32:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let sin = vectorize(Math.sin)
module.exports = sin

},{"./vectorize.js":38}],33:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let sqrt = vectorize(Math.sqrt)
module.exports = sqrt

},{"./vectorize.js":38}],34:[function(require,module,exports){
let mean = require("./mean.js")
let pow = require("./pow.js")
let sqrt = require("./sqrt.js")

function std(arr){
  let m = mean(arr)
  let out = 0
  arr.forEach(x => out += pow(x - m, 2))
  return sqrt(out / arr.length)
}

module.exports = std

},{"./mean.js":20,"./pow.js":26,"./sqrt.js":33}],35:[function(require,module,exports){
function sum(arr){
  let out = 0
  arr.forEach(v => out += v)
  return out
}

module.exports = sum

},{}],36:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let tan = vectorize(Math.tan)
module.exports = tan

},{"./vectorize.js":38}],37:[function(require,module,exports){
let pow = require("./pow.js")
let std = require("./std.js")

function variance(arr){
  return pow(std(arr), 2)
}

module.exports = variance

},{"./pow.js":26,"./std.js":34}],38:[function(require,module,exports){
let isArray = require("./is-array.js")
let max = require("./max.js")

function vectorize(fn){
  return function temp(){
    if (Object.keys(arguments).map(key => isArray(arguments[key])).indexOf(true) > -1){
      let out = []
      let maxLength = max(Object.keys(arguments).filter(key => isArray(arguments[key])).map(key => arguments[key].length))

      for (let i=0; i<maxLength; i++){
        let args = Object.keys(arguments).map(key => {
          if (isArray(arguments[key])) return arguments[key][i]
          return arguments[key]
        })
        out.push(temp(...args))
      }

      return out
    } else {
      return fn(...arguments)
    }
  }
}

module.exports = vectorize

},{"./is-array.js":15,"./max.js":19}],39:[function(require,module,exports){
let ndarray = require("./ndarray.js")

function zeros(shape){
  return ndarray(shape)
}

module.exports = zeros

},{"./ndarray.js":22}],40:[function(require,module,exports){
module.exports = {
  apply: require("./apply.js"),
  array: require("./array.js"),
  downloadJSON: require("./download-json.js"),
  pause: require("./pause.js"),
  print: require("./print.js"),
}

},{"./apply.js":41,"./array.js":42,"./download-json.js":43,"./pause.js":44,"./print.js":45}],41:[function(require,module,exports){
let vectorize = require("../math/vectorize.js")

let apply = vectorize(function(x, fn){
  return fn(x)
})

module.exports = apply

},{"../math/vectorize.js":38}],42:[function(require,module,exports){
Array.prototype.asyncForEach = async function(fn){
  for (let i=0; i<this.length; i++) await fn(this[i], i, this)
  return this
}

Array.prototype.alphaSort = function(key){
  return this.sort(function(a, b){
    if (key){
      if (a[key] < b[key]) return -1
      if (a[key] > b[key]) return 1
      return 0
    } else {
      if (a < b) return -1
      if (a > b) return 1
      return 0
    }
  })
}

},{}],43:[function(require,module,exports){
function downloadJSON(obj, filename){
  let a = document.createElement("a")
  a.href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(obj, null, "\t"))}`
  a.download = filename
  a.dispatchEvent(new MouseEvent("click"))
}

module.exports = downloadJSON

},{}],44:[function(require,module,exports){
function pause(ms){
  return new Promise(function(resolve, reject){
    try {
      return setTimeout(resolve, ms)
    } catch(e){
      return reject(e)
    }
  })
}

module.exports = pause

},{}],45:[function(require,module,exports){
function print(x){
  return console.log(x)
}

module.exports = print

},{}]},{},[4]);
