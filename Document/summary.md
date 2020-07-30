### 1. Browser environment, specs
* `DOM specification`
Describes the document structure, manipulations and events, see https://dom.spec.whatwg.org.
* `CSSOM specification`
Describes stylesheets and style rules, manipulations with them and their binding to documents.
* `HTML specification`
Describes the HTML language (e.g. tags) and also the BOM (browser object model) – various browser functions: setTimeout, alert, location and so on. It takes the DOM specification and extends it with many additional properties and methods.

### 2. DOM tree
An HTML/XML document is represented inside the browser as the DOM tree.

* Tags become element nodes and form the structure.
* Text becomes text nodes.
* …etc, everything in HTML has its place in DOM, even comments.

### 3. Walking the DOM
There are two main sets of them:

* For all nodes: parentNode, childNodes, firstChild, lastChild, previousSibling, nextSibling.
* For element nodes only: parentElement, children, firstElementChild, lastElementChild, previousElementSibling, nextElementSibling.

### 4. Searching
There are 6 main methods to search for nodes in DOM:
![alt text](https://github.com/easydush/Akvelon_Internship/Document/selectors.png)


Besides that:

There is `elem.matches(css)` to check if elem matches the given CSS selector.
There is `elem.closest(css)` to look for the nearest ancestor that matches the given CSS-selector. The elem itself is also checked.
And let’s mention one more method here to check for the child-parent relationship, as it’s sometimes useful:

`elemA.contains(elemB)` returns true if elemB is inside elemA (a descendant of elemA) or when `elemA==elemB`.