### 2. Numbers
* regular number can’t exceed 2^53 or be less than -2^53.
###### Rounding
* `Math.floor`
Rounds down: 3.1 becomes 3, and -1.1 becomes -2.
* `Math.ceil`
Rounds up: 3.1 becomes 4, and -1.1 becomes -1.
* `Math.round`
Rounds to the nearest integer: 3.1 becomes 3, 3.6 becomes 4 and -1.1 becomes -1.
* `Math.trunc` 
Removes anything after the decimal point without rounding: 3.1 becomes 3, -1.1 becomes -1.
###### toString(base)
The method `num.toString(base)` returns a string representation of num in the numeral system with the given base.

###### Special values
* `Infinity` (and `-Infinity`) is a special numeric value that is greater (less) than anything.
* `NaN` represents an error.

### 3. String
* The difference between [] and charAt() is that if no character is found, `[]` returns _**undefined**_, and `charAt` returns an _**' '**_.
* We can iterate over characters using `for..of`:
* Strings can’t be changed in JavaScript. It is impossible to change a character.
* `str.codePointAt(pos)` Returns the code for the character at position _pos_.
* `String.fromCodePoint(code)`   Creates a character by its numeric code
* There are 3 types of quotes. Backticks allow a string to span multiple lines and embed expressions `${…}`.
* Strings in JavaScript are encoded using UTF-16.
* We can use special characters like `\n` and insert letters by their unicode using `\u...`.
* To get a character, use: `[]`.
* To get a substring, use: `slice` or `substring`.
* To lowercase/uppercase a string, use: `toLowerCase/toUpperCase`.
* To look for a substring, use: `indexOf`, or `includes/startsWith/endsWith` for simple checks.
* To compare strings according to the language, use: `localeCompare`, otherwise they are compared by character codes.

* `str.trim()` – removes (“trims”) spaces from the beginning and end of the string.
* `str.repeat(n)` – repeats the string n times.

### 4. Arrays
_**Array**_ is a special kind of object, suited to storing and managing ordered data items.

The declaration:

// square brackets (usual)
let arr = [item1, item2...];

// new Array (exceptionally rare)
let arr = new Array(item1, item2...);

* The call to `new Array(number)` creates an array with the given length, but without elements.

* The length property is the array length or, to be precise, its last numeric index plus one. It is auto-adjusted by array methods.

* If we shorten length manually, the array is truncated.

* We can use an array as a _**deque**_ with the following operations:

* `push(...items)` adds items to the end.
* `pop()` removes the element from the end and returns it.
* `shift()` removes the element from the beginning and returns it.
* `unshift(...items)` adds items to the beginning.

To loop over the elements of the array:

* `for (let i=0; i<arr.length; i++)` – works fastest, old-browser-compatible.
* `for (let item of arr)` – the modern syntax for items only,
* `for (let i in arr)` – never use.
### 5. Arrays methods
`push(...items)` – adds items to the end,
`pop()` – extracts an item from the end,
`shift()` – extracts an item from the beginning,
`unshift(...items)` – adds items to the beginning.
`splice(pos, deleteCount, ...items)` – at index pos delete deleteCount elements and insert items.
`slice(start, end)` – creates a new array, copies elements from position start till end (not inclusive) into it.
`concat(...items)` – returns a new array: copies all members of the current one and adds items to it. If any of items is an array, then its elements are taken.


`indexOf/lastIndexOf(item, pos)` – look for item starting from position pos, return the index or -1 if not found.
`includes(value)` – returns true if the array has value, otherwise false.
`find/filter(func)` – filter elements through the function, return first/all values that make it return true.
`findIndex` is like find, but returns the index instead of a value.
`forEach(func)` – calls func for every element, does not return anything.
`map(func)` – creates a new array from results of calling func for every element.
`sort(func)` – sorts the array in-place, then returns it.
`reverse()` – reverses the array in-place, then returns it.
`split/join` – convert a string to array and back.
`reduce(func, initial)` – calculate a single value over the array by calling func for each element and passing an intermediate result between the calls.
`Array.isArray(arr)` checks arr for being an array.
### 6. Iterables
Objects that can be used in `for..of` are called _**iterable**_.
They must implement the method named `Symbol.iterator`.

The result of `obj[Symbol.iterator]` is called an _**iterator**_.
It handles the further iteration process.
An iterator must have the method named `next()` that returns an object {done: Boolean, value: any}, here done:true denotes the end of the iteration process, otherwise the value is the next value.
The `Symbol.iterator` method is called automatically by `for..of`, but we also can do it directly.
Built-in iterables like _strings or arrays_, also implement `Symbol.iterator`.
String iterator knows about surrogate pairs.
Objects that have indexed properties and length are called ***array-like*** Such objects may also have other properties and methods, but lack the built-in methods of arrays.

`Array.from(obj[, mapFn, thisArg])` makes a real Array of an iterable or array-like obj, and we can then use array methods on it. The optional arguments `mapFn` and `thisArg` allow us to apply a function to each item.

### 7. Map and Set
_**Map**_ is a collection of keyed values.

Methods and properties are:

* `new Map()` – creates the map.
* `map.set(key, value)` – stores the value by the key.
* `map.get(key)` – returns the value by the key, undefined if key doesn’t exist in map.
* `map.has(key)` – returns true if the key exists, false otherwise.
* `map.delete(key)` – removes the value by the key.
* `map.clear()` – removes everything from the map.
* `map.size` – returns the current element count.


For looping over a map, there are 3 methods:

* `map.keys()` – returns an iterable for keys,
* `map.values()` – returns an iterable for values,
* `map.entries()` – returns an iterable for entries [key, value], it’s used by default in for..of.
The differences from a regular Object:

*  Any keys, objects can be keys.
*  Additional convenient methods, the size property.


A _**Set**_ is a collection of unique values.


Its main methods are:

* `new Set(iterable)` – creates the set, and if an iterable object is provided (usually an array), copies values from it into the set.
* `set.add(value)` – adds a value, returns the set itself.
* `set.delete(value)` – removes the value, returns true if value existed at the moment of the call, otherwise false.
* `set.has(value)` – returns true if the value exists in the set, otherwise false.
* `set.clear()` – removes everything from the set.
* `set.size` – is the elements count.


### 8. WeakMap and WeakSet

_**WeakMap**_ is Map-like collection that allows only objects as keys and removes them together with associated value once they become inaccessible by other means.

_**WeakSet**_ is Set-like collection that stores only objects and removes them once they become inaccessible by other means.

Both of them do not support methods and properties that refer to all keys or their count. Only individual operations are allowed.
WeakMap and WeakSet are used as “secondary” data structures in addition to the “main” object storage. Once the object is removed from the main storage, if it is only found as the key of WeakMap or in a WeakSet, it will be cleaned up automatically.

### 10. Destructuring assignment
_**Destructuring assignment**_ allows for instantly mapping an object or array onto many variables.

The full object syntax:

`let {prop : varName = default, ...rest} = object`
This means that property prop should go into the variable varName and, if no such property exists, then the default value should be used.

Object properties that have no mapping are copied to the rest object.

The full array syntax:

`let [item1 = default, item2, ...rest] = array`
The first item goes to item1; the second goes into item2, all the rest makes the array rest.

It’s possible to extract data from nested arrays/objects, for that the left side must have the same structure as the right one.

### 11. Date and time

* Date and time in JavaScript are represented with the `Date` object. We can’t create “only date” or “only time”: Date objects always carry both.
* Months are counted from zero (yes, January is a zero month).
* Days of week in `getDay()` are also counted from zero (that’s Sunday).
* Date auto-corrects itself when out-of-range components are set. Good for adding/subtracting days/months/hours.
* Dates can be subtracted, giving their difference in milliseconds. That’s because a Date becomes the timestamp when converted to a number.
* Use `Date.now()` to get the current timestamp fast.

### 12. JSON methods, toJSON

* JSON is a data format that has its own independent standard and libraries for most programming languages.
* JSON supports plain objects, arrays, strings, numbers, booleans, and null.
* JavaScript provides methods JSON.stringify to serialize into JSON and JSON.parse to read from JSON.
* Both methods support transformer functions for smart reading/writing.
* If an object has toJSON, then it is called by JSON.stringify.












