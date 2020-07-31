### 1. Intro
Here’s a list of the most useful DOM events, just to take a look at:

* Mouse events:

    * click – when the mouse clicks on an element (touchscreen devices generate it on a tap).
    * contextmenu – when the mouse right-clicks on an element.
    * mouseover / mouseout – when the mouse cursor comes over / leaves an element.
    * mousedown / mouseup – when the mouse button is pressed / released over an element.
    * mousemove – when the mouse is moved.

* Keyboard events:

    * keydown and keyup – when a keyboard key is pressed and released.
    
* Form element events:
    
    * submit – when the visitor submits a <form>.
    * focus – when the visitor focuses on an element, e.g. on an <input>.

* Document events:
    
    * DOMContentLoaded – when the HTML is loaded and processed, DOM is fully built.

* CSS events:

   * transitionend – when a CSS-animation finishes.
   * There are many other events. We’ll get into more details of particular events in next chapters.
   
   
There are 3 ways to assign event handlers:

1. HTML attribute: onclick="...".
2. DOM property: elem.onclick = function.
3. Methods: elem.addEventListener(event, handler[, phase]) to add, removeEventListener to remove.

### 2. Bubbling and capturing

<dfn> Bubbling </dfn> - when an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors.

(!) `focus` event does not bubble.

The most deeply nested element that caused the event is called a _target_ element, accessible as `event.target`.

To stop the bubbling and prevent handlers on the current element from running, there’s a method `event.stopImmediatePropagation()`. After it no other handlers execute.

The standard DOM Events describes 3 phases of event propagation:

1. Capturing phase – the event goes down to the element.
2. Target phase – the event reached the target element.
3. Bubbling phase – the event bubbles up from the element.

### 3. Event delegation

In the handler we get `event.target`, see where the event actually happened and handle it.

###### The “behavior” pattern
We can also use event delegation to add “behaviors” to elements declaratively, with special attributes and classes.

The pattern has two parts:

1. We add a custom attribute to an element that describes its behavior.
2. A document-wide handler tracks events, and if an event happens on an attributed element – performs the action.


### 4. Browser default actions

There are many default browser actions:

* mousedown – starts the selection (move the mouse to select).
* click on <input type="checkbox"> – checks/unchecks the input.
* submit – clicking an <input type="submit"> or hitting Enter inside a form field causes this event to happen, and the browser submits the form after it.
* keydown – pressing a key may lead to adding a character into a field, or other actions.
* contextmenu – the event happens on a right-click, the action is to show the browser context menu.
* …there are more…

All the default actions can be prevented if we want to handle the event exclusively by JavaScript.

To prevent a default action – use either event.preventDefault() or return false. The second method works only for handlers assigned with on<event>.

The passive: true option of addEventListener tells the browser that the action is not going to be prevented. That’s useful for some mobile events, like touchstart and touchmove, to tell the browser that it should not wait for all handlers to finish before scrolling.

If the default action was prevented, the value of event.defaultPrevented becomes true, otherwise it’s false.

###### 5. Dispatching custom events
To generate an event from code, we first need to create an event object.

The generic `Event(name, options)` constructor accepts an arbitrary event name and the options object with two properties:

* bubbles: true if the event should bubble.
* cancelable: true if the event.preventDefault() should work.
* Other constructors of native events like MouseEvent, KeyboardEvent and so on accept properties specific to that event type. For instance, clientX for mouse events.

For custom events we should use CustomEvent constructor. It has an additional option named detail, we should assign the event-specific data to it. Then all handlers can access it as event.detail.

Despite the technical possibility to generate browser events like click or keydown, we should use with the great care.

We shouldn’t generate browser events as it’s a hacky way to run handlers. That’s a bad architecture most of the time.

Native events might be generated:

* As a dirty hack to make 3rd-party libraries work the needed way, if they don’t provide other means of interaction.
* For automated testing, to “click the button” in the script and see if the interface reacts correctly.

Custom events with our own names are often generated for architectural purposes, to signal what happens inside our menus, sliders, carousels etc.