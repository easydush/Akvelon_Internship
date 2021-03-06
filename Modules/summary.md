### 1. Modules
1. A module is a file. To make import/export work, browsers need `<script type="module">`. Modules have several differences:
* Deferred by default.
* Async works on inline scripts.
* To load external scripts from another origin (domain/protocol/port), CORS headers are needed.
* Duplicate external scripts are ignored.
2. Modules have their own, local top-level scope and interchange functionality via import/export.
3. Modules always use strict.
4. Module code is executed only once. Exports are created once and shared between importers.
When we use modules, each module implements the functionality and exports it. Then we use import to directly import it where it’s needed. The browser loads and evaluates the scripts automatically.

### 2. Export, import
_Export:_

* Before declaration of a class/function/…:
  * `export [default] class/function/variable ...`
* Standalone export:
  * `export {x [as y], ...}`
* Re-export:
  * `export {x [as y], ...} from "module"`
  * `export * from "module"` (doesn’t re-export default).
  * `export {default [as y]} from "module"` (re-export default).

_Import:_

* Named exports from module:
  * `import {x [as y], ...} from "module"`
* Default export:
  * `import x from "module"`
  * `import {default as x} from "module"`
* Everything:
  * `import * as obj from "module"`
* Import the module (its code runs), but do not assign it to a variable:
  * `import "module"`
We can put `import/export` statements at the top or at the bottom of a script, that doesn’t matter

### 3. Dynamic import
`let modulePath = prompt("Which module to load?");`

`import(modulePath)`

  `.then(obj => <module object>)`
  
  `.catch(err => <loading error, e.g. if no such module>)`
  
(!) Dynamic imports work in regular scripts, they don’t require script type="module".
(!) Although import() looks like a function call, it’s a special syntax that just happens to use parentheses (similar to super()).
So we can’t copy import to a variable or use call/apply with it. It’s not a function.