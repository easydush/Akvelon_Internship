
### 2. Promise

`let promise = new Promise(function(resolve, reject) {`
  `// executor (the producing code, "singer")`
`});`

When the executor obtains the result, be it soon or late, doesn’t matter, it should call one of these callbacks:

* resolve(value) — if the job finished successfully, with result value.
* reject(error) — if an error occurred, error is the error object.
So to summarize: the executor runs automatically and attempts to perform a job. When it is finished with the attempt it calls resolve if it was successful or reject if there was an error.

The promise object returned by the new Promise constructor has these internal properties:

* state — initially "pending", then changes to either "fulfilled" when resolve is called or "rejected" when reject is called.
* result — initially undefined, then changes to value when resolve(value) called or error when reject(error) is called.

###### then
If we’re interested only in successful completion

`promise.then(`
        `function(result) { /* handle a successful result */ },`
        `function(error) { /* handle an error */ }`
`);`
###### catch
If we’re interested only in errors

The call `.catch(f)` is a complete analog of `.then(null, f)`, it’s just a shorthand.
###### finally

The call `.finally(f)` is similar to `.then(f, f)` in the sense that f always runs when the promise is settled: be it resolve or reject.


###  3. Promises chaining
If a `.then` (or catch/finally, doesn’t matter) handler returns a _promise_, the rest of the chain waits until it settles. When it does, its result (or error) is passed further.

### 4. Error handling with promises
* `.catch handles` errors in promises of all kinds: be it a `reject()` call, or an error thrown in a handler.
* We should place `.catch` exactly in places where we want to handle errors and know how to handle them. The handler should analyze errors (custom error classes help) and rethrow unknown ones (maybe they are programming mistakes).
* It’s ok not to use `.catch` at all, if there’s no way to recover from an error.
* In any case we should have the `unhandledrejection` event handler (for browsers, and analogs for other environments) to track unhandled errors and inform the user (and probably our server) about them, so that our app never “just dies”.

### 5. Promise API
There are 5 static methods of `Promise` class:

* `Promise.all(promises)` – waits for all promises to resolve and returns an array of their results. If any of the given promises rejects, it becomes the error of Promise.all, and all other results are ignored.
* `Promise.allSettled(promises)` (recently added method) – waits for all promises to settle and returns their results as an array of objects with:
  * status: "fulfilled" or "rejected"
  * value (if fulfilled) or reason (if rejected).
* `Promise.race(promises)` – waits for the first promise to settle, and its result/error becomes the outcome.
* `Promise.resolve(value)` – makes a resolved promise with the given value.
* `Promise.reject(error)` – makes a rejected promise with the given error.

### 6. Promisification
function promisify(f) {
  return function (...args) { // return a wrapper-function
    return new Promise((resolve, reject) => {
      function callback(err, result) { // our custom callback for f
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // append our custom callback to the end of f arguments

      f.call(this, ...args); // call the original function
    });
  };
};

// usage:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);

### 7. Microtasks
*PromiseJobs*, more often referred to as the “microtask queue” (ES8 term).

* The queue is first-in-first-out: tasks enqueued first are run first.
* Execution of a task is initiated only when nothing else is running.

### 8. Async/await
The `async` keyword before a function has two effects:

* Makes it always return a promise.
* Allows await to be used in it.

The `await` keyword before a promise makes JavaScript wait until that promise settles, and then:

* If it’s an error, the exception is generated — same as if throw error were called at that very place.
* Otherwise, it returns the result.


With `async/await` we rarely need to write promise.then/catch, but we still shouldn’t forget that they are based on promises, because sometimes (e.g. in the outermost scope) we have to use these methods. Also Promise.all is nice when we are waiting for many tasks simultaneously.

