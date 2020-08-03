### 1. Page: DOMContentLoaded, load, beforeunload, unload
Page load events:

* The DOMContentLoaded event triggers on document when the DOM is ready. We can apply JavaScript to elements at this stage.
    * Script such as <script>...</script> or <script src="..."></script> block DOMContentLoaded, the browser waits for them to execute.
    * Images and other resources may also still continue loading.
* The load event on window triggers when the page and all resources are loaded. We rarely use it, because there’s usually no need to wait for so long.
* The beforeunload event on window triggers when the user wants to leave the page. If we cancel the event, browser asks whether the user really wants to leave (e.g we have unsaved changes).
* The unload event on window triggers when the user is finally leaving, in the handler we can only do simple things that do not involve delays or asking a user. Because of that limitation, it’s rarely used. We can send out a network request with navigator.sendBeacon.
* document.readyState is the current state of the document, changes can be tracked in the readystatechange event:
    * loading – the document is loading.
    * interactive – the document is parsed, happens at about the same time as DOMContentLoaded, but before it.
    * complete – the document and resources are loaded, happens at about the same time as window.onload, but before it.
    
### 2. Scripts: async, defer
###### async:	
1. Load-first order. Their document order doesn’t matter – which loads first	
2. Irrelevant. May load and execute while the document has not yet been fully downloaded. That happens if scripts are small or cached, and the document is long enough.

###### defer:
1. Document order (as they go in the document).	
2. Execute after the document is loaded and parsed (they wait if needed), right before DOMContentLoaded.

Both async and defer have one common thing: downloading of such scripts doesn’t block page rendering. So the user can read page content and get acquainted with the page immediately.
In practice, defer is used for scripts that need the whole DOM and/or their relative execution order is important. And async is used for independent scripts, like counters or ads. And their relative execution order does not matter.

### 3. Resource loading: onload and onerror
Images `<img>`, external styles, scripts and other resources provide `load` and `error` events to track their loading:

1. `load` triggers on a successful load,
2. `error` triggers on a failed load.

The only exception is <iframe>: for historical reasons it always triggers load, for any load completion, even if the page is not found.

The readystatechange event also works for resources, but is rarely used, because load/error events are simpler.