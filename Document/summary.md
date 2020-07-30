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

### 5. Node properties: type, tag and contents

###### DOM node classes
The classes are:

* `EventTarget` – is the root “abstract” class. Objects of that class are never created. It serves as a base, so that all DOM nodes support so-called “events”, we’ll study them later.
* `Node` – is also an “abstract” class, serving as a base for DOM nodes. It provides the core tree functionality: parentNode, nextSibling, childNodes and so on (they are getters). Objects of Node class are never created. But there are concrete node classes that inherit from it, namely: Text for text nodes, Element for element nodes and more exotic ones like Comment for comment nodes.
* `Element` – is a base class for DOM elements. It provides element-level navigation like nextElementSibling, children and searching methods like getElementsByTagName, querySelector. A browser supports not only HTML, but also XML and SVG. The Element class serves as a base for more specific classes: SVGElement, XMLElement and HTMLElement.
* `HTMLElement` – is finally the basic class for all HTML elements. It is inherited by concrete HTML elements:
* `HTMLInputElement` – the class for <input> elements,
* `HTMLBodyElement` – the class for <body> elements,
* `HTMLAnchorElement` – the class for <a> elements,
* …and so on, each tag has its own class that may provide specific properties and methods.

`console.dir(elem)` versus `console.log(elem)`:

* `console.log(elem)` shows the element DOM tree.
* `console.dir(elem)` shows the element as a DOM object, good to explore its properties.

(!) If `innerHTML` inserts a <script> tag into the document – it becomes a part of HTML, but doesn’t execute.

### 6. Attributes and properties

* **Attributes** – is what’s written in HTML.
* **Properties** – is what’s in DOM objects.

Methods to work with attributes are:

* `elem.hasAttribute(name)` – to check for existence.
* `elem.getAttribute(name)` – to get the value.
* `elem.setAttribute(name, value)` – to set the value.
* `elem.removeAttribute(name)` – to remove the attribute.
* `elem.attributes` is a collection of all attributes.

For most situations using DOM properties is preferable. We should refer to attributes only when DOM properties do not suit us, when we need exactly attributes, for instance:

* We need a non-standard attribute. But if it starts with data-, then we should use dataset.
* We want to read the value “as written” in HTML. The value of the DOM property may be different, for instance the href property is always a full URL, and we may want to get the “original” value.

*** 7. Modifying the document
Methods to create new nodes:

* document.createElement(tag) – creates an element with the given tag,
* document.createTextNode(value) – creates a text node (rarely used),
* elem.cloneNode(deep) – clones the element, if deep==true then with all descendants.

Insertion and removal:

* node.append(...nodes or strings) – insert into node, at the end,
* node.prepend(...nodes or strings) – insert into node, at the beginning,
* node.before(...nodes or strings) –- insert right before node,
* node.after(...nodes or strings) –- insert right after node,
* node.replaceWith(...nodes or strings) –- replace node.
* node.remove() –- remove the node.

Text strings are inserted “as text”.

There are also “old school” methods:

* parent.appendChild(node)
* parent.insertBefore(node, nextSibling)
* parent.removeChild(node)
* parent.replaceChild(newElem, node)

(!) All these methods return node.

Given some HTML in html, elem.insertAdjacentHTML(where, html) inserts it depending on the value of where:

* "beforebegin" – insert html right before elem,
* "afterbegin" – insert html into elem, at the beginning,
* "beforeend" – insert html into elem, at the end,
* "afterend" – insert html right after elem.
Also there are similar methods, elem.insertAdjacentText and elem.insertAdjacentElement, that insert text strings and elements, but they are rarely used.

To append HTML to the page before it has finished loading:

* document.write(html)
After the page is loaded such a call erases the document. Mostly seen in old scripts.

*** 8. Styles and classes
To manage classes, there are two DOM properties:

* `className` – the string value, good to manage the whole set of classes.
* `classList` – the object with methods add/remove/toggle/contains, good for individual classes.

To change the styles:

* The style property is an object with camelCased styles. Reading and writing to it has the same meaning as modifying individual properties in the "style" attribute. To see how to apply important and other rare stuff – there’s a list of methods at MDN.


* The `style.cssText` property corresponds to the whole "style" attribute, the full string of styles.

To read the resolved styles (with respect to all classes, after all CSS is applied and final values are calculated):

* The `getComputedStyle(elem, [pseudo])` returns the style-like object with them. Read-only.

*** 9. Window sizes and scrolling
###### Geometry:

Width/height of the visible part of the document (content area width/height): document.documentElement.clientWidth/Height

Width/height of the whole document, with the scrolled out part:

let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);
###### Scrolling:

Read the current scroll: window.pageYOffset/pageXOffset.

Change the current scroll:

* window.scrollTo(pageX,pageY) – absolute coordinates,
* window.scrollBy(x,y) – scroll relative the current place,
* elem.scrollIntoView(top) – scroll to make elem visible (align with the top/bottom of the window).

*** 10. Element size and scrolling

Elements have the following geometry properties:

* offsetParent – is the nearest positioned ancestor or td, th, table, body.
* offsetLeft/offsetTop – coordinates relative to the upper-left edge of offsetParent.
* offsetWidth/offsetHeight – “outer” width/height of an element including borders.
* clientLeft/clientTop – the distances from the upper-left outer corner to the upper-left inner (content + padding) corner. For left-to-right OS they are always the widths of left/top borders. For right-to-left OS the vertical scrollbar is on the left so clientLeft includes its width too.
* clientWidth/clientHeight – the width/height of the content including paddings, but without the scrollbar.
* scrollWidth/scrollHeight – the width/height of the content, just like clientWidth/clientHeight, but also include scrolled-out, invisible part of the element.
* scrollLeft/scrollTop – width/height of the scrolled out upper part of the element, starting from its upper-left corner.

All properties are read-only except scrollLeft/scrollTop that make the browser scroll the element if changed.

*** 11. Coordinates

Any point on the page has coordinates:

* Relative to the window – elem.getBoundingClientRect().
* Relative to the document – elem.getBoundingClientRect() plus the current page scroll.

Window coordinates are great to use with position:fixed, and document coordinates do well with position:absolute.

Both coordinate systems have their pros and cons; there are times we need one or the other one, just like CSS position absolute and fixed.
