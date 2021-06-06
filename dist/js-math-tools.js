(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const vectorize=require("./vectorize.js"),abs=vectorize(function(e){try{return"boolean"==typeof e?NaN:Math.abs(e)}catch(e){return NaN}});module.exports=abs;

},{"./vectorize.js":82}],2:[function(require,module,exports){
const vectorize=require("./vectorize.js"),add=vectorize(function(){try{let e;const t=Object.keys(arguments);for(let r=0;r<t.length;r++){const o=t[r],c=arguments[o];if("number"!=typeof c)return NaN;e?e+=arguments[o]:e=c}return e}catch(e){return NaN}});module.exports=add;

},{"./vectorize.js":82}],3:[function(require,module,exports){
const assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),isNumber=require("./is-number.js"),shape=require("./shape.js"),transpose=require("./transpose.js");function append(e,s,t=0){assert(!isUndefined(e),"You must pass two arrays into the `append` function!"),assert(!isUndefined(s),"You must pass two arrays into the `append` function!"),assert(isArray(e),"You must pass two arrays into the `append` function!"),assert(isArray(s),"You must pass two arrays into the `append` function!"),assert(isNumber(t),"The `axis` argument to the `append` function must be 0 or 1!"),assert(t>=0&&t<2,"The `axis` argument to the `append` function must be 0 or 1!"),assert(parseInt(t)===t,"The `axis` argument to the `append` function must be 0 or 1!");const n=shape(e),a=shape(s);assert(n.length===a.length,"The two arrays passed into the `append` function must have the same number of dimensions!"),assert(n.length<3&&a.length<3,"The two arrays passed into the `append` function must be 1- or 2-dimensional!");for(let e=0;e<n.length;e++)e!==t&&assert(n[e]===a[e],`The two arrays passed into the \`append\` function must have the same shapes along all axes *except* the axis along which they're being appended! (${n[e]} != ${a[e]})`);if(assert(t<n.length,"The axis argument you passed into the `append` function is out of bounds for the array!"),0===n.length)return[];if(1===n.length)return e.concat(s);if(2===n.length){if(0===t){const t=[];for(let s=0;s<n[0];s++)t.push(e[s]);for(let e=0;e<a[0];e++)t.push(s[e]);return t}if(1===t)return transpose(append(transpose(e),transpose(s),0))}}module.exports=append;

},{"./assert.js":10,"./is-array.js":38,"./is-number.js":42,"./is-undefined.js":44,"./shape.js":69,"./transpose.js":79}],4:[function(require,module,exports){
const vectorize=require("./vectorize.js");function apply(e,r){try{return r(e)}catch(e){return NaN}}module.exports=vectorize(apply);

},{"./vectorize.js":82}],5:[function(require,module,exports){
const vectorize=require("./vectorize.js"),arccos=vectorize(function(r){try{return Math.acos(r)}catch(r){return NaN}});module.exports=arccos;

},{"./vectorize.js":82}],6:[function(require,module,exports){
const vectorize=require("./vectorize.js"),arcsin=vectorize(function(r){try{return Math.asin(r)}catch(r){return NaN}});module.exports=arcsin;

},{"./vectorize.js":82}],7:[function(require,module,exports){
const vectorize=require("./vectorize.js"),arctan=vectorize(function(t){try{return Math.atan(t)}catch(t){return NaN}});module.exports=arctan;

},{"./vectorize.js":82}],8:[function(require,module,exports){
const indexOf=require("./index-of.js"),max=require("./max.js");function argmax(r){try{return indexOf(r,max(r))}catch(r){return NaN}}module.exports=argmax;

},{"./index-of.js":33,"./max.js":48}],9:[function(require,module,exports){
const indexOf=require("./index-of.js"),min=require("./min.js");function argmin(n){try{return indexOf(n,min(n))}catch(n){return NaN}}module.exports=argmin;

},{"./index-of.js":33,"./min.js":51}],10:[function(require,module,exports){
module.exports=function(o,r){if(!o)throw new Error(r)};

},{}],11:[function(require,module,exports){
let vectorize=require("./vectorize.js"),ceil=vectorize(function(e){try{return"number"!=typeof e?NaN:Math.ceil(e)}catch(e){return NaN}});module.exports=ceil;

},{"./vectorize.js":82}],12:[function(require,module,exports){
let isUndefined=require("./is-undefined.js"),abs=require("./abs.js"),vectorize=require("./vectorize.js"),chop=vectorize(function(e,i){try{return isNaN(e)?NaN:i&&isNaN(i)?NaN:(i=isUndefined(i)||isNaN(i)?1e-10:i,abs(e)<i?0:e)}catch(e){return NaN}});module.exports=chop;

},{"./abs.js":1,"./is-undefined.js":44,"./vectorize.js":82}],13:[function(require,module,exports){
const vectorize=require("./vectorize.js"),clamp=vectorize(function(N,e,r){try{return isNaN(N)?NaN:isNaN(e)?NaN:isNaN(r)?NaN:N<e?e:N>r?r:N}catch(N){return NaN}});module.exports=clamp;

},{"./vectorize.js":82}],14:[function(require,module,exports){
const mean=require("./mean.js"),sqrt=require("./sqrt.js"),variance=require("./variance.js"),dropNaNPairwise=require("./drop-nan-pairwise.js");function cohensd(e,r){try{const[a,n]=dropNaNPairwise(e,r);return 0===a.length||0===n.length?NaN:(mean(a)-mean(n))/sqrt((variance(a)+variance(n))/2)}catch(e){return NaN}}module.exports=cohensd;

},{"./drop-nan-pairwise.js":26,"./mean.js":49,"./sqrt.js":75,"./variance.js":81}],15:[function(require,module,exports){
const assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js");function copy(e){if("object"==typeof e){if(isUndefined(e))return e;if(isArray(e))return e.map(copy);{const r={};return Object.keys(e).forEach(function(i){r[i]=copy(e[i])}),r}}return e}module.exports=copy;

},{"./assert.js":10,"./is-array.js":38,"./is-undefined.js":44}],16:[function(require,module,exports){
const covariance=require("./covariance.js"),std=require("./std.js"),dropNaNPairwise=require("./drop-nan-pairwise.js");function correl(r,e){try{const[a,t]=dropNaNPairwise(r,e);return 0===a.length||0===t.length?NaN:covariance(a,t)/(std(a)*std(t))}catch(r){return NaN}}module.exports=correl;

},{"./covariance.js":19,"./drop-nan-pairwise.js":26,"./std.js":76}],17:[function(require,module,exports){
const isNumber=require("./is-number.js"),vectorize=require("./vectorize.js");function cos(e){try{return isNumber(e)?Math.cos(e):NaN}catch(e){return NaN}}module.exports=vectorize(cos);

},{"./is-number.js":42,"./vectorize.js":82}],18:[function(require,module,exports){
const assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),flatten=require("./flatten.js"),isEqual=require("./is-equal.js"),set=require("./set.js");function count(e,t){assert(!isUndefined(e),"You must pass an array and some items to count into the `count` function!"),assert(isArray(e),"You must pass an array and some items to count into the `count` function!");const s=flatten(e);return t=isUndefined(t)?set(e):t,isArray(t)?flatten(t).map(function(e){const t=s.filter(t=>isEqual(e,t)).length;return{item:e,count:t}}):s.filter(e=>e===t).length}module.exports=count;

},{"./assert.js":10,"./flatten.js":28,"./is-array.js":38,"./is-equal.js":40,"./is-undefined.js":44,"./set.js":68}],19:[function(require,module,exports){
const assert=require("./assert.js"),mean=require("./mean.js"),dropNaNPairwise=require("./drop-nan-pairwise.js");function covariance(e,r){try{assert(e.length===r.length,"The two arrays passed into the `covariance` function have different lengths!");const[a,t]=dropNaNPairwise(e,r);if(0===a.length||0===t.length)return NaN;assert(a.length===t.length,"The two arrays passed into the `covariance` function have different lengths after NaN values are dropped!");const n=mean(a),s=mean(t);let i=0;for(let e=0;e<a.length;e++)i+=(a[e]-n)*(t[e]-s);return i/a.length}catch(e){return NaN}}module.exports=covariance;

},{"./assert.js":10,"./drop-nan-pairwise.js":26,"./mean.js":49}],20:[function(require,module,exports){
(function (process){(function (){
const assert=require("./assert.js"),isArray=require("./is-array.js"),isUndefined=require("./is-undefined.js"),shape=require("./shape.js"),transpose=require("./transpose.js"),range=require("./range.js"),isNumber=require("./is-number.js"),isString=require("./is-string.js"),apply=require("./apply.js"),isFunction=require("./is-function.js"),ndarray=require("./ndarray.js"),copy=require("./copy.js"),Series=require("./series.js"),flatten=require("./flatten.js"),isEqual=require("./is-equal.js"),max=require("./max.js"),min=require("./min.js"),set=require("./set.js"),isBoolean=require("./is-boolean.js"),random=require("./random.js"),sort=require("./sort.js");function makeKey(e){const s="abcdefghijklmnopqrstuvwxyz1234567890";let n="";for(let t=0;t<e;t++)n+=s[parseInt(Math.random()*s.length)];return n}function isInteger(e){return isNumber(e)&&parseInt(e)===e}function isWholeNumber(e){return isInteger(e)&&e>=0}function isObject(e){return e instanceof Object&&!isArray(e)}function isDataFrame(e){return e instanceof DataFrame}function isSeries(e){return e instanceof Series}function quote(e){let s=/"(.*?)"/g,n=e.match(s),t=e.slice();return n&&n.forEach(e=>{t=t.replace(e,`“${e.substring(1,e.length-1)}”`)}),s=/'(.*?)'/g,(n=e.match(s))&&n.forEach(e=>{t=t.replace(e,`‘${e.substring(1,e.length-1)}’`)}),`"${t}"`}function leftPad(e,s){assert(isNumber(e),"The `leftPad` function only works on numbers!");let n=e.toString();for(;n.length<s;)n="0"+n;return n}class DataFrame{constructor(e){const s=this;if(Object.defineProperty(s,"_values",{value:[],configurable:!0,enumerable:!1,writable:!0}),Object.defineProperty(s,"values",{configurable:!0,enumerable:!0,get:()=>s._values,set(e){assert(isArray(e),"The new values must be a 2-dimensional array!");const n=shape(e);assert(2===n.length,"The new array of values must be 2-dimensional!"),n[0]<s._index.length?s._index=s._index.slice(0,n[0]):n[0]>s._index.length&&(s._index=s._index.concat(range(s._index.length,n[0]).map(e=>"row"+leftPad(e,(n[0]-1).toString().length)))),n[1]<s._columns.length?s._columns=s._columns.slice(0,n[1]):n[1]>s._columns.length&&(s._columns=s._columns.concat(range(s._columns.length,n[1]).map(e=>"col"+leftPad(e,(n[1]-1).toString().length)))),s._values=e}}),Object.defineProperty(s,"_columns",{value:[],configurable:!0,enumerable:!1,writable:!0}),Object.defineProperty(s,"columns",{configurable:!0,enumerable:!0,get:()=>s._columns,set(e){assert(isArray(e),"The new columns list must be a 1-dimensional array of strings!"),assert(e.length===s.shape[1],"The new columns list must be the same length as the old columns list!"),assert(1===shape(e).length,"The new columns list must be a 1-dimensional array of strings!"),e=e.map(e=>"string"==typeof e?e:JSON.stringify(e)||e.toString()),s._columns=e}}),Object.defineProperty(s,"_index",{value:[],configurable:!0,enumerable:!1,writable:!0}),Object.defineProperty(s,"index",{configurable:!0,enumerable:!0,get:()=>s._index,set(e){assert(isArray(e),"The new index must be a 1-dimensional array of strings!"),assert(e.length===s.shape[0],"The new index must be the same length as the old index!"),assert(1===shape(e).length,"The new index must be a 1-dimensional array of strings!"),e=e.map(e=>"string"==typeof e?e:JSON.stringify(e)||e.toString()),s._index=e}}),assert(isUndefined(e)||e instanceof Object,"The `data` passed into the constructor of a DataFrame must be either (1) an object where the key-value pairs are (respectively) column names and 1-dimensional arrays of values, or (2) a 2-dimensional array of values."),e)if(isArray(e)){const n=shape(e);assert(2===n.length,"The `data` array passed into the constructor of a DataFrame must be 2-dimensional!"),s.values=e}else{s._columns=Object.keys(e);const n=[];s._columns.forEach(s=>{const t=e[s];n.push(t)}),s._values=transpose(n);const t=shape(s.values);s._index=range(0,t[0]).map(e=>"row"+leftPad(e,(t[0]-1).toString().length))}}static async fromCSV(e,s){let n;if(s=s||{},"undefined"==typeof process){const s=await fetch(e);n=await s.text()}else{const t=require("fs"),r=s.encoding||"utf8";n=t.readFileSync(e,r)}let t=n.split("\n").filter(e=>e.length>0).map(e=>{const s={};return(e.match(/"(.*?)"/g)||[]).forEach(n=>{const t=makeKey(32);e=e.replaceAll(n,t),s[t]=n}),e.split(",").map((e,n)=>{e=s[e]||e;try{let s=JSON.parse(e);return isArray(s)?e:s}catch(s){return e}})});const r=max(t.map(e=>e.length));let a,i;t=t.map(e=>(e.length=r,e));const o=!isBoolean(s.hasHeaderRow)||s.hasHeaderRow,l=!!isBoolean(s.hasIndexColumn)&&s.hasIndexColumn;return o&&(a=t.shift()),l&&(i=t.map(e=>e.shift()),a&&a.shift()),t=new DataFrame(t),a&&(t.columns=a),i&&(t.index=i),t}get shape(){return shape(this.values)}get rows(){return this.index}set rows(e){this.index=e}isEmpty(){return 0===set(this.values).filter(e=>!isUndefined(e)).length}clear(){const e=new DataFrame(ndarray(this.shape));return e.columns=this.columns.slice(),e.index=this.index.slice(),e}get(e,s){const n=this;(isString(e)||isNumber(e))&&(e=[e]),(isString(s)||isNumber(s))&&(s=[s]);const t=set((e||[]).concat(s||[]).map(e=>typeof e));return assert(t.length<=2,"Only whole numbers and/or strings are allowed in `get` arrays!"),1===t.length&&assert("string"===t[0]||"number"===t[0],"Only whole numbers and/or strings are allowed in `get` arrays!"),2===t.length&&(assert(t.indexOf("string")>-1,"Only whole numbers and/or strings are allowed in `get` arrays!"),assert(t.indexOf("number")>-1,"Only whole numbers and/or strings are allowed in `get` arrays!")),isUndefined(e)||(e=e.map(e=>"string"==typeof e?(assert(n.index.indexOf(e)>-1,`Row "${e}" does not exist!`),e):"number"==typeof e?(assert(e>=0,`Index ${e} is out of bounds!`),assert(parseInt(e)===e,"Row numbers must be integers!"),assert(e<n.index.length,`Index ${e} is out of bounds!`),n.index[e]):void 0)),isUndefined(s)||(s=s.map(e=>"string"==typeof e?(assert(n.columns.indexOf(e)>-1,`Column "${e}" does not exist!`),e):"number"==typeof e?(assert(e>=0,`Column ${e} is out of bounds!`),assert(parseInt(e)===e,"Column numbers must be integers!"),assert(e<n.columns.length,`Column ${e} is out of bounds!`),n.columns[e]):void 0)),n.getSubsetByNames(e,s)}getSubsetByNames(e,s){const n=this;isUndefined(e)&&(e=n.index),isUndefined(s)&&(s=n.columns),"string"==typeof e&&(e=[e]),"string"==typeof s&&(s=[s]),assert(isArray(e)&&isArray(s),"The `rows` and `cols` parameters must be 1-dimensional arrays of strings."),assert(1===shape(e).length&&1===shape(s).length,"The `rows` and `cols` parameters must be 1-dimensional arrays of strings."),assert(e.length>0,"The `rows` array must contain at least one row name."),assert(s.length>0,"The `cols` array must contain at least one column name."),e.forEach(e=>{assert(isString(e),"The `rows` and `cols` parameters must be 1-dimensional arrays of strings."),assert(n.index.indexOf(e)>-1,`The row name "${e}" does not exist in the list of rows.`)}),s.forEach(e=>{assert(isString(e),"The `rows` and `cols` parameters must be 1-dimensional arrays of strings."),assert(n.columns.indexOf(e)>-1,`The column name "${e}" does not exist in the list of columns.`)});const t=e.map(e=>s.map(s=>n.values[n.index.indexOf(e)][n.columns.indexOf(s)]));if(1===e.length&&1===s.length)return flatten(t)[0];if(1===e.length){const n=new Series(flatten(t));return n.name=e[0],n.index=s,n}if(1===s.length){const n=new Series(flatten(t));return n.name=s[0],n.index=e,n}const r=new DataFrame(t);return r.columns=s,r.index=e,r}getSubsetByIndices(e,s){const n=this,t=n.shape;isUndefined(e)&&(e=range(0,t[0])),isUndefined(s)&&(s=range(0,t[1])),"number"==typeof e&&(e=[e]),"number"==typeof s&&(s=[s]),assert(isArray(e)&&isArray(s),"The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."),assert(1===shape(e).length&&1===shape(s).length,"The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."),assert(e.length>0,"The `rowIndices` array must contain at least one index."),assert(s.length>0,"The `colIndices` array must contain at least one index."),e.forEach(e=>{assert(isWholeNumber(e),"The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."),assert(e<n.index.length,`The row index ${e} is out of bounds.`)}),s.forEach(e=>{assert(isWholeNumber(e),"The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."),assert(e<n.columns.length,`The column index ${e} is out of bounds.`)});const r=e.map(e=>n.index[e]),a=s.map(e=>n.columns[e]);return n.getSubsetByNames(r,a)}loc(e,s){return this.getSubsetByNames(e,s)}iloc(e,s){return this.getSubsetByIndices(e,s)}transpose(){const e=new DataFrame(transpose(this.values));return e.columns=this.index,e.index=this.columns,e}get T(){return this.transpose()}resetIndex(){const e=this.copy();return e.index=range(0,this.shape[0]).map(s=>"row"+leftPad(s,(e.index.length-1).toString().length)),e}copy(){if(this.isEmpty())return new DataFrame;const e=new DataFrame(copy(this.values));return e.columns=this.columns.slice(),e.index=this.index.slice(),e}assign(e,s){let n,t;isUndefined(s)?assert(!isArray(t=e),"When using only one parameter for the `assign` method, the parameter must be an object or a Series."):(t=s,assert(isString(n=e),"When using two parameters for the `assign` method, the first parameter must be a string."),assert(isSeries(t)||isArray(t)&&1===shape(t).length,"When using two parameters for the `assign` method, the second parameter must be a Series or a 1-dimensional array.")),assert(isObject(t)||isSeries(t)||isArray(t)&&1===shape(t).length,"An object, Series, or 1-dimensional array must be passed into the `assign` method.");const r=this;if(isSeries(t)){const e={};return assert(r.isEmpty()||isEqual(t.index,r.index),"The index of the new data does not match the index of the DataFrame."),e[n||t.name]=t.values,r.assign(e)}if(isArray(t)){const e={};return e[n||"data"]=t,r.assign(e)}{let e=r.copy(),s=e.shape;return Object.keys(t).forEach(n=>{const r=t[n];if(assert(isArray(r),"Each key-value pair must be (respectively) a string and a 1-dimensional array of values."),assert(1===shape(r).length,"Each key-value pair must be (respectively) a string and a 1-dimensional array of values."),e.isEmpty())e.values=transpose([r]),e.columns=[n],s=e.shape;else{assert(r.length===s[0],`Column "${n}" in the new data is not the same length as the other columns in the original DataFrame.`);let t=e.columns.indexOf(n);t<0&&(e.columns.push(n),t=e.columns.indexOf(n)),e.values.forEach((e,s)=>{e[t]=r[s]})}}),e}}apply(e,s){s=s||0,assert(isFunction(e),"The first parameter to the `apply` method must be a function."),assert(0===s||1===s,"The second parameter to the `apply` method (the `axis`) must be 0 or 1.");const n=this;if(0===s){const s=transpose(n.values).map((s,t)=>e(s,n.columns[t]));if(1===shape(s).length){const e=new Series(s);return e.index=copy(n.columns),e}{const e=new DataFrame(transpose(s));return e.index=copy(n.index),e.columns=copy(n.columns),e}}if(1===s){const s=n.values.map((s,t)=>e(s,n.index[t]));if(1===shape(s).length){const e=new Series(s);return e.index=copy(n.index),e}{const e=new DataFrame(s);return e.index=copy(n.index),e.columns=copy(n.columns),e}}}map(e,s){return this.apply(e,s)}dropMissing(e,s,n){function t(e){if(n>0){let s=0;for(let t=0;t<e.length;t++){const r=e[t];if(isUndefined(r)&&s++,s>=n)return[]}}else if("any"===s)for(let s=0;s<e.length;s++){const n=e[s];if(isUndefined(n))return[]}else if("all"===s){for(let s=0;s<e.length;s++){const n=e[s];if(!isUndefined(n))return e}return[]}return e}assert(0===(e=e||0)||1===e,"The first parameter of the `dropMissing` method (the `axis`) must be 0 or 1."),assert(isWholeNumber(n=n||0),"The third parameter of the `dropMissing` method (the `threshold`) should be a whole number (meaning that data should be dropped if it contains more than `threshold` null values)."),assert("any"===(s=n>0?"none":s||"any")||"all"===s||"none"===s,"The second parameter of the `dropMissing` method (the `condition` parameter, which indicates the condition under which data should be dropped) should be 'any' or 'all' (meaning that if 'any' of the data contains null values, then it should be dropped; or that if 'all' of the data contains null values, then it should be dropped).");let r=this.copy();const a=Math.random().toString();if(0===e){const e=(r=r.assign(a,r.index)).values.map(t).filter(e=>e.length>0);if(shape(e).length<2)return new DataFrame;r.values=e;let s=r.get(null,a);if(isUndefined(s))return new DataFrame;isString(s)&&(s=[s]),isSeries(s)&&(s=s.values),r.index=s,r=r.drop(null,a)}else if(1===e){const e=(r=(r=r.transpose()).assign(a,r.index)).values.map(t).filter(e=>e.length>0);if(shape(e).length<2)return new DataFrame;r.values=e;let s=r.get(null,a);if(isUndefined(s))return new DataFrame;isString(s)&&(s=[s]),isSeries(s)&&(s=s.values),r.index=s,r=(r=r.drop(null,a)).transpose()}return r}drop(e,s){const n=this;let t,r;isUndefined(e)&&(e=[]),isUndefined(s)&&(s=[]),(isString(e)||isNumber(e))&&(e=[e]),(isString(s)||isNumber(s))&&(s=[s]),assert(isArray(e),"The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."),assert(isArray(s),"The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."),assert(1===shape(e).length,"The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."),assert(1===shape(s).length,"The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."),n.index.forEach((s,n)=>{e.indexOf(s)<0&&e.indexOf(n)<0&&(t||(t=[]),t.push(s))}),n.columns.forEach((e,n)=>{s.indexOf(e)<0&&s.indexOf(n)<0&&(r||(r=[]),r.push(e))});let a=n.get(t,r);if(isSeries(a)){let e=new DataFrame;e=e.assign(a),n.index.indexOf(a.name)>-1&&(e=e.transpose()),a=e}return a}dropColumns(e){return this.drop(null,e)}dropRows(e){return this.drop(e,null)}toObject(){const e=this,s={};return e.values.forEach((n,t)=>{const r={};n.forEach((s,n)=>{r[e.columns[n]]=s}),s[e.index[t]]=r}),s}toCSVString(e){const s=this;e=isUndefined(e)?{}:e;const n=!isBoolean(e.hasHeaderRow)||e.hasHeaderRow,t=!!isBoolean(e.hasIndexColumn)&&e.hasIndexColumn;let r,a,i;return n&&t?(r=["(index)"].concat(copy(s.index)),i=[a=copy(s.columns)].concat(s.values).map((e,s)=>[r[s]].concat(e))):!n&&t?(r=copy(s.index),i=s.values.map((e,s)=>[r[s]].concat(e))):n&&!t?i=[a=copy(s.columns)].concat(s.values):n||t||(i=s.values),i=i.map((e,s)=>e.map(e=>isString(e)?quote(e):e).join(",")).join("\n")}toCSV(e,s){const n=this.toCSVString(s);if("undefined"==typeof process){if(e.includes("/")){const s=e.split("/");e=s[s.length-1]}const s=document.createElement("a");s.href=`data:text/csv;charset=utf-8,${encodeURIComponent(n)}`,s.download=e,s.dispatchEvent(new MouseEvent("click"))}else{const s=require("fs"),t=require("path");s.writeFileSync(t.resolve(e),n,"utf8")}return this}print(){const e=this;if(isEqual(e.shape,[0]))return console.table({}),e;const s="undefined"==typeof window?20:10,n=parseInt(s/2),t="undefined"==typeof window?Math.floor(process.stdout.columns/24)-1:10,r=parseInt(t/2),a=s>e.index.length?null:range(0,n).concat(range(e.index.length-n,e.index.length)),i=t>e.columns.length?null:range(0,r).concat(range(e.columns.length-r,e.columns.length));let o=e.get(a,i);return o instanceof Series&&(1===e.shape[0]?((o=new DataFrame([o.values])).index=e.index,o.columns=new Series(e.columns).get(i).values):1===e.shape[1]&&((o=new DataFrame([o.values]).transpose()).index=new Series(e.index).get(a).values,o.columns=e.columns)),s<=e.index.length&&(o._index.splice(n,0,"..."),o._values.splice(n,0,range(0,o.columns.length).map(e=>"..."))),t<=e.columns.length&&(o._columns.splice(r,0,"..."),o._values=o._values.map(e=>(e.splice(r,0,"..."),e))),console.table(o.toObject()),e}sort(e,s){let n=this.copy();const t=random().toString();return n=n.assign(t,n.index),isUndefined(e)&&(e=[t],s=[!0]),(isNumber(e)||isString(e))&&(e=[e],(isBoolean(s)||isString(s))&&(s=[s])),assert(isArray(e),"The first parameter of the `sort` method must be (1) a string or index representing a column name or index, respectively; (2) a 1-dimensional array of strings and/or indices; or (3) null."),assert(1===shape(e).length,"The first parameter of the `sort` method must be (1) a string or index representing a column name or index, respectively; (2) a 1-dimensional array of strings and/or indices; or (3) null."),isUndefined(s)&&(s=range(0,e.length).map(e=>!0)),assert(isArray(s),"The second parameter of the `sort` method must be (1) a string or boolean representing the sort direction ('ascending' / 'descending', or true / false); (2) a 1-dimensional array of strings and/or booleans; or (3) null."),assert(1===shape(s).length,"The second parameter of the `sort` method must be (1) a string or boolean representing the sort direction ('ascending' / 'descending', or true / false); (2) a 1-dimensional array of strings and/or booleans; or (3) null."),assert(e.length===s.length,"The arrays passed into the `sort` method must be equal in length."),e=e.map(e=>{if(assert(isString(e)||isNumber(e),"Column references can either be column names (as strings) or column indices (as whole numbers)."),isString(e)){const s=n.columns.indexOf(e);return assert(s>-1,`The column "${e}" does not exist!`),s}if(isNumber(e))return assert(parseInt(e)===e,"Column indices must be whole numbers!"),assert(e>=0,`The column index ${e} is out of bounds!`),assert(e<n.columns.length,`The index ${e} is out of bounds!`),e}),s=s.map(e=>{if(assert(isString(e)||isBoolean(e),"Direction references can either be strings ('ascending' or 'descending') or booleans (true or false)."),isString(e)){const s=e.trim().toLowerCase();return assert("ascending"===s||"descending"===s,"Direction references can either be strings ('ascending' or 'descending') or booleans (true or false)."),"ascending"===s}if(isBoolean(e))return e}),n.values=sort(n.values,(n,t)=>{let r=0;for(;n[e[r]]===t[e[r]]&&r<e.length;)r++;const a=s[r];return n[e[r]]===t[e[r]]?0:n[e[r]]<t[e[r]]?a?-1:1:n[e[r]]>t[e[r]]?a?1:-1:void 0}),n.index=flatten(n.get(null,t).values),n=n.dropColumns(t)}sortByIndex(){return this.sort()}filter(e,s){assert(isFunction(e),"The `filter` method takes a single parameter: a function that is used to filter the values."),isUndefined(s)&&(s=0),assert(0===s||1===s,"The `axis` parameter to the `filter` method must be 0 or 1.");let n=this.copy();if(n.isEmpty())return n;const t=copy(n.index),r=copy(n.columns);if(0===s){const s=Math.random().toString();let r=(n=n.assign(s,n.index)).values.filter((s,r)=>{const a=e(s,r,n);return a||t.splice(r,1),a});if(0===flatten(r).length)return new DataFrame;1===shape(r).length&&(r=[r]),n.values=r,n.index=n.get(null,s).values,n=n.drop(null,s)}else if(1===s){n=n.transpose();const s=Math.random().toString();let t=(n=n.assign(s,n.index)).values.filter((s,t)=>{const a=e(s,t,n);return a||r.splice(t,1),a});if(0===flatten(t).length)return new DataFrame;1===shape(t).length&&(t=[t]),n.values=t,n.index=n.get(null,s).values,n=(n=n.drop(null,s)).transpose()}return n}shuffle(e){isUndefined(e)&&(e=0),assert(0===e||1===e,"The `axis` parameter to the `shuffle` must be 0, 1, or undefined.");return this.get(0===e?shuffle(this.index):null,1===e?shuffle(this.columns):null)}}module.exports=DataFrame;

}).call(this)}).call(this,require('_process'))
},{"./apply.js":4,"./assert.js":10,"./copy.js":15,"./flatten.js":28,"./is-array.js":38,"./is-boolean.js":39,"./is-equal.js":40,"./is-function.js":41,"./is-number.js":42,"./is-string.js":43,"./is-undefined.js":44,"./max.js":48,"./min.js":51,"./ndarray.js":53,"./random.js":59,"./range.js":60,"./series.js":66,"./set.js":68,"./shape.js":69,"./sort.js":74,"./transpose.js":79,"_process":87,"fs":85,"path":86}],21:[function(require,module,exports){
const assert=require("./assert.js"),isArray=require("./is-array.js"),flatten=require("./flatten.js");function diff(s,t){assert(isArray(s),"You must pass two arrays into the `diff` function!"),assert(isArray(t),"You must pass two arrays into the `diff` function!");const r=flatten(s),a=flatten(t),e=[];return r.forEach(s=>{a.indexOf(s)<0&&e.push(s)}),e}module.exports=diff;

},{"./assert.js":10,"./flatten.js":28,"./is-array.js":38}],22:[function(require,module,exports){
const pow=require("./pow.js"),sum=require("./sum.js"),add=require("./add.js"),scale=require("./scale.js"),sqrt=require("./sqrt.js"),set=require("./set.js"),flatten=require("./flatten.js");function distance(e,t){try{const r=set(flatten(e.concat(t)).map(e=>typeof e));return r.length>1||"number"!==r[0]?NaN:sqrt(sum(pow(add(e,scale(t,-1)),2)))}catch(e){return NaN}}module.exports=distance;

},{"./add.js":2,"./flatten.js":28,"./pow.js":57,"./scale.js":64,"./set.js":68,"./sqrt.js":75,"./sum.js":77}],23:[function(require,module,exports){
const assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),isNumber=require("./is-number.js"),isEqual=require("./is-equal.js"),flatten=require("./flatten.js"),shape=require("./shape.js"),sum=require("./sum.js"),scale=require("./scale.js"),transpose=require("./transpose.js");function dot(e,s){assert(!isUndefined(e)&&!isUndefined(s),"You must pass two arrays of numbers into the `dot` function!"),assert(isArray(e)&&isArray(s),"You must pass two arrays of numbers into the `dot` function!"),flatten(e).concat(flatten(s)).forEach(e=>{assert(isNumber(e),"One of the arrays you passed into the `dot` function contains non-numerical values!")});const t=shape(e),n=shape(s);if(assert(t.length<=2&&n.length<=2,"I'm not smart enough to know how to get the dot-product of arrays that have more than 2 dimensions. Sorry for the inconvenience! Please only pass 1- or 2-dimensional arrays into the `dot` function!"),assert(t[t.length-1]===n[0],`There's a dimension misalignment in the two arrays you passed into the \`dot\` function. (${t[t.length-1]} !== ${n[0]})`),1===t.length&&1===n.length)return sum(scale(e,s));if(1===t.length&&2===n.length)return transpose(s).map(s=>dot(e,s));if(2===t.length&&1===n.length)return e.map(e=>dot(e,s));if(2===t.length&&2===n.length){const t=transpose(s),n=[];for(let s=0;s<e.length;s++){const r=[];for(let n=0;n<t.length;n++)r.push(dot(e[s],t[n]));n.push(r)}return n}}module.exports=dot;

},{"./assert.js":10,"./flatten.js":28,"./is-array.js":38,"./is-equal.js":40,"./is-number.js":42,"./is-undefined.js":44,"./scale.js":64,"./shape.js":69,"./sum.js":77,"./transpose.js":79}],24:[function(require,module,exports){
const assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),max=require("./max.js"),shape=require("./shape.js");function dropMissingPairwise(s,e){assert(isArray(s)&&isArray(e),"The two items passed into the `dropMissingPairwise` function must be arrays!"),assert(1===shape(s).length&&1===shape(e).length,"The `dropMissingPairwise` function only works on one-dimensional arrays!");const i=[],r=[];for(let n=0;n<max([s.length,e.length]);n++)isUndefined(s[n])||isUndefined(e[n])||(i.push(s[n]),r.push(e[n]));return[i,r]}module.exports=dropMissingPairwise;

},{"./assert.js":10,"./is-array.js":38,"./is-undefined.js":44,"./max.js":48,"./shape.js":69}],25:[function(require,module,exports){
const assert=require("./assert.js"),isArray=require("./is-array.js"),isUndefined=require("./is-undefined.js"),shape=require("./shape.js");function dropMissing(e){return assert(isArray(e),"The value passed into the `dropMissing` function must be a one-dimensional array!"),assert(1===shape(e).length,"The value passed into the `dropMissing` function must be a one-dimensional array!"),e.filter(e=>!isUndefined(e))}module.exports=dropMissing;

},{"./assert.js":10,"./is-array.js":38,"./is-undefined.js":44,"./shape.js":69}],26:[function(require,module,exports){
const assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),isNumber=require("./is-number.js"),max=require("./max.js"),shape=require("./shape.js");function dropNaNPairwise(e,s){assert(isArray(e)&&isArray(s),"The two items passed into the `dropNaNPairwise` function must be arrays!"),assert(1===shape(e).length&&1===shape(s).length,"The `dropNaNPairwise` function only works on one-dimensional arrays!");const r=[],i=[];for(let a=0;a<max([e.length,s.length]);a++)!isUndefined(e[a])&&isNumber(e[a])&&!isUndefined(s[a])&&isNumber(s[a])&&(r.push(e[a]),i.push(s[a]));return[r,i]}module.exports=dropNaNPairwise;

},{"./assert.js":10,"./is-array.js":38,"./is-number.js":42,"./is-undefined.js":44,"./max.js":48,"./shape.js":69}],27:[function(require,module,exports){
const assert=require("./assert.js"),isArray=require("./is-array.js"),isUndefined=require("./is-undefined.js"),isNumber=require("./is-number.js"),shape=require("./shape.js");function dropNaN(e){return assert(isArray(e),"The value passed into the `dropNaN` function must be a one-dimensional array!"),assert(1===shape(e).length,"The value passed into the `dropNaN` function must be a one-dimensional array"),e.filter(e=>!isUndefined(e)&&isNumber(e))}module.exports=dropNaN;

},{"./assert.js":10,"./is-array.js":38,"./is-number.js":42,"./is-undefined.js":44,"./shape.js":69}],28:[function(require,module,exports){
const assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js");function flatten(e){assert(!isUndefined(e),"You must pass one array into the `flatten` function!"),assert(isArray(e),"The `flatten` function only works on arrays!");let r=[];return e.forEach(function(e){isArray(e)?r=r.concat(flatten(e)):r.push(e)}),r}module.exports=flatten;

},{"./assert.js":10,"./is-array.js":38,"./is-undefined.js":44}],29:[function(require,module,exports){
const vectorize=require("./vectorize.js");function float(e){try{const t=JSON.parse(e);return"number"==typeof t?t:NaN}catch(e){return NaN}}module.exports=vectorize(float);

},{"./vectorize.js":82}],30:[function(require,module,exports){
const vectorize=require("./vectorize.js");function floor(r){try{return"number"!=typeof r?NaN:Math.floor(r)}catch(r){return NaN}}module.exports=vectorize(floor);

},{"./vectorize.js":82}],31:[function(require,module,exports){
const assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),isNumber=require("./is-number.js"),shape=require("./shape.js"),int=require("./int.js");function getValueAt(e,s){return assert(!isUndefined(e),"You must pass an array and an index into the `getValueAt` function!"),assert(isArray(e),"You must pass an array and an index into the `getValueAt` function!"),assert(isNumber(s)||isArray(s),"The index passed into the `getValueAt` function must be a positive integer or a one-dimensional array of positive integers!"),isArray(s)&&(assert(1===shape(s).length,"The index passed into the `getValueAt` function must be a positive integer or a one-dimensional array of positive integers!"),s.forEach(e=>{assert(isNumber(e)&&int(e)===e,"The index passed into the `getValueAt` function must be a positive integer or a one-dimensional array of positive integers!")}),assert(s.length<=shape(e).length,"The index passed into the `getValueAt` function has too many dimensions!")),isNumber(s)?(assert(s<e.length,`The index ${s} is out of bounds!`),e[s]):s.length>1?(assert(s[0]<e.length,`The index ${s[0]} is out of bounds!`),getValueAt(e[s[0]],s.slice(1))):getValueAt(e,s[0])}module.exports=getValueAt;

},{"./assert.js":10,"./int.js":35,"./is-array.js":38,"./is-number.js":42,"./is-undefined.js":44,"./shape.js":69}],32:[function(require,module,exports){
const assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isNumber=require("./is-number.js"),zeros=require("./zeros.js");function identity(e){assert(!isUndefined(e),"You must pass an integer greater than 0 (representing the size) into the `identity` function!"),assert(isNumber(e),"You must pass an integer greater than 0 (representing the size) into the `identity` function!"),assert(parseInt(e)===e,"You must pass an integer greater than 0 (representing the size) into the `identity` function!"),assert(e>0,"You must pass an integer greater than 0 (representing the size) into the `identity` function!");const t=zeros([e,e]);for(let n=0;n<e;n++)t[n][n]=1;return t}module.exports=identity;

},{"./assert.js":10,"./is-number.js":42,"./is-undefined.js":44,"./zeros.js":84}],33:[function(require,module,exports){
const assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),shape=require("./shape.js"),isEqual=require("./is-equal.js");function indexOf(e,s,r){if(assert(!isUndefined(e),"You must pass an array and a value into the `indexOf` function!"),assert(isArray(e),"You must pass an array and a value into the `indexOf` function!"),1===shape(e).length||isArray(s)&&isEqual(shape(e[0]),shape(s))){for(let n=0;n<e.length;n++){const a=e[n];if(isEqual(a,s)&&(!r||a===s))return[n]}return null}for(let r=0;r<e.length;r++){const n=indexOf(e[r],s);if(n)return[r].concat(n)}return null}module.exports=indexOf;

},{"./assert.js":10,"./is-array.js":38,"./is-equal.js":40,"./is-undefined.js":44,"./shape.js":69}],34:[function(require,module,exports){
(function (global){(function (){
let out={abs:require("./abs.js"),add:require("./add.js"),append:require("./append.js"),apply:require("./apply.js"),arccos:require("./arccos.js"),arcsin:require("./arcsin.js"),arctan:require("./arctan.js"),argmax:require("./argmax.js"),argmin:require("./argmin.js"),assert:require("./assert.js"),ceil:require("./ceil.js"),chop:require("./chop.js"),clamp:require("./clamp.js"),cohensd:require("./cohens-d.js"),copy:require("./copy.js"),correl:require("./correl.js"),cos:require("./cos.js"),count:require("./count.js"),covariance:require("./covariance.js"),DataFrame:require("./dataframe.js"),diff:require("./diff.js"),distance:require("./distance.js"),dot:require("./dot.js"),dropMissing:require("./drop-missing.js"),dropMissingPairwise:require("./drop-missing-pairwise.js"),dropNaN:require("./drop-nan.js"),dropNaNPairwise:require("./drop-nan-pairwise.js"),flatten:require("./flatten.js"),float:require("./float.js"),floor:require("./floor.js"),getValueAt:require("./get-value-at.js"),identity:require("./identity.js"),indexOf:require("./index-of.js"),int:require("./int.js"),intersect:require("./intersect.js"),inverse:require("./inverse.js"),isArray:require("./is-array.js"),isBoolean:require("./is-boolean.js"),isEqual:require("./is-equal.js"),isFunction:require("./is-function.js"),isNumber:require("./is-number.js"),isString:require("./is-string.js"),isUndefined:require("./is-undefined.js"),lerp:require("./lerp.js"),log:require("./log.js"),map:require("./map.js"),max:require("./max.js"),mean:require("./mean.js"),median:require("./median.js"),min:require("./min.js"),mode:require("./mode.js"),ndarray:require("./ndarray.js"),normal:require("./normal.js"),ones:require("./ones.js"),pause:require("./pause.js"),pow:require("./pow.js"),print:require("./print.js"),random:require("./random.js"),range:require("./range.js"),reshape:require("./reshape.js"),reverse:require("./reverse.js"),round:require("./round.js"),scale:require("./scale.js"),seed:require("./seed.js"),Series:require("./series.js"),set:require("./set.js"),setValueAt:require("./set-value-at.js"),shape:require("./shape.js"),shuffle:require("./shuffle.js"),sign:require("./sign.js"),sin:require("./sin.js"),slice:require("./slice.js"),sort:require("./sort.js"),sqrt:require("./sqrt.js"),std:require("./std.js"),sum:require("./sum.js"),tan:require("./tan.js"),transpose:require("./transpose.js"),union:require("./union.js"),variance:require("./variance.js"),vectorize:require("./vectorize.js"),where:require("./where.js"),zeros:require("./zeros.js"),dump:function(){Object.keys(out).forEach(e=>{global[e]=out[e]})}};"undefined"!=typeof module&&(module.exports=out),"undefined"!=typeof window&&(window.JSMathTools=out);

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./abs.js":1,"./add.js":2,"./append.js":3,"./apply.js":4,"./arccos.js":5,"./arcsin.js":6,"./arctan.js":7,"./argmax.js":8,"./argmin.js":9,"./assert.js":10,"./ceil.js":11,"./chop.js":12,"./clamp.js":13,"./cohens-d.js":14,"./copy.js":15,"./correl.js":16,"./cos.js":17,"./count.js":18,"./covariance.js":19,"./dataframe.js":20,"./diff.js":21,"./distance.js":22,"./dot.js":23,"./drop-missing-pairwise.js":24,"./drop-missing.js":25,"./drop-nan-pairwise.js":26,"./drop-nan.js":27,"./flatten.js":28,"./float.js":29,"./floor.js":30,"./get-value-at.js":31,"./identity.js":32,"./index-of.js":33,"./int.js":35,"./intersect.js":36,"./inverse.js":37,"./is-array.js":38,"./is-boolean.js":39,"./is-equal.js":40,"./is-function.js":41,"./is-number.js":42,"./is-string.js":43,"./is-undefined.js":44,"./lerp.js":45,"./log.js":46,"./map.js":47,"./max.js":48,"./mean.js":49,"./median.js":50,"./min.js":51,"./mode.js":52,"./ndarray.js":53,"./normal.js":54,"./ones.js":55,"./pause.js":56,"./pow.js":57,"./print.js":58,"./random.js":59,"./range.js":60,"./reshape.js":61,"./reverse.js":62,"./round.js":63,"./scale.js":64,"./seed.js":65,"./series.js":66,"./set-value-at.js":67,"./set.js":68,"./shape.js":69,"./shuffle.js":70,"./sign.js":71,"./sin.js":72,"./slice.js":73,"./sort.js":74,"./sqrt.js":75,"./std.js":76,"./sum.js":77,"./tan.js":78,"./transpose.js":79,"./union.js":80,"./variance.js":81,"./vectorize.js":82,"./where.js":83,"./zeros.js":84}],35:[function(require,module,exports){
const vectorize=require("./vectorize.js");function int(e){try{const t=JSON.parse(e);return"number"==typeof t?parseInt(t):NaN}catch(e){return NaN}}module.exports=vectorize(int);

},{"./vectorize.js":82}],36:[function(require,module,exports){
const isArray=require("./is-array.js"),flatten=require("./flatten.js"),union=require("./union.js");function intersect(){const e=Object.values(arguments).map(e=>isArray(e)?flatten(e):[e]),r=[];return union(e).forEach(n=>{for(let r=0;r<e.length;r++)if(e[r].indexOf(n)<0)return;r.push(n)}),r}module.exports=intersect;

},{"./flatten.js":28,"./is-array.js":38,"./union.js":80}],37:[function(require,module,exports){
const assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),isNumber=require("./is-number.js"),flatten=require("./flatten.js"),shape=require("./shape.js"),slice=require("./slice.js"),dot=require("./dot.js"),add=require("./add.js"),scale=require("./scale.js"),append=require("./append.js"),range=require("./range.js");function inverse(e){assert(!isUndefined(e),"You must pass a square 2D array into the `inverse` function!"),assert(isArray(e),"You must pass a square 2D array into the `inverse` function!"),flatten(e).forEach(e=>assert(isNumber(e),"The array passed into the `inverse` function must contain only numbers!"));const s=shape(e);if(assert(2===s.length,"The array passed into the `inverse` function must be exactly two-dimensional and square!"),assert(s[0]===s[1],"The array passed into the `inverse` function must be exactly two-dimensional and square!"),assert(s[0]>=0,"The array passed into the `inverse` function must be exactly two-dimensional and square!"),0===s[0])return e;if(1===s[0])return assert(0!==e[0][0],"This matrix cannot be inverted!"),1/e[0][0];if(2===s[0]){const s=e[0][0],r=e[0][1],a=e[1][0],n=e[1][1],i=s*n-r*a;return assert(0!==i,"This matrix cannot be inverted!"),scale([[n,-r],[-a,s]],1/i)}if(s[0]>1){const r=(e,s)=>isNumber(e)||isNumber(s)?scale(e,s):dot(e,s);for(let a=1;a<s[0]-1;a++)try{const n=slice(e,[range(0,a),range(0,a)]),i=slice(e,[range(0,a),range(a,s[0])]),t=slice(e,[range(a,s[0]),range(0,a)]),u=slice(e,[range(a,s[0]),range(a,s[0])]),o=inverse(n),d=inverse(add(u,r(-1,r(r(t,o),i)))),c=add(o,r(r(r(r(o,i),d),t),o)),l=r(-1,r(r(o,i),d)),p=r(-1,r(r(d,t),o)),f=d;return append(append(c,l,1),append(p,f,1),0)}catch(e){}assert(!1,"This matrix cannot be inverted!")}}module.exports=inverse;

},{"./add.js":2,"./append.js":3,"./assert.js":10,"./dot.js":23,"./flatten.js":28,"./is-array.js":38,"./is-number.js":42,"./is-undefined.js":44,"./range.js":60,"./scale.js":64,"./shape.js":69,"./slice.js":73}],38:[function(require,module,exports){
function isArray(r){return r instanceof Array}module.exports=isArray;

},{}],39:[function(require,module,exports){
function isBoolean(o){return"boolean"==typeof o}module.exports=isBoolean;

},{}],40:[function(require,module,exports){
const isArray=require("./is-array.js");function isEqual(r,n){const e=typeof r;if(e!==typeof n)return!1;if("undefined"===e)return!0;if("boolean"===e)return r===n;if("number"===e)return r===n;if("string"===e)return r===n;if("function"===e)return r===n;if("object"===e){if(null===r||null===n)return null===r&&null===n;{const e=Object.keys(r),t=Object.keys(n);if(e.length!==t.length)return!1;for(let t=0;t<e.length;t++){const u=e[t];if(!n.hasOwnProperty(u))return!1;if(!isEqual(r[u],n[u]))return!1}return!0}}}module.exports=isEqual;

},{"./is-array.js":38}],41:[function(require,module,exports){
function isFunction(n){return"function"==typeof n}module.exports=isFunction;

},{}],42:[function(require,module,exports){
function isNumber(e){return"number"==typeof e&&!isNaN(e)}module.exports=isNumber;

},{}],43:[function(require,module,exports){
function isString(t){return"string"==typeof t}module.exports=isString;

},{}],44:[function(require,module,exports){
function isUndefined(n){return null==n}module.exports=isUndefined;

},{}],45:[function(require,module,exports){
const vectorize=require("./vectorize.js"),isNumber=require("./is-number.js"),lerp=vectorize(function(e,r,i){try{return isNumber(e)&&(isNumber(r)&&isNumber(i))?i*(r-e)+e:NaN}catch(e){return NaN}});module.exports=lerp;

},{"./is-number.js":42,"./vectorize.js":82}],46:[function(require,module,exports){
const isNumber=require("./is-number.js"),isUndefined=require("./is-undefined.js"),vectorize=require("./vectorize.js"),log=vectorize(function(e,r){try{return r=isUndefined(r)?Math.E:r,isNumber(e)&&isNumber(r)?Math.log(e)/Math.log(r):NaN}catch(e){return NaN}});module.exports=log;

},{"./is-number.js":42,"./is-undefined.js":44,"./vectorize.js":82}],47:[function(require,module,exports){
const vectorize=require("./vectorize.js"),isNumber=require("./is-number.js"),map=vectorize(function(e,r,i,u,s){try{return isNumber(e)&&(isNumber(r)&&isNumber(i)&&isNumber(u)&&isNumber(s))?(s-u)*(e-r)/(i-r)+u:NaN}catch(e){return NaN}});module.exports=map;

},{"./is-number.js":42,"./vectorize.js":82}],48:[function(require,module,exports){
const flatten=require("./flatten.js"),isUndefined=require("./is-undefined.js");function max(e){try{const n=flatten(e);let t=-1/0;return n.forEach(e=>{!isUndefined(e)&&e>t&&(t=e)}),t===-1/0?NaN:t}catch(e){return NaN}}module.exports=max;

},{"./flatten.js":28,"./is-undefined.js":44}],49:[function(require,module,exports){
const assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),isNumber=require("./is-number.js"),flatten=require("./flatten.js"),sum=require("./sum.js"),dropNaN=require("./drop-nan.js");function mean(e){try{if(0===e.length)return NaN;const r=flatten(e);let n=0;for(let e=0;e<r.length;e++){const s=r[e];if(!isNumber(s))return NaN;n+=s}return n/r.length}catch(e){return NaN}}module.exports=mean;

},{"./assert.js":10,"./drop-nan.js":27,"./flatten.js":28,"./is-array.js":38,"./is-number.js":42,"./is-undefined.js":44,"./sum.js":77}],50:[function(require,module,exports){
const assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),isNumber=require("./is-number.js"),flatten=require("./flatten.js"),sort=require("./sort.js"),dropNaN=require("./drop-nan.js");function median(e){try{let r,t=flatten(e),n=dropNaN(t);return 0===n.length?NaN:n.length<t.length?NaN:r=(n=sort(n)).length%2==0?(n[n.length/2-1]+n[n.length/2])/2:n[Math.floor(n.length/2)]}catch(e){return NaN}}module.exports=median;

},{"./assert.js":10,"./drop-nan.js":27,"./flatten.js":28,"./is-array.js":38,"./is-number.js":42,"./is-undefined.js":44,"./sort.js":74}],51:[function(require,module,exports){
const flatten=require("./flatten.js"),isUndefined=require("./is-undefined.js");function min(e){try{const n=flatten(e);let t=1/0;return n.forEach(e=>{!isUndefined(e)&&e<t&&(t=e)}),t===1/0?NaN:t}catch(e){return NaN}}module.exports=min;

},{"./flatten.js":28,"./is-undefined.js":44}],52:[function(require,module,exports){
const flatten=require("./flatten.js"),count=require("./count.js"),set=require("./set.js"),sort=require("./sort.js");function mode(t){try{if(0===t.length)return NaN;const e=flatten(t);if(0===e.length)return NaN;const r={},n=set(e);n.forEach(t=>{r[t]=count(e,t)});const o=sort(n,(t,e)=>r[e]-r[t]),s=o[0],u=sort(o.filter(t=>r[t]===r[s]));return 1===u.length?u[0]:u}catch(t){return NaN}}module.exports=mode;

},{"./count.js":18,"./flatten.js":28,"./set.js":68,"./sort.js":74}],53:[function(require,module,exports){
const assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),isNumber=require("./is-number.js"),floor=require("./floor.js"),range=require("./range.js"),error="You must pass an integer or a one-dimensional array of natural numbers into the `ndarray` function!";function ndarray(r){if(assert(!isUndefined(r),error),isArray(r)||(r=[r]),assert(r.length>0,error),r.forEach(function(r){assert(isNumber(r),error),assert(floor(r)===r,error),assert(r>=0,error)}),1===r.length)return range(0,r[0]).map(r=>void 0);{const e=[];for(let s=0;s<r[0];s++)e.push(ndarray(r.slice(1,r.length)));return e}}module.exports=ndarray;

},{"./assert.js":10,"./floor.js":30,"./is-array.js":38,"./is-number.js":42,"./is-undefined.js":44,"./range.js":60}],54:[function(require,module,exports){
const isUndefined=require("./is-undefined.js"),ndarray=require("./ndarray.js"),apply=require("./apply.js"),random=require("./random.js");function normal(r){function n(){const r=random(),n=random();return Math.sqrt(-2*Math.log(r))*Math.cos(2*Math.PI*n)}return isUndefined(r)?n():apply(ndarray(r),n)}module.exports=normal;

},{"./apply.js":4,"./is-undefined.js":44,"./ndarray.js":53,"./random.js":59}],55:[function(require,module,exports){
const ndarray=require("./ndarray.js"),apply=require("./apply.js");function ones(r){return apply(ndarray(r),r=>1)}module.exports=ones;

},{"./apply.js":4,"./ndarray.js":53}],56:[function(require,module,exports){
function pause(e){return new Promise((r,t)=>{try{return setTimeout(r,e)}catch(e){return t(e)}})}module.exports=pause;

},{}],57:[function(require,module,exports){
const vectorize=require("./vectorize.js"),isNumber=require("./is-number.js");function pow(e,r){try{return isNumber(e)&&isNumber(r)?Math.pow(e,r):NaN}catch(e){return NaN}}module.exports=vectorize(pow);

},{"./is-number.js":42,"./vectorize.js":82}],58:[function(require,module,exports){
let isArray=require("./is-array.js"),shape=require("./shape.js"),DataFrame=require("./dataframe.js"),Series=require("./series.js");function print(){Object.keys(arguments).forEach(e=>{let r=arguments[e];if(isArray(r)){let e=shape(r);1===e.length?new Series(r).print():2==e.length?new DataFrame(r).print():console.log(r)}else r instanceof DataFrame||r instanceof Series?r.print():console.log(r)})}module.exports=print;

},{"./dataframe.js":20,"./is-array.js":38,"./series.js":66,"./shape.js":69}],59:[function(require,module,exports){
const ndarray=require("./ndarray.js"),apply=require("./apply.js"),isUndefined=require("./is-undefined.js"),seed=require("./seed.js"),pow=require("./pow.js"),a=1103515245,c=12345,m=pow(2,31);function lcg(){const e=seed(),r=(a*e+c)%m;return seed(r),r/m}function random(e){return isUndefined(e)?lcg():apply(ndarray(e),lcg)}module.exports=random;

},{"./apply.js":4,"./is-undefined.js":44,"./ndarray.js":53,"./pow.js":57,"./seed.js":65}],60:[function(require,module,exports){
const assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isNumber=require("./is-number.js"),reverse=require("./reverse.js");function range(e,s,r=1){assert(!isUndefined(e)&&!isUndefined(s)&&!isUndefined(r),"You must pass two numbers and optionally a step value to the `range` function!"),assert(isNumber(e)&&isNumber(s)&&isNumber(r),"You must pass two numbers and optionally a step value to the `range` function!"),assert(r>0,"The step value must be greater than 0! (NOTE: The step value is a magnitude; it does not indicate direction.)");let t=!1;if(e>s){t=!0;let n=e;e=s+r,s=n+r}let n=[];for(let t=e;t<s;t+=r)n.push(t);return t&&(n=reverse(n)),n}module.exports=range;

},{"./assert.js":10,"./is-number.js":42,"./is-undefined.js":44,"./reverse.js":62}],61:[function(require,module,exports){
const assert=require("./assert.js"),isArray=require("./is-array.js"),isNumber=require("./is-number.js"),shape=require("./shape.js"),flatten=require("./flatten.js"),product=e=>e.reduce((e,r)=>e*r);function reshape(e,r){if(assert(isArray(e),"The first argument passed into the `reshape` function must be an array!"),isNumber(r)&&(r=[r]),assert(isArray(r),"The second argument passed into the `reshape` function must be a whole number or a one-dimensional array of whole numbers!"),assert(1===shape(r).length,"The first argument passed into the `reshape` function must be a whole number or a one-dimensional array of whole numbers!"),r.forEach(e=>{assert(isNumber(e)&&parseInt(e)===e&&e>0,"The first argument passed into the `reshape` function must be a whole number or a one-dimensional array of whole numbers!")}),r.length<=1)return flatten(e);let s=flatten(e);assert(product(r)===s.length,"The new shape doesn't match the number of values available in `x` (the first argument passed into the `reshape` function)!");let a=[],t=parseInt(s.length/r[0]);for(let e=0;e<r[0];e++){let n=s.slice(e*t,(e+1)*t);a.push(reshape(n,r.slice(1)))}return a}module.exports=reshape;

},{"./assert.js":10,"./flatten.js":28,"./is-array.js":38,"./is-number.js":42,"./shape.js":69}],62:[function(require,module,exports){
const assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js");function reverse(e){assert(!isUndefined(e),"You must pass an array into the `reverse` function!"),assert(isArray(e),"You must pass an array into the `reverse` function!");const r=[];for(let s=e.length-1;s>=0;s--)r.push(e[s]);return r}module.exports=reverse;

},{"./assert.js":10,"./is-array.js":38,"./is-undefined.js":44}],63:[function(require,module,exports){
const isNumber=require("./is-number.js"),vectorize=require("./vectorize.js"),round=vectorize(function(r){try{return isNumber(r)?Math.round(r):NaN}catch(r){return NaN}});module.exports=round;

},{"./is-number.js":42,"./vectorize.js":82}],64:[function(require,module,exports){
const vectorize=require("./vectorize.js"),isNumber=require("./is-number.js");function scale(e,r){try{return isNumber(e)&&isNumber(r)?e*r:NaN}catch(e){return NaN}}module.exports=vectorize(scale);

},{"./is-number.js":42,"./vectorize.js":82}],65:[function(require,module,exports){
const assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isNumber=require("./is-number.js");let s=parseInt(999999*Math.random());function seed(e){if(isUndefined(e)||(assert(isNumber(e),"If passing a value into the `seed` function, then that value must be a positive integer!"),assert(parseInt(e)===e,"If passing a value into the `seed` function, then that value must be a positive integer!"),assert(e>=0,"If passing a value into the `seed` function, then that value must be a positive integer!")),isUndefined(e))return s;s=e}module.exports=seed;

},{"./assert.js":10,"./is-number.js":42,"./is-undefined.js":44}],66:[function(require,module,exports){
const assert=require("./assert.js"),isArray=require("./is-array.js"),isUndefined=require("./is-undefined.js"),shape=require("./shape.js"),transpose=require("./transpose.js"),range=require("./range.js"),isNumber=require("./is-number.js"),isString=require("./is-string.js"),apply=require("./apply.js"),isFunction=require("./is-function.js"),ndarray=require("./ndarray.js"),copy=require("./copy.js"),set=require("./set.js"),reverse=require("./reverse.js"),sort=require("./sort.js"),isBoolean=require("./is-boolean.js");function isInteger(e){return isNumber(e)&&parseInt(e)===e}function isWholeNumber(e){return isInteger(e)&&e>=0}function isObject(e){return e instanceof Object&&!isArray(e)&&null!==e}function isDataFrame(e){return e instanceof DataFrame}function isSeries(e){return e instanceof Series}function leftPad(e,n){assert(isNumber(e),"The `leftPad` function only works on numbers!");let s=e.toString();for(;s.length<n;)s="0"+s;return s}class Series{constructor(e){const n=this;if(n.name="data",Object.defineProperty(n,"_values",{value:[],configurable:!0,enumerable:!1,writable:!0}),Object.defineProperty(n,"values",{configurable:!0,enumerable:!0,get:()=>n._values,set(e){assert(isArray(e),"The new values must be a 1-dimensional array!");const s=shape(e);assert(1===s.length,"The new array of values must be 1-dimensional!"),s[0]<n._index.length?n._index=n._index.slice(0,s[0]):s[0]>n._index.length&&(n._index=n._index.concat(range(n._index.length,s[0]).map(n=>"row"+leftPad(n,(e.length-1).toString().length)))),n._values=e}}),Object.defineProperty(n,"_index",{value:[],configurable:!0,enumerable:!1,writable:!0}),Object.defineProperty(n,"index",{configurable:!0,enumerable:!0,get:()=>n._index,set(e){assert(isArray(e),"The new index must be a 1-dimensional array of strings!"),assert(e.length===n.shape[0],"The new index must be the same length as the old index!"),assert(1===shape(e).length,"The new index must be a 1-dimensional array of strings!"),e.forEach(e=>{assert(isString(e),"All of the row names must be strings!")}),n._index=e}}),e){const s=shape(e);assert(1===s.length,"The `data` array passed into the constructor of a DataFrame must be 1-dimensional!"),n.values=e}}get shape(){return shape(this.values)}isEmpty(){return 0===this.values.filter(e=>!isUndefined(e)).length}clear(){const e=this.copy();return e.values=ndarray(e.shape),e.index=this.index,e}get(e){const n=this;(isString(e)||isNumber(e))&&(e=[e]);const s=set((e||[]).map(e=>typeof e));return assert(s.length<=2,"Only whole numbers and/or strings are allowed in `get` arrays!"),1===s.length&&assert("string"===s[0]||"number"===s[0],"Only whole numbers and/or strings are allowed in `get` arrays!"),2===s.length&&(assert(s.indexOf("string")>-1,"Only whole numbers and/or strings are allowed in `get` arrays!"),assert(s.indexOf("number")>-1,"Only whole numbers and/or strings are allowed in `get` arrays!")),isUndefined(e)||(e=e.map(e=>"string"==typeof e?(assert(n.index.indexOf(e)>-1,`Index "${e}" does not exist!`),e):"number"==typeof e?(assert(e>=0,`Index ${e} is out of bounds!`),assert(parseInt(e)===e,"Indices must be integers!"),assert(e<n.index.length,`Index ${e} is out of bounds!`),n.index[e]):void 0)),n.getSubsetByNames(e)}getSubsetByNames(e){const n=this;isUndefined(e)&&(e=n.index),assert(isArray(e),"The `indices` array must be a 1-dimensional array of strings."),assert(1===shape(e).length,"The `indices` array must be a 1-dimensional array of strings."),assert(e.length>0,"The `indices` array must contain at least one index name."),e.forEach(e=>{assert(isString(e),"The `indices` array must contain only strings."),assert(n.index.indexOf(e)>-1,`The name "${e}" does not exist in the index.`)});const s=e.map(e=>n.values[n.index.indexOf(e)]);if(1===s.length)return s[0];const r=new Series(s);return r.index=e,r.name=n.name,r}getSubsetByIndices(e){const n=this,s=n.shape;isUndefined(e)&&(e=range(0,s[0])),assert(isArray(e),"The `indices` array must be 1-dimensional array of whole numbers."),assert(1===shape(e).length,"The `indices` array must be a 1-dimensional array of whole numbers."),assert(e.length>0,"The `indices` array must contain at least one index."),e.forEach(e=>{assert(isWholeNumber(e),"The `indices` array must be a 1-dimensional array of whole numbers."),assert(e<n.index.length,`The row index ${e} is out of bounds.`)});const r=e.map(e=>n.index[e]);return n.getSubsetByNames(r)}loc(e){return this.getSubsetByNames(e)}iloc(e){return this.getSubsetByIndices(e)}reverse(){const e=new Series(reverse(this.values));return e.index=reverse(this.index),e.name=this.name,e}resetIndex(){const e=this.copy();return e.index=range(0,this.shape[0]).map(n=>"row"+leftPad(n,(e.index.length-1).toString().length)),e}copy(){const e=new Series(copy(this.values));return e.index=this.index.slice(),e.name=this.name,e}apply(e){assert(isFunction(e),"The parameter to the `apply` method must be a function.");const n=this.copy();return n.values=n.values.map((s,r)=>e(s,n.index[r])),n}dropMissing(e,n){const s=this.copy(),r=[];return s.values=s.values.filter((e,n)=>!isUndefined(e)&&(r.push(s.index[n]),!0)),s.index=r,s}toObject(){const e=this,n={};return n[e.name]={},e.index.forEach((s,r)=>{n[e.name][s]=e.values[r]}),n}print(){let e=this.copy();const n="undefined"==typeof window?20:10;if(e.index.length>n){e=e.get(range(0,n/2).concat(range(e.index.length-n/2,e.index.length)));const s=copy(e.index);s.splice(parseInt(s.length/2),0,"..."),e.values.push("..."),e.index.push("..."),e=e.get(s)}const s={};return e.values.forEach((n,r)=>{const t={};t[e.name]=n,s[e.index[r]]=t}),console.table(s),this}sort(e){assert(isBoolean(e)||isString(e)||isUndefined(e),"The `sort` method can take an optional parameter that's either a string representing a direction ('ascending' or 'descending') or a boolean representing whether or not the direction is ascending (true or false).");let n=!0;isUndefined(e)&&(n=!0),isString(e)&&(e=e.trim().toLowerCase(),assert("ascending"===e||"descending"===e,"The `sort` method can take an optional parameter that's either a string representing a direction ('ascending' or 'descending') or a boolean representing whether or not the direction is ascending (true or false)."),n="ascending"===e),isBoolean(e)&&(n=e);let s=transpose([this.values,this.index]);s=transpose(sort(s,(e,s)=>e[0]===s[0]?0:e[0]<s[0]?n?-1:1:e[0]>s[0]?n?1:-1:void 0));const r=new Series(s[0]);return r.index=s[1],r.name=this.name,r}sortByIndex(){let e=transpose([this.values,this.index]);e=transpose(sort(e,(e,n)=>e[1]===n[1]?0:e[1]<n[1]?-1:e[1]>n[1]?1:void 0));const n=new Series(e[0]);return n.index=e[1],n.name=this.name,n}filter(e){const n=this;let s=n.copy();const r=copy(s.index),t=[],i=s.values.filter((n,r)=>{const i=e(n,r,s.values);return i||t.push(s.index[r]),i});return t.forEach(e=>{r.splice(r.indexOf(e),1)}),0===i.length?((s=new Series).name=n.name,s):(s.values=i,s.index=r,s)}}module.exports=Series;

},{"./apply.js":4,"./assert.js":10,"./copy.js":15,"./is-array.js":38,"./is-boolean.js":39,"./is-function.js":41,"./is-number.js":42,"./is-string.js":43,"./is-undefined.js":44,"./ndarray.js":53,"./range.js":60,"./reverse.js":62,"./set.js":68,"./shape.js":69,"./sort.js":74,"./transpose.js":79}],67:[function(require,module,exports){
const assert=require("./assert.js"),isNumber=require("./is-number.js"),isArray=require("./is-array.js"),copy=require("./copy.js");function setValueAt(e,r,s){assert(isArray(e),"The first argument passed into the `setValueAt` function must be an array!"),isNumber(r)&&(r=[r]),assert(isArray(r),"The second argument passed into the `setValueAt` function must be an integer or an array of integers!");let t=copy(e),a=t;for(let e=0;e<r.length-1;e++)a=a[r[e]];return a[r[r.length-1]]=s,t}module.exports=setValueAt;

},{"./assert.js":10,"./copy.js":15,"./is-array.js":38,"./is-number.js":42}],68:[function(require,module,exports){
const assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),flatten=require("./flatten.js");function set(s){assert(!isUndefined(s),"You must pass an array into the `set` function!"),assert(isArray(s),"You must pass an array into the `set` function!");const e=[],t={};return flatten(s).forEach(s=>{const n=void 0===s?"undefined":"function"==typeof s?s.toString():JSON.stringify(s);t[n]||e.push(s),t[n]=!0}),e}module.exports=set;

},{"./assert.js":10,"./flatten.js":28,"./is-array.js":38,"./is-undefined.js":44}],69:[function(require,module,exports){
const assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),max=require("./max.js");function shape(e){assert(!isUndefined(e),"You must pass an array into the `shape` function!"),assert(isArray(e),"You must pass an array into the `shape` function!");let s=[e.length];const a=e.map(e=>isArray(e));if(a.indexOf(!0)>-1){assert(a.indexOf(!1)<0,"The array passed into the `shape` function has some children that are not themselves arrays!");const n=e.map(e=>e.length),r=max(n);n.forEach(function(e){assert(e===r,"The array passed into the `shape` function has some children of inconsistent length!")}),s=s.concat(shape(e[0]))}return s}module.exports=shape;

},{"./assert.js":10,"./is-array.js":38,"./is-undefined.js":44,"./max.js":48}],70:[function(require,module,exports){
const assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),floor=require("./floor.js"),random=require("./random.js");function shuffle(r){assert(!isUndefined(r),"You must pass an array into the `shuffle` function!"),assert(isArray(r),"You must pass an array into the `shuffle` function!");const e=r.slice();for(let s=0;s<r.length;s++){const s=floor(random()*r.length),n=floor(random()*r.length),o=e[s];e[s]=e[n],e[n]=o}return e}module.exports=shuffle;

},{"./assert.js":10,"./floor.js":30,"./is-array.js":38,"./is-undefined.js":44,"./random.js":59}],71:[function(require,module,exports){
const isNumber=require("./is-number.js"),vectorize=require("./vectorize.js");function sign(e){try{return isNumber(e)?e<0?-1:e>0?1:0:NaN}catch(e){return NaN}}module.exports=vectorize(sign);

},{"./is-number.js":42,"./vectorize.js":82}],72:[function(require,module,exports){
const isNumber=require("./is-number.js"),vectorize=require("./vectorize.js");function sin(e){try{return isNumber(e)?Math.sin(e):NaN}catch(e){return NaN}}module.exports=vectorize(sin);

},{"./is-number.js":42,"./vectorize.js":82}],73:[function(require,module,exports){
const assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isNumber=require("./is-number.js"),isArray=require("./is-array.js"),range=require("./range.js"),flatten=require("./flatten.js"),shape=require("./shape.js"),floor=require("./floor.js");function slice(e,s){if(assert(!isUndefined(e),"You must pass an array into the `slice` function!"),assert(isArray(e),"You must pass an array into the `slice` function!"),isUndefined(s))return e.slice();assert(isArray(s),"The indices passed into the `slice` function must be a one-dimensional array of integers or null values."),flatten(s).forEach(e=>{assert(isUndefined(e)||isNumber(e)&&floor(e)===e,"The indices passed into the `slice` function must be a one-dimensional array of integers or null values.")});let r=s[0];isUndefined(r)&&(r=range(0,e.length)),isNumber(r)&&(r=[r]);const i=[];return r.forEach(r=>{assert(r<e.length,"Index out of bounds in the `slice` function!"),r<0&&(r+=e.length);const n=e[r];isArray(n)?i.push(slice(e[r],s.slice(1,s.length))):i.push(e[r])}),i}module.exports=slice;

},{"./assert.js":10,"./flatten.js":28,"./floor.js":30,"./is-array.js":38,"./is-number.js":42,"./is-undefined.js":44,"./range.js":60,"./shape.js":69}],74:[function(require,module,exports){
const assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),isFunction=require("./is-function.js");function alphaSort(s,r){return s<r?-1:s>r?1:0}function sort(s,r){isUndefined(r)&&(r=alphaSort),assert(!isUndefined(s),"You must pass an array into the `sort` function!"),assert(isArray(s),"You must pass an array into the `sort` function!"),assert(isFunction(r),"The second parameter of the `sort` function must be a comparison function!");const n=s.slice();return n.sort(r),n}module.exports=sort;

},{"./assert.js":10,"./is-array.js":38,"./is-function.js":41,"./is-undefined.js":44}],75:[function(require,module,exports){
const isNumber=require("./is-number.js"),vectorize=require("./vectorize.js");function sqrt(r){try{return isNumber(r)?r<0?NaN:Math.sqrt(r):NaN}catch(r){return NaN}}module.exports=vectorize(sqrt);

},{"./is-number.js":42,"./vectorize.js":82}],76:[function(require,module,exports){
const isNumber=require("./is-number.js"),flatten=require("./flatten.js"),mean=require("./mean.js"),pow=require("./pow.js"),sqrt=require("./sqrt.js");function std(e){try{if(0===e.length)return NaN;const t=flatten(e);if(0===t.length)return NaN;const r=mean(t);let n=0;for(let e=0;e<t.length;e++){const s=t[e];if(!isNumber(s))return NaN;n+=pow(s-r,2)}return sqrt(n/t.length)}catch(e){return NaN}}module.exports=std;

},{"./flatten.js":28,"./is-number.js":42,"./mean.js":49,"./pow.js":57,"./sqrt.js":75}],77:[function(require,module,exports){
const dropNaN=require("./drop-nan.js"),flatten=require("./flatten.js"),isNumber=require("./is-number.js");function sum(e){try{const r=flatten(e);if(0===r.length)return NaN;let t=0;for(let e=0;e<r.length;e++){const n=r[e];if(!isNumber(n))return NaN;t+=n}return t}catch(e){return NaN}}module.exports=sum;

},{"./drop-nan.js":27,"./flatten.js":28,"./is-number.js":42}],78:[function(require,module,exports){
const isNumber=require("./is-number.js"),vectorize=require("./vectorize.js");function tan(e){try{return isNumber(e)?Math.tan(e):NaN}catch(e){return NaN}}module.exports=vectorize(tan);

},{"./is-number.js":42,"./vectorize.js":82}],79:[function(require,module,exports){
const assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),shape=require("./shape.js"),reverse=require("./reverse.js"),ndarray=require("./ndarray.js");function transpose(e){assert(!isUndefined(e),"You must pass an array into the `transpose` function!"),assert(isArray(e),"You must pass an array into the `transpose` function!");const r=shape(e);if(assert(r.length<=2,"I'm not smart enough to know how to transpose arrays that have more than 2 dimensions. Sorry for the inconvenience! Please only pass 1- or 2-dimensional arrays into the `transpose` function!"),1===r.length)return reverse(e);if(2===r.length){const s=ndarray(reverse(r));for(let n=0;n<r[0];n++)for(let a=0;a<r[1];a++)s[a][n]=e[n][a];return s}}module.exports=transpose;

},{"./assert.js":10,"./is-array.js":38,"./is-undefined.js":44,"./ndarray.js":53,"./reverse.js":62,"./shape.js":69}],80:[function(require,module,exports){
const assert=require("./assert.js"),set=require("./set.js");function union(){return set([...arguments])}module.exports=union;

},{"./assert.js":10,"./set.js":68}],81:[function(require,module,exports){
const pow=require("./pow.js"),std=require("./std.js");function variance(r){try{return pow(std(r),2)}catch(r){return NaN}}module.exports=variance;

},{"./pow.js":57,"./std.js":76}],82:[function(require,module,exports){
const assert=require("./assert.js"),isUndefined=require("./is-undefined.js"),isArray=require("./is-array.js"),max=require("./max.js"),isFunction=require("./is-function.js");function vectorize(e){return assert(!isUndefined(e),"You must pass a function into the `vectorize` function!"),assert(isFunction(e),"You must pass a function into the `vectorize` function!"),function s(){if(Object.keys(arguments).map(e=>isArray(arguments[e])).indexOf(!0)>-1){const e=[],r=Object.keys(arguments).filter(e=>isArray(arguments[e])).map(e=>arguments[e].length),t=max(r);r.forEach(e=>{assert(e===t,"If using arrays for all arguments to this function, then the arrays must all have equal length!")});for(let r=0;r<t;r++){const t=Object.keys(arguments).map(e=>isArray(arguments[e])?arguments[e][r]:arguments[e]);e.push(s(...t))}return e}return e(...arguments)}}module.exports=vectorize;

},{"./assert.js":10,"./is-array.js":38,"./is-function.js":41,"./is-undefined.js":44,"./max.js":48}],83:[function(require,module,exports){
const assert=require("./assert.js"),isArray=require("./is-array.js"),isFunction=require("./is-function.js"),apply=require("./apply.js"),indexOf=require("./index-of.js"),setValueAt=require("./set-value-at.js"),flatten=require("./flatten.js");function where(e,t){assert(isArray(e),"The first argument passed into the `where` function must be an array!"),assert(isFunction(t),"The second argument passed into the `where` function must be a function!");flatten(e).length;let r=apply(e,t);const s={};let n=0,a=!1;for(;!a;){const e=indexOf(r,!0);e?(s[n]=e,r=setValueAt(r,e,null),n++):a=!0}return 0===n?null:s}module.exports=where;

},{"./apply.js":4,"./assert.js":10,"./flatten.js":28,"./index-of.js":33,"./is-array.js":38,"./is-function.js":41,"./set-value-at.js":67}],84:[function(require,module,exports){
const ndarray=require("./ndarray.js"),apply=require("./apply.js");function zeros(r){return apply(ndarray(r),r=>0)}module.exports=zeros;

},{"./apply.js":4,"./ndarray.js":53}],85:[function(require,module,exports){

},{}],86:[function(require,module,exports){
(function (process){(function (){
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;

}).call(this)}).call(this,require('_process'))
},{"_process":87}],87:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[34]);
