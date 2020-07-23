### 1. Objects
* Objects are associative arrays with several special features.
  
*  They store properties (key-value pairs), where:
  
*  Property keys must be strings or symbols (usually strings). 
*  Values can be of any type.
 
  To access a property, we can use:
  
*  The dot notation: obj.property.
*  Square brackets notation obj["property"]. Square brackets allow to take the key from a variable, like obj[varWithKey].
  
 Additional operators:

*  To delete a property: delete obj.prop.
*  To check if a property with the given key exists: "key" in obj.
*  To iterate over an object: for (let key in obj) loop.

### 2. Object copying, references
* Objects are assigned and copied by reference. In other words, a variable stores not the “object value”, but a “reference” (address in memory) for the value. So copying such a variable or passing it as a function argument copies that reference, not the object.

* All operations via copied references (like adding/removing properties) are performed on the same single object.

* To make a “real copy” (a clone) we can use Object.assign for the so-called “shallow copy” (nested objects are copied by reference) or a “deep cloning” function, such as `_.cloneDeep(obj)` from the JavaScript library lodash.

### 3. Garbage collection
* Garbage collection is performed automatically. We cannot force or prevent it.
* Objects are retained in memory while they are reachable.
* Being referenced is not the same as being reachable (from a root): a pack of interlinked objects can become unreachable as a whole.

### 4. Object methods, "this"
* Functions that are stored in object properties are called “methods”.
* Methods allow objects to “act” like `object.doSomething()`.
* Methods can reference the object as `this`.
* The value of `this` is defined at run-time.

* When a function is declared, it may use `this`, but that this has no value until the function is called.
* A function can be copied between objects.
* When a function is called in the “method” syntax: `object.method()`, the value of `this` during the call is object.

### 6. Optional chaining '?.'
The ?. syntax has three forms:

* `obj?.prop` – returns obj.prop if obj exists, otherwise undefined.
* `obj?.[prop]` – returns obj[prop] if obj exists, otherwise undefined.
* `obj?.method()` – calls obj.method() if obj exists, otherwise returns undefined.

A chain of ?. allows to safely access nested properties.

Still, we should apply ?. carefully, only where it’s ok that the left part doesn’t to exist.

### 7. Symbols

* Symbol is a primitive type for unique identifiers.
* Symbols are created with `Symbol()` call with an optional `description (name)`.
* Symbols are always different values, even if they have the same name. If we want same-named symbols to be equal, then we should use the global registry: Symbol.for(key) returns (creates if needed) a global symbol with key as the name. Multiple calls of Symbol.for with the same key return exactly the same symbol.

Symbols have two main use cases:
1. “Hidden” object properties. If we want to add a property into an object that “belongs” to another script or a library, we can create a symbol and use it as a property key. A symbolic property does not appear in for..in, so it won’t be accidentally processed together with other properties. Also it won’t be accessed directly, because another script does not have our symbol. So the property will be protected from accidental use or overwrite.
So we can “covertly” hide something into objects that we need, but others should not see, using symbolic properties.

2. There are many system symbols used by JavaScript which are accessible as `Symbol.*`. We can use them to alter some built-in behaviors. 

### 8. Object to primitive conversion

The object-to-primitive conversion is called automatically by many built-in functions and operators that expect a primitive as a value.

There are 3 types (hints) of it:

1. `"string"` (for `alert` and other operations that need a string)
2. `"number"` (for maths)
3. `"default" `(few operators)
The specification describes explicitly which operator uses which hint. There are very few operators that “don’t know what to expect” and use the `"default"` hint. Usually for built-in objects `"default"` hint is handled the same way as `"number"`, so in practice the last two are often merged together.

The conversion algorithm is:

1. Call `obj[Symbol.toPrimitive](hint)` if the method exists,
2. Otherwise if hint is "string"
* try `obj.toString()` and `obj.valueOf()`, whatever exists.
3. Otherwise if hint is "number" or "default"
* try `obj.valueOf()` and `obj.toString()`, whatever exists.