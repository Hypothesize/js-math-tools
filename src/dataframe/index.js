const assert = require("../assert.js")
const count = require("../count.js")
const dfAppend = require("./df-append.js")
const dfApply = require("./df-apply.js")
const dfAssign = require("./df-assign.js")
const dfCopy = require("./df-copy.js")
const dfDrop = require("./df-drop.js")
const dfDropMissing = require("./df-drop-missing.js")
const dfDropNaN = require("./df-drop-nan.js")
const dfFilter = require("./df-filter.js")
const dfFromCSV = require("./df-from-csv.js")
const dfFromCSVString = require("./df-from-csv-string.js")
const dfGet = require("./df-get.js")
const dfGetDummies = require("./df-get-dummies.js")
const dfGetSubsetByIndices = require("./df-get-subset-by-indices.js")
const dfGetSubsetByNames = require("./df-get-subset-by-names.js")
const dfJoin = require("./df-join.js")
const dfPrint = require("./df-print.js")
const dfResetIndex = require("./df-reset-index.js")
const dfShuffle = require("./df-shuffle.js")
const dfSort = require("./df-sort.js")
const dfToCSV = require("./df-to-csv.js")
const dfToCSVString = require("./df-to-csv-string.js")
const dfToObject = require("./df-to-object.js")
const isArray = require("../is-array.js")
const isUndefined = require("../is-undefined.js")
const leftPad = require("../helpers/left-pad.js")
const ndarray = require("../ndarray.js")
const range = require("../range.js")
const set = require("../set.js")
const shape = require("../shape.js")
const transpose = require("../transpose.js")

function makeKey(n) {
  const alpha = "abcdefghijklmnopqrstuvwxyz1234567890"
  let out = ""
  for (let i = 0; i < n; i++)
    out += alpha[parseInt(Math.random() * alpha.length)]
  return out
}

class DataFrame {
  constructor(data) {
    const self = this

    Object.defineProperty(self, "_values", {
      value: [],
      configurable: true,
      enumerable: false,
      writable: true,
    })

    Object.defineProperty(self, "values", {
      configurable: true,
      enumerable: true,

      get() {
        if (
          self._values.length === 0 ||
          (!isUndefined(self._values[0]) && self._values[0].length === 0)
        ) {
          return [[]]
        }

        return self._values
      },

      set(x) {
        assert(isArray(x), "The new values must be a 2-dimensional array!")

        const dataShape = shape(x)

        assert(
          dataShape.length === 2,
          "The new array of values must be 2-dimensional!"
        )

        if (dataShape[0] < self._index.length) {
          self._index = self._index.slice(0, dataShape[0])
        } else if (dataShape[0] > self._index.length) {
          self._index = self._index.concat(
            range(self._index.length, dataShape[0]).map(i => {
              return "row" + leftPad(i, (dataShape[0] - 1).toString().length)
            })
          )
        }

        if (dataShape[1] < self._columns.length) {
          self._columns = self._columns.slice(0, dataShape[1])
        } else if (dataShape[1] > self._columns.length) {
          self._columns = self._columns.concat(
            range(self._columns.length, dataShape[1]).map(i => {
              return "col" + leftPad(i, (dataShape[1] - 1).toString().length)
            })
          )
        }

        self._values = x
      },
    })

    Object.defineProperty(self, "_columns", {
      value: [],
      configurable: true,
      enumerable: false,
      writable: true,
    })

    Object.defineProperty(self, "columns", {
      configurable: true,
      enumerable: true,

      get() {
        return self._columns
      },

      set(x) {
        assert(
          isArray(x),
          "The new columns list must be a 1-dimensional array of strings!"
        )

        assert(
          self.isEmpty || x.length === self.shape[1],
          "The new columns list must be the same length as the old columns list!"
        )

        assert(
          shape(x).length === 1,
          "The new columns list must be a 1-dimensional array of strings!"
        )

        x = x.map(v => {
          if (typeof v !== "string") {
            v = JSON.stringify(v) || v.toString()
          }

          if (v.trim().length === 0) {
            return "untitled_" + makeKey(8)
          }

          return v.trim()
        })

        const counts = (() => {
          const temp = count(x)
          const out = {}

          temp.forEach(obj => {
            out[obj.item] = obj.count
          })

          return out
        })()

        x = x.map(v => {
          if (counts[v] > 1) {
            return v + "_" + makeKey(8)
          }

          return v
        })

        self._columns = x
      },
    })

    Object.defineProperty(self, "_index", {
      value: [],
      configurable: true,
      enumerable: false,
      writable: true,
    })

    Object.defineProperty(self, "index", {
      configurable: true,
      enumerable: true,

      get() {
        return self._index
      },

      set(x) {
        assert(
          isArray(x),
          "The new index must be a 1-dimensional array of strings!"
        )

        assert(
          self.isEmpty || x.length === self.shape[0],
          "The new index must be the same length as the old index!"
        )

        assert(
          shape(x).length === 1,
          "The new index must be a 1-dimensional array of strings!"
        )

        x = x.map(v => {
          if (typeof v !== "string") {
            v = JSON.stringify(v) || v.toString()
          }

          if (v.trim().length === 0) {
            return "untitled_" + makeKey(8)
          }

          return v.trim()
        })

        const counts = (() => {
          const temp = count(x)
          const out = {}

          temp.forEach(obj => {
            out[obj.item] = obj.count
          })

          return out
        })()

        x = x.map(v => {
          if (counts[v] > 1) {
            return v + "_" + makeKey(8)
          }

          return v
        })

        self._index = x
      },
    })

    assert(
      isUndefined(data) || data instanceof Object,
      "The `data` passed into the constructor of a DataFrame must be either (1) an object where the key-value pairs are (respectively) column names and 1-dimensional arrays of values, or (2) a 2-dimensional array of values."
    )

    if (data) {
      if (isArray(data)) {
        const dataShape = shape(data)

        assert(
          dataShape.length === 2,
          "The `data` array passed into the constructor of a DataFrame must be 2-dimensional!"
        )

        self.values = data
      } else {
        self._columns = Object.keys(data)
        const temp = []

        self._columns.forEach(col => {
          const values = data[col]
          temp.push(values)
        })

        self._values = transpose(temp)

        const dataShape = shape(self.values)

        self._index = range(0, dataShape[0]).map(i => {
          return "row" + leftPad(i, (dataShape[0] - 1).toString().length)
        })
      }
    }
  }

  get shape() {
    const self = this
    return shape(self.values)
  }

  get rows() {
    const self = this
    return self.index
  }

  set rows(rows) {
    const self = this
    self.index = rows
  }

  get isEmpty() {
    const self = this
    return set(self.values).filter(v => !isUndefined(v)).length === 0
  }

  clear() {
    const self = this
    const out = new DataFrame(ndarray(self.shape))
    out.columns = self.columns.slice()
    out.index = self.index.slice()
    return out
  }

  get(rows, cols) {
    const self = this
    return dfGet(self, rows, cols)
  }

  getSubsetByNames(rows, cols) {
    const self = this
    return dfGetSubsetByNames(DataFrame, Series, self, rows, cols)
  }

  getSubsetByIndices(rowIndices, colIndices) {
    const self = this
    return dfGetSubsetByIndices(self, rowIndices, colIndices)
  }

  loc(rows, cols) {
    const self = this
    return self.getSubsetByNames(rows, cols)
  }

  iloc(rowIndices, colIndices) {
    const self = this
    return self.getSubsetByIndices(rowIndices, colIndices)
  }

  getDummies(columns) {
    const self = this
    return dfGetDummies(DataFrame, self, columns)
  }

  oneHotEncode(columns) {
    const self = this
    return dfGetDummies(DataFrame, self, columns)
  }

  transpose() {
    const self = this
    const out = new DataFrame(transpose(self.values))
    out.columns = self.index
    out.index = self.columns
    return out
  }

  get T() {
    const self = this
    return self.transpose()
  }

  resetIndex(shouldSkipCopying) {
    const self = this
    return dfResetIndex(self, shouldSkipCopying)
  }

  copy() {
    const self = this
    return dfCopy(DataFrame, self)
  }

  assign(p1, p2) {
    const self = this
    return dfAssign(DataFrame, Series, self, p1, p2)
  }

  apply(fn, axis) {
    const self = this
    return dfApply(DataFrame, Series, self, fn, axis)
  }

  map(fn, axis) {
    const self = this
    return self.apply(fn, axis)
  }

  dropMissing(axis, condition, threshold) {
    const self = this
    return dfDropMissing(DataFrame, Series, self, axis, condition, threshold)
  }

  dropNaN(axis, condition, threshold) {
    const self = this
    return dfDropNaN(DataFrame, self, axis, condition, threshold)
  }

  drop(rows, cols) {
    const self = this
    return dfDrop(DataFrame, Series, self, rows, cols)
  }

  dropColumns(columns) {
    const self = this
    return self.drop(null, columns)
  }

  dropRows(rows) {
    const self = this
    return self.drop(rows, null)
  }

  toObject() {
    const self = this
    return dfToObject(self)
  }

  toCSVString(shouldIncludeIndex) {
    const self = this
    return dfToCSVString(self, shouldIncludeIndex)
  }

  toCSV(filename, shouldIncludeIndex) {
    const self = this
    return dfToCSV(self, filename, shouldIncludeIndex)
  }

  print() {
    const self = this
    return dfPrint(DataFrame, Series, self)
  }

  sort(cols, directions) {
    const self = this
    return dfSort(self, cols, directions)
  }

  sortByIndex() {
    const self = this
    return self.sort()
  }

  filter(fn, axis) {
    const self = this
    return dfFilter(DataFrame, Series, self, fn, axis)
  }

  shuffle(axis) {
    const self = this
    return dfShuffle(self, axis)
  }

  append(data) {
    const self = this
    return dfAppend(DataFrame, Series, self, data)
  }

  join(data) {
    const self = this
    return dfJoin(DataFrame, Series, self, data)
  }
}

DataFrame.fromCSV = function () {
  return dfFromCSV(DataFrame, ...arguments)
}

DataFrame.fromCSVString = function () {
  return dfFromCSVString(DataFrame, ...arguments)
}

const Series = require("../series")(DataFrame)
module.exports = { DataFrame, Series }
