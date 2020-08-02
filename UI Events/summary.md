### 1. Mouse events
Mouse events have the following properties:

* Button: `button`.

* Modifier keys (true if pressed): `altKey, ctrlKey, shiftKey and metaKey (Mac)`.

    * If you want to handle `Ctrl`, then don’t forget Mac users, they usually use `Cmd`, so it’s better to check if `(e.metaKey || e.ctrlKey)`.
* Window-relative coordinates: `clientX/clientY`.

* Document-relative coordinates: `pageX/pageY`.

The default browser action of mousedown is text selection, if it’s not good for the interface, then it should be prevented.

### 2. Moving the mouse: mouseover/out, mouseenter/leave

For `mouseover`:

1. `event.target` – is the element where the mouse came over.
2. `event.relatedTarget` – is the element from which the mouse came (relatedTarget → target).

For `mouseout` the reverse:

1. `event.target` – is the element that the mouse left.
2. `event.relatedTarget` – is the new under-the-pointer element, that mouse left for (target → relatedTarget).

Events `mouseenter/mouseleave` are like mouseover/mouseout. They trigger when the mouse pointer enters/leaves the element.

But there are two important differences:

1. Transitions inside the element, to/from descendants, are not counted.
2. Events `mouseenter/mouseleave` do not bubble.

### 3. Drag

The key components:

Events flow: ball.mousedown → document.mousemove → ball.mouseup (don’t forget to cancel native ondragstart).
At the drag start – remember the initial shift of the pointer relative to the element: shiftX/shiftY and keep it during the dragging.
Detect droppable elements under the pointer using document.elementFromPoint.
We can lay a lot on this foundation.

On mouseup we can intellectually finalize the drop: change data, move elements around.
We can highlight the elements we’re flying over.
We can limit dragging by a certain area or direction.
We can use event delegation for mousedown/up. A large-area event handler that checks event.target can manage Drag’n’Drop for hundreds of elements.
And so on.
There are frameworks that build architecture over it: DragZone, Droppable, Draggable and other classes. Most of them do the similar stuff to what’s described above, so it should be easy to understand them now. Or roll your own, as you can see that that’s easy enough to do, sometimes easier than adapting a third-part solution.

### 4. Pointer events
Pointer events allow to handle mouse, touch and pen events simultaneously.

Pointer events extend mouse events. We can replace mouse with pointer in event names and expect our code to continue working for mouse, with better support for other device types.

Remember to set touch-events: none in CSS for elements that we engage, otherwise the browser hijacks many types of touch interactions and pointer events won’t be generated.

Additional abilities of Pointer events are:

* Multi-touch support using pointerId and isPrimary.
* Device-specific properties, such as pressure, width/height and others.
* Pointer capturing: we can retarget all pointer events to a specific element until pointerup/pointercancel.

### 5. Keyboard: keydown and keyup

ressing a key always generates a keyboard event, be it symbol keys or special keys like Shift or Ctrl and so on. The only exception is Fn key that sometimes presents on a laptop keyboard. There’s no keyboard event for it, because it’s often implemented on lower level than OS.

Keyboard events:

* keydown – on pressing the key (auto-repeats if the key is pressed for long),
* keyup – on releasing the key.

Main keyboard event properties:

* code – the “key code” ("KeyA", "ArrowLeft" and so on), specific to the physical location of the key on keyboard.
* key – the character ("A", "a" and so on), for non-character keys, such as Esc, usually has the same value as code.

### 6. Scrolling

