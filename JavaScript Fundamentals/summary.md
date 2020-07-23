# JavaScript Fundamentals

### 4. Variables 
* In most cases, a newline implies a semicolon. But “in most cases” does not mean “always”!
* *__The `var` keyword is almost the same as `let`. It also declares a variable, but in a slightly different, “old-school” way.__*
* A repeated declaration of the same variable is an error:
  let message = "This";
* When the name contains multiple words, camelCase is commonly used. 
* '$' and '_' are regular symbols, just like letters, without any special meaning.
* Variables named apple and AppLE are two different variables.
* There is a list of reserved words, which cannot be used as variable names because they are used by the language itself.
* Variables declared using `const` are called “constants”. They cannot be reassigned. An attempt to do so would cause an error. Constants are named using capital letters and underscores.


### 5. Data types
###### There are 8 basic data types in JavaScript.

* `number` 
for numbers of any kind: integer or floating-point, integers are limited by ±253.
* `bigint` is for integer numbers of arbitrary length.
* `string` for strings. A string may have zero or more characters, there’s no separate single-character type.
* `boolean` for true/false.
* `null` for unknown values – a standalone type that has a single value null.
* `undefined` for unassigned values – a standalone type that has a single value undefined.
* `object` for more complex data structures.
* `symbol` for unique identifiers.
The typeof operator allows us to see which type is stored in a variable.

Two forms: `typeof x` or `typeof(x).`
* Returns a string with the name of the type, like "string".
* For null returns "object" – this is an error in the language, it’s not actually an object.

### 6. Interaction: alert, prompt, confirm
We covered 3 browser-specific functions to interact with visitors:

* `alert`
shows a message.
* `prompt`
shows a message asking the user to input text. It returns the text or, if Cancel button or Esc is clicked, null.
* `confirm`
shows a message and waits for the user to press “OK” or “Cancel”. It returns true for OK and false for Cancel/Esc.
### 7. Type Conversions
The three most widely used type conversions are to string, to number, and to boolean.

_**String Conversion**_ – Occurs when we output something. Can be performed with `String(value)`. The conversion to string is usually obvious for primitive values.

_**Numeric Conversion**_ – Occurs in math operations. Can be performed with `Number(value)`.

_**Boolean Conversion**_ – Occurs in logical operations. Can be performed with `Boolean(value)`.
The notable exceptions where people usually make mistakes are:

* `undefined` is NaN as a number, not 0.
* `"0"` and space-only strings like `" "` are true as a boolean.
### 8. Basic operators, maths
The following operations are supported:

* Addition +,
* Subtraction -,
* Multiplication *,
* Division /,
* Remainder %,
* Exponentiation **,
* Short “modify-and-assign” operators exist for all arithmetical and bitwise operators: /=, -=, etc,
* Increment ++,
* Decrement --,
* AND ( & ),
* OR ( | ),
* XOR ( ^ ),
* NOT ( ~ ),
* LEFT SHIFT ( << ),
* RIGHT SHIFT ( >> ),
* ZERO-FILL RIGHT SHIFT ( >>> ),
* Comma ',' .

(!) _The binary + is the only operator that supports strings in such a way. Other arithmetic operators work only with numbers and always convert their operands to numbers._

(!) _The call x = value writes the value into x and then returns it._
(!) _Chained assignments evaluate from right to left._


### 9. Comparisons
In JavaScript they are written like this:

* **_Greater/less than:_** a > b, a < b.
* _**Greater/less than or equals:**_ a >= b, a <= b.
* **_Equals:_** a == b, please note the double equality sign == means the equality test, while a single one a = b means an assignment.
* **_Not equals._** In maths the notation is ≠, but in JavaScript it’s written as a != b.

_**A strict equality operator === checks the equality without type conversion.**_

(!) _When comparing values of different types, JavaScript converts the values to numbers._

* Comparison operators return a boolean value.
* Strings are compared letter-by-letter in the “dictionary” order.
* When values of different types are compared, they get converted to numbers (with the exclusion of a strict equality check).
* The values null and undefined equal == each other and do not equal any other value.
* Be careful when using comparisons like > or < with variables that can occasionally be null/undefined. Checking for null/undefined separately is a good idea.

### 10. Conditional branching: if, '?'
* A number 0, an empty string "", null, undefined, and NaN all become false. Because of that they are called “falsy” values.
* Other values become true, so they are called “truthy”.


### 11. Nullish coalescing operator '??'
`coalescing` - uniting, merging

The important difference is that:
* || returns the first truthy value.
* ?? returns the first defined value.
* _Due to safety reasons, it’s forbidden to use ?? together with && and || operators._

### 12. Loops
There are 3 types of loops:

* `while` – The condition is checked before each iteration.
* `do..while` – The condition is checked after each iteration.
* `for (;;)` – The condition is checked before each iteration, additional settings available.
* To make an “infinite” loop, usually the `while(true)` construct is used. Such a loop, just like any other, can be stopped with the `break` directive.

* If we don’t want to do anything in the current iteration and would like to forward to the next one, we can use the `continue` directive.

* `break/continue` support labels before the loop. A label is the only way for break/continue to escape a nested loop to go to an outer one.

### 13. The 'switch' statement
* If there is no break then the execution continues with the next case without any checks.
* Checking is always strict! ===

### 14. Functions
* A function with an empty return or without it returns undefined

The syntax that we used before is called a **_Function Declaration_**:

`function sayHi() {
  alert( "Hello" );
}`
There is another syntax for creating a function that is called a _**Function Expression**_.

It looks like this:

`let sayHi = function() {
  alert( "Hello" );
};`

* If the function is declared as a separate statement in the main code flow, that’s called a “Function Declaration”.
* If the function is created as a part of an expression, it’s called a “Function Expression”.
* A Function Expression is created when the execution reaches it and is usable only from that moment.
* A Function Declaration can be called earlier than it is defined.
* In strict mode, when a Function Declaration is within a code block, it’s visible everywhere inside that block. But not outside of it.
* Functions are values. They can be assigned, copied or declared in any place of the code.

### 15. Arrow functions

Arrow functions are handy for one-liners. They come in two flavors:

* Without curly braces: `(...args) => expression` – the right side is an expression: the function evaluates it and returns the result.
* With curly braces: `(...args) => { body }` – brackets allow us to write multiple statements inside the function, but we need an explicit return to return something.
