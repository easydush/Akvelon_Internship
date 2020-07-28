
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