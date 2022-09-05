# Introduction

**js-math-tools** is a little library of (you guessed it) math tools for JS. It was built completely from scratch and has no other dependencies (though it does have some dependencies for bundling, linting, testing, etc.).

# Installation

```bash
npm install --save https://github.com/jrc03c/js-math-tools
```

For client-side use, attach the `dist/js-math-tools.js` file to your web page:

```html
<script src="path/to/js-math-tools.js"></script>
```

For use in Node:

```js
const tools = require("js-math-tools")
```

# Usage

You can either pull individual functions out, like:

```js
const { add } = require("js-math-tools")
add(3, 4) // 7
```

Or, for easier access, you can "dump" all of the functions into the global scope:

```js
require("js-math-tools").dump()
add(3, 4) // 7
```

# API

## `abs(x)`

Returns the absolute value where `x` is a number or an arbitrarily nested array of numbers.

## `add(a, b)`

Returns the sum where `a` and `b` are numbers or arbitrarily nested arrays of numbers. Note that `a` and `b` don't both have to be the same type; `a` could be a number while `b` could be an arbitrarily nested array of numbers, or vice versa. See the note below `sum` to read about the differences between `add` and `sum`.

## `append(a, b, axis=0)`

Returns the concatenation of vectors or matrices `a` and `b`. In the case of vectors, the resulting vector will just be the simple concatenation of the two input vectors. But in the case of matrices, the result depends on the `axis`. If the `axis` is 0, then the rows of `a` will be stacked "on top of" the rows of `b`; whereas if `axis` is 1, then each corresponding row of `a` and `b` will be joined side-by-side, as in the case of vectors. For example:

```js
const a = [
  [1, 2, 3],
  [4, 5, 6],
]

const b = [
  [100, 200, 300],
  [400, 500, 600],
]

console.log(append(a, b, 0))
// [
//   [1, 2, 3],
//   [4, 5, 6],
//   [100, 200, 300],
//   [400, 500, 600],
// ]

console.log(append(a, b, 1))
// [
//   [1, 2, 3, 100, 200, 300],
//   [4, 5, 6, 400, 500, 600]
// ]
```

## `apply(x, fn)`

Applies the function `fn` to each item in the arbitrarily nested array `x`. Note that this is a subtly different functionality than [`Array.prototype.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map). When a function is passed into an array's `map` method, that function is applied to every item at the shallowest level of the array. So, for example, if the array is 2-dimensional, then the `map` method would apply a function to each child array in the parent array. But the `apply` function doesn't quite work that way; instead, it applies a function on each item in an arbitrarily nested array, regardless of depth. In that sense, the function passed into the `apply` function will never be given an array as an argument; it can be passed any other data type, but _not_ an array.

For example, when using an array's `map` method, we can get information about each child array, like its length.

```js
const x = [[100], [200, 300], [400, 500, 600]]
const lengths = x.map(row => row.length)
console.log(lengths)
// [1, 2, 3]
```

But this can't possibly work when using `apply` because child arrays will never be passed into the given function. If we try to run the same thing again using the `apply` function, we'll get results that are perhaps unexpected:

```js
const x = [[100], [200, 300], [400, 500, 600]]
const lengths = apply(x, row => row.length)
console.log(lengths)
// [
//   [undefined],
//   [undefined, undefined],
//   [undefined, undefined, undefined],
// ]
```

That's because `apply` is trying to pass numbers into the given function, not arrays. Here's an example that uses `apply` correctly:

```js
const x = [[100], [200, 300], [400, 500, 600]]
const y = apply(x, v => v * 2)
console.log(y)
// [
//   [200],
//   [400, 600],
//   [800, 1000, 1200],
// ]
```

## `arccos(x)`

Returns the inverse cosine where `x` is a number or an arbitrarily nested array of numbers.

## `arcsin(x)`

Returns the inverse sine where `x` is a number or an arbitrarily nested array of numbers.

## `arctan(x)`

Returns the inverse tangent where `x` is a number or an arbitrarily nested array of numbers.

## `argmax(x)`

Returns the index of the maximum value in the arbitrarily nested array `x`. If `x` is 1-dimensional, then a whole number will be returned. If, however, `x` is arbitrarily nested, then the returned value will be an array of whole numbers representing indices at each dimension. For example:

```js
const a = [1, 5, 3]
console.log(argmax(a))
// 1

const b = [
  [1, 5],
  [3, 4],
  [9, 2],
]

console.log(argmax(b))
// [2, 0]
// i.e., row 2, item 0

const c = [1, [2, 3, [4, 5, 6, [7, 8, 9, 10]]]]
console.log(argmax(c))
// [1, 2, 3, 3]
// i.e., row 1, sub-row 2, sub-sub-row 3, item 3
```

## `argmin(x)`

Returns the index of the minimum value in the arbitrarily nested array `x`. If `x` is 1-dimensional, then a whole number will be returned. If, however, `x` is arbitrarily nested, then the returned value will be an array of whole numbers representing indices at each dimension. See `argmax` for examples of the returned values.

## `assert(condition, message)`

Does nothing if `condition` is true; otherwise, it throws an error with the given `message` string.

## `ceil(x)`

Given a number `x`, returns either the next highest integer (if `x` has a fractional component) or `x` itself (if `x` is already an integer). Note that `x` can also be an arbitrarily nested array of numbers.

## `chop(x, threshold=1e-10)`

Returns 0 if the absolute value of `x` is less than the `threshold`; otherwise, it returns `x`. Both `x` and `threshold` can be either numbers or arbitrarily nested arrays of numbers.

## `clamp(x, min, max)`

Returns `min` if `x` is less than `min`; returns `max` if `x` is greater than `max`; otherwise, returns `x`. All of `x`, `min`, and `max` can be numbers or arbitrarily nested arrays of numbers.

## `combinations(x, r)`

Given an arbitrarily nested array `x`, returns all possible combinations of `r` items from `x`. Note that any nesting of `x` will be ignored — i.e., `x` will be "flattened" into a 1-dimensional array before getting the combinations — so it won't be possible with this function to get combinations of arrays.

## `copy(x)`

Returns a copy of `x`. The only exception occurs if `x` is an instance of a custom class. In such a case, a plain JavaScript `Object` will be returned, though bearing the same members as `x` but not an instance of the same class. Also, this function handles circular references by replacing them with strings like `"<reference to '/some/path/down/into/the/object'>"`.

## `correl(a, b)`

Returns the correlation of `a` and `b`, which are 1-dimensional arrays of numbers.

## `cos(x)`

Returns the cosine where `x` is a number or an arbitrarily nested array of numbers.

## `count(x, items)`

Given an arbitrarily nested array `x`, returns an array of objects, each of which has the members "item" and "count" to indicate how many times a given item appeared in `x`. Using `items` is optional; but if used, it can be any kind of value or an array of values. Do note, though, that it's not currently possible to count appearances of child arrays in `x`; only other types can be counted. That's because `x` is "flattened" into a 1-dimensional array before the counting begins.

## `covariance(a, b)`

Returns the covariance between two 1-dimensional arrays, `a` and `b`.

## `DataFrame(x)`

The `DataFrame` class is similar to pandas' [`DataFrame`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.html). They at least represent the same kind of data (2-dimensional arrays with row and column names), though they probably differ in many of their members.

The constructor for a `DataFrame` can optionally receive a value `x`, which can be any of these:

- another `DataFrame`
- a 2-dimensional array
- an object whose key-value pairs represent column names and column values, respectively

### `DataFrame.values`

A 2-dimensional array containing the values held by the DataFrame. Technically, `values` is a getter-setter pair that stores its data in a hidden `_values` property. While it's possible to set the `_values` property directly, this is strongly discouraged because it bypasses sanity checks on the data, like checking that new data is 2-dimensional, etc.

### `DataFrame.columns`

An array of column names. Technically, `columns` is a getter-setter pair that stores its data in a hidden `_columns` property. While it's possible to set the `_columns` property directly, this is strongly discouraged because it bypasses sanity checks on the data, like checking to make sure that the length of a new columns array is the same length as the rows in the `values` array, etc.

### `DataFrame.index`

An array of row names. Technically, `index` is a getter-setter pair that stores its data in a hidden `_index` property. While it's possible to set the `_index` property directly, this is strongly discouraged because it bypasses sanity checks on the data, like checking to make sure that the length of the new rows array is the same as the length of the `values` array, etc.

### `DataFrame.rows`

Identical to `DataFrame.index`.

### `DataFrame.shape`

A read-only array with 2 values representing the number of rows and number of columns, respectively, in the `values` array.

### `DataFrame.length`

A read-only value representing the number of rows in the `DataFrame`.

### `DataFrame.width`

A read-only value representing the number of columns in the `DataFrame`.

### `DataFrame.isEmpty`

A read-only boolean value that is `true` if the `DataFrame` contains no data or `false` otherwise.

### `DataFrame.T`

Identical to `DataFrame.transpose` except that `T` is a getter.

### `DataFrame.append(x, axis=0)`

Returns a copy of the original `DataFrame` with `x` appended to it. Vectors, matrices, `Series`, and `DataFrame` values can all be passed as `x`. Possible `axis` values are 0 and 1, where 0 indicates that the row(s) of `x` should be stacked beneath the rows of the original `DataFrame`, and 1 indicates that the row(s) of `x` should be placed to the right of the rows of the original `DataFrame`. For example:

```js
const x = new DataFrame({ foo: [2, 3, 4], bar: [5, 6, 7] })
x.print()
// ┌─────────┬─────┬─────┐
// │ (index) │ foo │ bar │
// ├─────────┼─────┼─────┤
// │  row0   │  2  │  5  │
// │  row1   │  3  │  6  │
// │  row2   │  4  │  7  │
// └─────────┴─────┴─────┘
// Shape: [ 3, 2 ]

// append a vector with axis = 0
x.append(["a", "b", "c"], 0).print()
// ┌─────────┬─────┬─────┬───────────┐
// │ (index) │ foo │ bar │   col2    │
// ├─────────┼─────┼─────┼───────────┤
// │  row0   │  2  │  5  │ undefined │
// │  row1   │  3  │  6  │ undefined │
// │  row2   │  4  │  7  │ undefined │
// │  row3   │ 'a' │ 'b' │    'c'    │
// └─────────┴─────┴─────┴───────────┘
// Shape: [ 4, 3 ]

// append a vector with axis = 1
x.append(["a", "b", "c"], 1).print()
// ┌─────────┬─────┬─────┬──────┐
// │ (index) │ foo │ bar │ col2 │
// ├─────────┼─────┼─────┼──────┤
// │  row0   │  2  │  5  │ 'a'  │
// │  row1   │  3  │  6  │ 'b'  │
// │  row2   │  4  │  7  │ 'c'  │
// └─────────┴─────┴─────┴──────┘
// Shape: [ 3, 3 ]
```

So, when a vector is appended, it gets treated as a row if the `axis` is 0 or as a column if the `axis` is 1.

Working with matrices is slightly different:

```js
const x = new DataFrame({ foo: [2, 3, 4], bar: [5, 6, 7] })
x.print()
// ┌─────────┬─────┬─────┐
// │ (index) │ foo │ bar │
// ├─────────┼─────┼─────┤
// │  row0   │  2  │  5  │
// │  row1   │  3  │  6  │
// │  row2   │  4  │  7  │
// └─────────┴─────┴─────┘
// Shape: [ 3, 2 ]

// append a matrix with axis = 0
x.append([
  ["a", "b", "c"],
  ["d", "e", "f"],
]).print()
// ┌─────────┬─────┬─────┬───────────┐
// │ (index) │ foo │ bar │   col2    │
// ├─────────┼─────┼─────┼───────────┤
// │  row0   │  2  │  5  │ undefined │
// │  row1   │  3  │  6  │ undefined │
// │  row2   │  4  │  7  │ undefined │
// │  row3   │ 'a' │ 'b' │    'c'    │
// │  row4   │ 'd' │ 'e' │    'f'    │
// └─────────┴─────┴─────┴───────────┘
// Shape: [ 5, 3 ]

// append a matrix with axis = 1
x.append(
  [
    ["a", "b", "c"],
    ["d", "e", "f"],
  ],
  1
).print()
// ┌─────────┬─────┬─────┬───────────┬───────────┬───────────┐
// │ (index) │ foo │ bar │   col2    │   col3    │   col4    │
// ├─────────┼─────┼─────┼───────────┼───────────┼───────────┤
// │  row0   │  2  │  5  │    'a'    │    'b'    │    'c'    │
// │  row1   │  3  │  6  │    'd'    │    'e'    │    'f'    │
// │  row2   │  4  │  7  │ undefined │ undefined │ undefined │
// └─────────┴─────┴─────┴───────────┴───────────┴───────────┘
// Shape: [ 3, 5 ]
```

So, when appending vectors, the vector either gets treated as a row or transposed and treated as a column; but that transposition does _not_ occur with matrices: matrices either get stacked directly below or directly to the right, and in neither case are they transposed.

Finally, when appending `Series` or `DataFrame` objects, the method will try to place values in the correct column (if `axis` is 0) or row (if `axis` is 1) before tacking on new columns or rows. For example:

```js
const x = new DataFrame({ foo: [2, 3, 4], bar: [5, 6, 7] })
x.print()
// ┌─────────┬─────┬─────┐
// │ (index) │ foo │ bar │
// ├─────────┼─────┼─────┤
// │  row0   │  2  │  5  │
// │  row1   │  3  │  6  │
// │  row2   │  4  │  7  │
// └─────────┴─────┴─────┘
// Shape: [ 3, 2 ]

const y = new DataFrame({ bar: [10, 20, 30, 40], baz: [50, 60, 70, 80] })
y.print()
// ┌─────────┬─────┬─────┐
// │ (index) │ bar │ baz │
// ├─────────┼─────┼─────┤
// │  row0   │ 10  │ 50  │
// │  row1   │ 20  │ 60  │
// │  row2   │ 30  │ 70  │
// │  row3   │ 40  │ 80  │
// └─────────┴─────┴─────┘
// Shape: [ 4, 2 ]

// note that `x` and `y` both have a "bar" column; so the values in "bar" in
// `x` will be inserted below the "bar" values in the original `DataFrame`
x.append(y).print()
// ┌─────────┬───────────┬─────┬───────────┐
// │ (index) │    foo    │ bar │    baz    │
// ├─────────┼───────────┼─────┼───────────┤
// │  row0   │     2     │  5  │ undefined │
// │  row1   │     3     │  6  │ undefined │
// │  row2   │     4     │  7  │ undefined │
// │  row3   │ undefined │ 10  │    50     │
// │  row4   │ undefined │ 20  │    60     │
// │  row5   │ undefined │ 30  │    70     │
// │  row6   │ undefined │ 40  │    80     │
// └─────────┴───────────┴─────┴───────────┘
// Shape: [ 7, 3 ]
```

The same sort of thing happens when the `axis` is 1, except that in that case, the _rows_ of the `DataFrame` objects are matched up as one is appended to the other.

### `DataFrame.apply(fn, axis=0)`

Returns a copy of the original `DataFrame` in which `fn` has been applied to each column `Series` (if `axis` is 0) or row `Series` (if `axis` is 1).

### `DataFrame.assign(name, values)` or `DataFrame.assign(obj)`

Returns a copy of the original `DataFrame` to which new values have been assigned in new columns. In the first form, a column `name` and a corresponding list of `values` are passed into the method, and the returned `DataFrame` will contain the original data plus the new column. In the second form, the object passed as `obj` should contain key-value pairs representing column names and their corresponding values. The second form, therefore, is more convenient when assigning multiple columns at once.

### `DataFrame.clear()`

Returns a copy of the original `DataFrame` in which all of the values have been replaced with `undefined`.

### `DataFrame.copy()`

Returns a copy of the original `DataFrame`.

### `DataFrame.dropColumns(columns)`

Returns a copy of the original `DataFrame` from which the given columns have been dropped. A whole number, a string, or an array of whole numbers or strings can be passed as `columns`.

### `DataFrame.dropRows(rows)`

Returns a copy of the original `DataFrame` from which the given rows have been dropped. A whole number, a string, or an array of whole numbers or strings can be passed as `rows`.

### `DataFrame.dropMissing(axis=0, condition="any", threshold=0)`

Returns a copy of the original `DataFrame` from which rows or columns containing missing values (i.e., undefined or null values) have been dropped if `condition` is met or the `threshold` is exceeded. The `condition` isn't a boolean as you might expect; instead, it's a string from `["any", "all", "none"]`. If the `condition` is "any", then _any_ missing values in a row or column will cause that row or column to be dropped. If the condition is "all", then a row or column will be dropped only if _all_ of its values are missing. In the above two cases, the `threshold` value isn't considered. But if the `threshold` is set to a value greater than 0, then `condition` will automatically be set to "none", and then a row or column will be dropped only of the number of missing values it contains exceeds the `threshold`. If `axis` is 0, then rows are dropped; and if `axis` is 1, then columns are dropped.

### `DataFrame.dropNaN(axis=0, condition="any", threshold=0)`

Returns a copy of the original `DataFrame` from which rows or columns containing NaN values have been dropped if `condition` is met or the `threshold` is exceeded. The `condition` isn't a boolean as you might expect; instead, it's a string from `["any", "all", "none"]`. If the `condition` is "any", then _any_ missing values in a row or column will cause that row or column to be dropped. If the condition is "all", then a row or column will be dropped only if _all_ of its values are missing. In the above two cases, the `threshold` value isn't considered. But if the `threshold` is set to a value greater than 0, then `condition` will automatically be set to "none", and then a row or column will be dropped only of the number of missing values it contains exceeds the `threshold`. If `axis` is 0, then rows are dropped; and if `axis` is 1, then columns are dropped.

### `DataFrame.drop(rows, columns)`

Returns of a copy of the original `DataFrame` from which the given `rows` and `columns` have been dropped. If you don't want to drop any rows, then pass `null` as that argument; and the same applies for columns. The `rows` and `columns` values can be whole numbers, strings, or arrays of whole numbers or strings.

### `DataFrame.filter(fn, axis=0)`

Returns a copy of the original `DataFrame` with rows or columns filtered out by `fn`. If `axis` is 0, then row `Series` objects will be passed into `fn`; and if `axis` is 1, then column `Series` objects will be passed into `fn`. If `fn` returns `false` for any input, then that input will be filtered out.

### `DataFrame.fromCSVString(string)` [static]

Parses a CSV string and returns a `DataFrame`.

### `DataFrame.fromCSV(file)` [static]

Fetches and parses a CSV file, and then returns a `DataFrame`. Do note that this function isn't very robust; in fact, I often use [`papaparse`](https://www.papaparse.com/) to do the heavy lifting of parsing since it's much better at handling edge cases. This function is provided for convenience, but probably ought not to be used unless the given CSV file is very simple (e.g., containing only numbers).

### `DataFrame.getDummies(columns)`

Returns a `DataFrame` containing one-hot encodings of the given `columns` in the original `DataFrame`. Note that in most applications of one-hot encodings, if a column contains _n_ unique values, then (_n_ - 1) columns will be returned. But this implementation returns _n_ columns just in case you have other uses for it. But dropping the extra column is easy with the `drop` method.

### `DataFrame.getSubsetByIndices(rowIndices, colIndices)`

Returns a copy of the original `DataFrame` only containing the rows and columns specified by `rowIndices` and `colIndices`, where those values are one of null, whole numbers, or arrays of whole numbers. This method is mostly used internally, though you can use it if you want; the easier way is just to use the `get` method.

### `DataFrame.getSubsetByNames(rowNames, colNames)`

Returns a copy of the original `DataFrame` only containing the rows and columns specified by `rowNames` and `colNames`, where those values are one of null, strings, or arrays of strings. This method is mostly used internally, though you can use it if you want; the easier way is just to use the `get` method.

### `DataFrame.get(rows, columns)`

Returns a copy of the original `DataFrame` only containing the rows and columns specified by `rows` and `columns`, where those values are one of null, whole numbers, strings, or arrays of whole numbers or strings.

### `DataFrame.join(x, axis=0)`

Same as `DataFrame.append`.

### `DataFrame.onHotEncode(columns)`

Identical to `DataFrame.getDummies`.

### `DataFrame.print()`

Prints the `DataFrame` to the console in a pretty way and then returns the `DataFrame`.

### `DataFrame.resetIndex()`

Returns a copy of the original `DataFrame` in which the list of row names have been reverted to their original values, like "row0", "row1", etc.

### `DataFrame.shuffle(axis=0)`

Returns a copy of the original `DataFrame` in which the rows (if `axis` is 0) or columns (if `axis` is 1) have been put in a random order.

### `DataFrame.sort(columns, directions)`

Returns a copy of the original `DataFrame` sorted by the given `columns`. For `columns`, a whole number, string, or array of whole numbers or strings can be given. By default, all of the columns will be sorted in ascending order; but to override this behavior, pass a boolean value, array of boolean values, or array of "ascending" / "descending" string values as `directions`.

### `DataFrame.toCSVString()`

Returns a stringified copy of the original `DataFrame` in CSV format.

### `DataFrame.toCSV(path, shouldIncludeIndex=true)`

Writes the `DataFrame` to disk at `path` in CSV format. By default, the saved data will include the list of row names. To disable this, pass `false` as `shouldIncludeIndex`.

### `DataFrame.toJSONString()`

Returns a stringified copy of the original `DataFrame` in JSON format. By default, the JSON object will have a structure like this:

```json
{
  "row0": {
    "col0": 5,
    "col1": 7,
    "col2": 9,
    ...
  },

  "row1": {
    ...
  },

  "row2": {
    ...
  },

  ...
}
```

However, the nesting can be reversed (putting the column names at the shallowest level and the row names at the next level) by setting `axis` to 1.

### `DataFrame.toJSON(path, axis=0)`

Writes the `DataFrame` to disk at `path` in JSON format. See the `DataFrame.toJSONString` method for more info about the structure of the object written to disk and the meaning of the `axis` value.

### `DataFrame.toObject(axis=0)`

Returns an object in the format described above in the `DataFrame.toJSONString` method. See that method for more info about the structure of the returned object and the meaning of the `axis` value.

### `DataFrame.transpose()`

Returns a copy of the original `DataFrame` in which the values (and row names and column names) have been flipped across the main diagonal (from top left to bottom right).

## `diff(a, b)`

Returns the difference between `set(a)` and `set(b)`; i.e., the set of values that are included in `a` and _not_ included in `b`. Note that `a` and `b` can be arbitrarily nested arrays containing any types of values.

## `distance(a, b)`

Returns the 2-norm (i.e., the Euclidean distance) between arbitrarily nested arrays `a` and `b`. And though `a` and `b` can have any shape, they must have the _same_ shape as each other.

## `divide(a, b)`

Returns the result of `a` divided by `b`. Both `a` and `b` can be numbers or arbitrarily nested arrays of numbers.

## `dot(a, b)`

Returns the dot product of vectors or matrices `a` and `b`.

## `dropMissing(x)`

Returns a copy of arbitrarily nested array `x` without any undefined or null values. Note that dropping values from nested arrays may result in jagged arrays.

## `dropMissingPairwise(a, b)`

Returns copies of arbitrarily nested arrays `a` and `b` without any undefined or null values. Note that `a` and `b` must have the same shape. Also note that dropping values from nested arrays may result in jagged arrays.

## `dropNaN(x)`

Returns a copy of arbitrarily nested array `x` without any non-numerical values. Note that dropping values from nested arrays may result in jagged arrays.

## `dropNaNPairwise(a, b)`

Returns copies of arbitrarily nested arrays `a` and `b` without any non-numerical values. Note that `a` and `b` must have the same shape. Also note that dropping values from nested arrays may result in jagged arrays.

## `dropUndefined(x)`

Identical to `dropMissing`.

## `exp(x)`

Returns _e_ to the power of `x` where `x` is a number or an arbitrarily nested array of numbers.

## `factorial(x)`

Returns the factorial where `x` is an integer or an arbitrarily nested array of integers.

## `find(x, fn)`

Returns the first value that causes the `fn` function to evaluate to true when evaluated on every item in `x`. Note that `x` can be an arbitrarily nested array _or_ an object.

## `findAll(x, fn)`

Returns all of the values that cause the `fn` function to evaluate to true when evaluated on every item in `x`. Note that `x` can be an arbitrarily nested array _or_ an object.

## `flatten(x)`

Returns a 1-dimensional copy of arbitrarily nested array `x`.

## `float(x)`

Returns `x` converted to a floating point number.

## `floor(x)`

Given a number `x`, returns either the next lowest integer (if `x` has a fractional component) or `x` itself (if `x` is already an integer). Note that `x` can also be an arbitrarily nested array of numbers.

## `identity(n)`

Returns an identity matrix of size `n` ✕ `n`.

## `indexOf(x, fn)`

Returns the index of the first value that causes the `fn` function to evaluate to true when evaluated on every item in `x`. Note that `x` can be an arbitrarily nested array _or_ an object.

## `int(x)`

Returns `x` converted to an integer.

## `intersect(a, b)`

Returns the intersection of `set(a)` and `set(b)`; i.e., the set of values that are in _both_ `a` and `b`. Note that `a` and `b` can be arbitrarily nested arrays containing any types of values.

## `inverse(x)`

Returns the inverse of a square matrix `x`.

## `isArray(x)`

Returns `true` if `x` is an array; otherwise, returns `false`.

## `isBoolean(x)`

Returns `true` if `x` is a boolean value; otherwise, returns `false`.

## `isDataFrame(x)`

Returns `true` if `x` is a `DataFrame`; otherwise, returns `false`.

## `isEqual(a, b)`

Returns `true` if `a` and `b` are equal; otherwise, returns `false`. Equality in the context of this function means that the two items are _functionally_ the same, even if they're not literally the same object in memory. For example:

```js
const a = { hello: "world" }
const b = { hello: "world" }
console.log(isEqual(a, b))
// true
```

In the above example, `a` and `b` are not literally the same object in memory, but they are nevertheless functionally equivalent; i.e., they have all the same properties.

## `isFunction(x)`

Returns `true` if `x` is a function; otherwise, returns `false`.

## `isJagged(x)`

Returns `true` if `x` is a jagged array; otherwise, returns `false`.

## `isNested(x)`

Returns `true` if `x` is a nested array; otherwise, returns `false`.

## `isNumber(x)`

Returns `true` if `x` is a number; otherwise, returns `false`.

## `isObject(x)`

Returns `true` if `x` is an object; otherwise, returns `false`. Weirdly, in JS, `null` is considered an object (which you can see for yourself with `typeof null`). But for the purposes of this function, `null` is _not_ considered to be an object in the usual sense; i.e., `isObject(null)` will return `false`.

## `isSeries(x)`

Returns `true` if `x` is a `Series`; otherwise, returns `false`.

## `isString(x)`

Returns `true` if `x` is a string; otherwise, returns `false`.

## `isUndefined(x)`

Returns `true` if `x` is undefined or null; otherwise, returns `false`. Note that NaN values are considered to be defined.

## `lerp(a, b, f)`

Returns the linear interpolation from `a` to `b` at fraction `f`. All of the arguments can be numbers or arbitrarily nested arrays of numbers, though `f` is typically in the range [0, 1].

## `log(x)`

Returns the natural log where `x` is a number or an arbitrarily nested array of numbers.

## `MathError(message)`

This class only exists because (1) I wanted to make it clear when errors where coming specifically from this library, and (2) I wanted to color-code the errors in the command line. Those are the only two ways in which `MathError` differs from `Error`.

## `max(x)`

Returns the maximum value in an arbitrarily nested array of numbers `x`.

## `mean(x)`

Returns the average value in an arbitrarily nested array of numbers `x`.

## `median(x)`

Returns the median value in an arbitrarily nested array of numbers `x`.

## `min(x)`

Returns the minimum value in an arbitrarily nested array of numbers `x`.

## `mode(x)`

Returns the mode(s) of an arbitrarily nested array of numbers `x`. If there are multiple modes, then an array will be returned; otherwise, a single number will be returned.

## `multiply(a, b, c, ...)`

Returns the product of where `a`, `b`, `c`, and so on, where those values are are numbers or arbitrarily nested arrays of numbers. See the note under `product` for a description of how `multiply` and `scale` differ from `product`.

## `ndarray(shape)`

Returns an _n_-dimensional array where `shape` is an array of whole numbers. For example, `ndarray([5, 10])` would return a 5 ✕ 10 matrix.

## `normal(shape)`

Returns an _n_-dimensional array of normally-distributed random numbers where `shape` is undefined, null, or an array of whole numbers. If `shape` is undefined or null, then a single number will be returned; otherwise, an array will be returned.

## `ones(shape)`

Returns an _n_-dimensional array of 1s where `shape` is an array of whole numbers.

## `permutations(x, r)`

Given an arbitrarily nested array `x`, returns all possible permutations of `r` items from `x`. Note that any nesting of `x` will be ignored — i.e., `x` will be "flattened" into a 1-dimensional array before getting the permutations — so it won't be possible with this function to get permutations of arrays.

## `product(x)`

Returns the product of all of the values in arbitrarily nested array `x`. Note that `product` differs slightly in functionality from `multiply` and `scale` in that `product` _only_ accepts arrays. Just as you might want to get the `sum` of values in an array, so you might also want to get the `product` of values in an array. If you want to multiply values by each other (whether those values are numbers, arrays, `Series` instances, or `DataFrame` instances), you'll want to use the `multiply` or `scale` functions.

## `pow(a, b)`

Returns `a` to the power of `b` where `a` and `b` are numbers or arbitrarily nested arrays of numbers.

## `print(x)`

Prints `x` to the console. For the most part, this function is basically the same as `console.log`. The only additional functionality it provides is printing `DataFrame` and `Series` objects nicely (most of the time).

## `random(shape)`

Returns an _n_-dimensional array of random numbers in the range [0, 1] where `shape` is undefined, null, or an array of whole numbers. If `shape` is undefined or null, then a single number will be returned; otherwise, an array will be returned.

## `range(a, b, step=1)`

Returns an array of numbers in the range [`a`, `b`) incremented by `step`.

## `remap(x, a, b, c, d)`

Returns `x` remapped from the range [`a`, `b`] to the range [`c`, `d`]. For example, `remap(2, 0, 10, 0, 100)` would return 20.

## `reshape(x, shape)`

Returns arbitrarily nested array `x` reshaped into shape `shape`.

## `reverse(x)`

Returns a reversed copy of array `x`. Only reverses at the shallowest level.

## `round(x)`

Returns the next lowest or highest integer when `x` is a number or an arbitrarily nested array of numbers.

## `scale(a, b, c, ...)`

Identical to `multiply`.

## `seed(n)`

Seeds the PRNG with `n`, an integer.

## `Series(x)`

The `Series` class is similar to pandas' [`Series`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.html). They at least represent the same kind of data (named 1-dimensional arrays), though they probably differ in many of their members.

The constructor for a `Series` can optionally receive a value `x`, which can be any of these:

- another `Series`
- a 1-dimensional array
- an object whose lone key-value pair represents the name and values, respectively

### `Series.values`

A 1-dimensional array containing the values held by the `Series`. Technically, `values` is a getter-setter pair that stores its data in a hidden `_values` property. While it's possible to set the `_values` property directly, this is strongly discouraged because it bypasses sanity checks on the data, like checking that new data is 1-dimensional, etc.

### `Series.index`

An array of names for each value. If you like, you can think of them as "row" or "column" names, even though there technically aren't any rows or columns in a `Series`. If you `get` a single row or column from a `DataFrame`, then the returned value will be a `Series` whose `index` represents the column names or row names, respectively, of the originating `DataFrame`.

Technically, `index` is a getter-setter pair that stores its data in a hidden `_index` property. While it's possible to set the `_index` property directly, this is strongly discouraged because it bypasses sanity checks on the data, like checking to make sure that the length of the new `index` array is the same as the length of the `values` array, etc.

### `Series.name`

The name of the `Series` object. If you `get` a single row or column out of a `DataFrame`, then the returned value will be a `Series` whose name represents the row name or column name, respectively, of the values in the originating `DataFrame`.

### `Series.shape`

A read-only array containing only a single value: the length of the `values` array.

### `Series.length`

A read-only value representing the length of the `values` array.

### `Series.isEmpty`

A read-only boolean value that is `true` if the `Series` contains no data or `false` otherwise.

### `Series.append(x)`

Returns a copy of the original `Series` with `x` appended to it. A single value, an array of values, or another `Series` can be passed as `x`.

### `Series.apply(fn)`

Returns a copy of the original `Series` with `fn` applied to every value.

### `Series.concat(x)`

Same as `Series.append`.

### `Series.dropMissing()`

Returns a copy of the original `Series` without null or undefined values.

### `Series.dropNaN()`

Returns a copy of the original `Series` without NaN values.

### `Series.filter(fn)`

Returns a copy of the original `Series` with only those values that return `true` when passed into function `fn`.

### `Series.getSubsetByIndices(indices)`

Returns a copy of the original `Series` containing only the values indicated by `indices`. A single whole number or an array of whole numbers can be passed as `indices`. This method is mostly used internally, though you can use it if you want; the easier way is just to use the `get` method.

### `Series.getSubsetByNames(names)`

Returns a copy of the original `Series` containing only the values indicated by `names`. A single string or an array of strings can be passed as `indices`. This method is mostly used internally, though you can use it if you want; the easier way is just to use the `get` method.

### `Series.get(selectors)`

Returns a copy of the original `Series` containing only the values indicated by `selectors`. A single whole number, a single string, or an array of whole numbers or strings can be passed as `selectors`.

### `Series.print()`

Prints the `Series` to the console in a pretty way, and then returns the `Series`.

### `Series.sortByIndex()`

Returns a copy of the original `Series` sorted by its index values.

### `Series.sort(ascending=true)`

Returns a copy of the original `Series` sorted by its values.

### `Series.toObject()`

Returns an object with this form:

```js
{
  [Series.name]: {
    [Series.index[0]]: Series.values[0],
    [Series.index[1]]: Series.values[1],
    ...
  }
}
```

## `set(x)`

Returns the unique values in arbitrarily nested array `x`.

## `shape(x)`

Returns the shape of arbitrarily nested array `x`. If `x` is smooth, then the returned shape will be a 1-dimensional array; but if `x` is jagged, then the returned shape will be an array with a mix of numbers and sub-arrays. For example:

```js
const smooth = [
  [2, 3, 4],
  [5, 6, 7],
]

console.log(shape(smooth))
// [ 2, 3 ]

const jagged = [2, [3, 4], 5]
console.log(shape(jagged))
// [ 3, [ undefined, 2, undefined ] ]
```

In the case of `smooth` above, the returned shape represents the number of rows and columns respectively; i.e., there are 2 rows and 3 columns. But instead of thinking of this shape as `[2 rows, 3 columns]`, we could also think of it as `[outer array length is 2, inner array length is 3]`. This way of thinking about it will hopefully clarify what's going on in the case of `jagged`.

In the case of `jagged`, the first part of the shape, 3, represents the length of the outer array. You can also think of it as having 3 "rows", but that might be a little confusing since we can see that not all of the items are actually rows; so thinking of 3 as the length of the outer array makes the most sense here, I think. If it helps, you can think of `jagged` as looking like this: `[?, ?, ?]`. Now, to get the second part of the shape, we need to figure out how long each inner array in `jagged` is. Well, the first item in `jagged` is 2, which isn't an array, and thus has a length of `undefined`; but the second item is `[3, 4]`, which is an array with length of 2; and the third item is 5, which isn't an array, and thus has a length of `undefined`.

If all of the items in `jagged` were arrays with length 2, then its shape would be `[3, 2]`. But because the inner "array" lengths don't all match up, a single number won't capture enough information about what `jagged` looks like on the inside; so instead we place an array in the second slot of the shape to indicate that each item has a different length.

## `shuffle(x)`

Returns a shuffled copy of arbitrarily nested array `x`. Note that only the shallowest level of `x` is shuffled.

## `sign(x)`

Returns -1, 0, or 1 if `x` is less than 0, equal to 0 or greater than 0, respectively. Note that `x` can be a number or an arbitrarily nested array of numbers.

## `sin(s)`

Returns the sine where `x` is a number or an arbitrarily nested array of numbers.

## `slice(x, indices)`

Returns a subset of arbitrarily nested array `x` identified by `indices`. Note that `indices` is an array that can contain three types of values:

- null / undefined
- a single whole number
- an array of whole numbers

Each value in `indices` represents item numbers along that dimension of `x`. For example, if `x` is a matrix, then `indices` would need to contain exactly two of the above value types: one for picking out rows, and one for picking out columns.

```js
const x = reshape(range(0, 100), [10, 10])
console.log(x)
// [
//   [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
//   [ 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ],
//   [ 20, 21, 22, 23, 24, 25, 26, 27, 28, 29 ],
//   [ 30, 31, 32, 33, 34, 35, 36, 37, 38, 39 ],
//   [ 40, 41, 42, 43, 44, 45, 46, 47, 48, 49 ],
//   [ 50, 51, 52, 53, 54, 55, 56, 57, 58, 59 ],
//   [ 60, 61, 62, 63, 64, 65, 66, 67, 68, 69 ],
//   [ 70, 71, 72, 73, 74, 75, 76, 77, 78, 79 ],
//   [ 80, 81, 82, 83, 84, 85, 86, 87, 88, 89 ],
//   [ 90, 91, 92, 93, 94, 95, 96, 97, 98, 99 ]
// ]

const rows = range(5, 10)
const cols = range(4, 7)
const subset = slice(x, [rows, cols])
console.log(subset)
// [
//   [ 54, 55, 56 ],
//   [ 64, 65, 66 ],
//   [ 74, 75, 76 ],
//   [ 84, 85, 86 ],
//   [ 94, 95, 96 ]
// ]
```

## `sort(x, fn)`

Sorts arbitrarily nested array `x` by function `fn`. This function is identical to [`Array.prototype.sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) except that it does _not_ sort `x` in-place; instead it returns a sorted copy of `x`.

## `sqrt(x)`

Returns the square root where `x` is a number or an arbitrarily nested array of numbers.

## `std(x)`

Returns the standard deviation where `x` is an arbitrarily nested array of numbers.

## `stdev(x)`

Identical to `std`.

## `subtract(a, b)`

Returns the difference where `a` and `b` are numbers or arbitrarily nested arrays of numbers. Note that `a` and `b` don't both have to be the same type; `a` could be a number while `b` could be an arbitrarily nested array of numbers, or vice versa.

## `sum(x)`

Returns the sum of all values in arbitrarily nested array `x`. The difference between `add` and `sum` is that `sum` _only_ accepts arrays. In other words, use `add` when you want to add up multiple distinct values passed as arguments (where those arguments can be numbers, arrays, `Series` instances, or `DataFrame` instances); and use `sum` when you want to add up all of the values in a single array.

## `tan(x)`

Returns the tangent where `x` is a number or an arbitrarily nested array of numbers.

## `time(fn)`

Identical to `timeSync`.

## `timeSync(fn)`

Returns the time in milliseconds that it takes for synchronous function `fn` to run.

## `timeAsync(fn)`

Returns a `Promise` that resolves to the time in milliseconds that it takes for asynchronous function `fn` to run.

## `transpose(x)`

Returns the transpose of a vector or matrix `x`.

## `union(a, b)`

Returns the union of the set of values in `a` and the set of values in `b`.

## `variance(x)`

Returns the variance of the values in arbitrarily nested array `x`.

## `vectorize(fn)`

Returns a function that operates on individual values or arbitrarily nested arrays of values. It's a little like numpy's [`vectorize`](https://numpy.org/doc/stable/reference/generated/numpy.vectorize.html) function except that numpy probably has a bunch of fancy optimizations that make vectorized operations very fast. In this library, though, no optimizations are applied; this function merely makes it easier for individual functions to operate on arrays of data.

For example, the `Math.sin` function only accepts a single value. But by using the `vectorize` function, we can create a function that accepts either single values or arrays of values:

```js
const sin = vectorize(Math.sin)

console.log(sin(0))
// 0

const angles = [0, Math.PI / 4, Math.PI / 2]
console.log(sin(angles))
// [ 0, 0.7071067811865475, 1 ]
```

This also works when the function requires multiple arguments. For example, the `add` function in this library accepts two arguments and has been passed through the `vectorize` function so that it accepts individual values or arrays of values:

```js
console.log(add(2, 3))
// 5

console.log(add([2, 3, 4], [5, 6, 7]))
// [ 7, 9, 11 ]

console.log(add(2, [5, 6, 7]))
// [ 7, 8, 9 ]

console.log(add([2, 3, 4], 5))
// [ 7, 8, 9 ]
```

At the moment, though, the function is pretty naive about the _shapes_ of the arrays; e.g., it'll throw an error in the `add` function if both arguments are arrays of differing shapes.

## `zeros(shape)`

Returns an _n_-dimensional array of 0s where `shape` is an array of whole numbers.

## `zip(a, b, c, ...)`

Returns a new array or new `DataFrame` in which the values of the given arrays (`a`, `b`, `c`, etc.) are stacked side-by-side. For example:

```js
const a = [2, 3, 4]
const b = [5, 6, 7, 8]
const c = zip(a, b)
console.log(c)
// [
//   [ 2, 5 ],
//   [ 3, 6 ],
//   [ 4, 7 ],
//   [ undefined, 8 ]
// ]
```

If any of the items passed into the function are `Series` objects, then the returned value will be a `DataFrame`; otherwise, the returned value will be an array.

# Notes

## Jagged arrays

Note that for all of the above, "arbitrarily nested array" typically means a _non-jagged_ array. Jagged arrays (AKA "ragged" arrays) are arrays in which nested arrays have inconsistent lengths. For example, this — `[[1], [2, 3], [4, 5, 6]]` — would be a jagged array because the sub-arrays have lengths 1, 2, and 3 respectively. Many of the above functions expect non-jagged arrays. (Is there a technical term for non-jagged arrays? Maybe "even" arrays? Or "smooth" arrays? I'll go with "smooth" for now.) Some of them may not throw an error when passed a jagged array, though; they may quietly do their work and return an unexpected result. For example, the `dropNaN` function will happily drop NaN values from nested arrays, potentially leaving them jagged as a result. I've tried to let the functions operate this way when it's not strictly necessary for them to operate on smooth arrays. When a smooth array is required, an error should be thrown if the function receives a jagged array instead.

## Random numbers

The PRNG (pseudo-random number generator) implemented in this library uses the [xoroshiro256++](https://prng.di.unimi.it/) algorithm, in case that matters to you. To seed the PRNG, pass a number into the `seed` function. Large integers tend to do better than small ones. The `random`, `normal`, and `shuffle` functions can all be seeded. For example:

```js
const { random, seed } = require("js-math-tools")

seed(230498349)
random(5)
// [
//   0.018838884276985594,
//   0.5304929121766935,
//   0.7364885210604148,
//   0.005920131518888056,
//   0.8434281063536071
// ]

seed(230498349)
random(5)
// [
//   0.018838884276985594,
//   0.5304929121766935,
//   0.7364885210604148,
//   0.005920131518888056,
//   0.8434281063536071
// ]
```

Do be aware, though, that there's no such thing in this library as having multiple PRNGs at the same time, each with different seeds. Instead, all of the randomization functions share the same seeding because they all share the same core `random` function.

# To do

- Add a method that makes it easy to merge `DataFrames` along a certain key. For example, it'd be nice to be able to merge multiple datasets that have a unique ID column with values that match across the sets.
- Add a simplex noise function.
- Convert to TS?
- Organize the files a little better? Right now, they're just in a big heap. It might be better, though, to classify them as randomization functions, statistics functions, etc.
- Work out a more coherent theory of when to return false / NaN / undefined / null values versus when to throw errors.
- Keep documentation up-to-date!
