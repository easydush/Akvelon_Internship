### 1. Fetch
A typical fetch request consists of two await calls:

let response = await fetch(url, options); // resolves with response headers

let result = await response.json(); // read body as json

Or, without await:

fetch(url, options)
  
  .then(response => response.json())
  
  .then(result => /* process result */)

Response properties:

* response.status – HTTP code of the response,
* response.ok – true is the status is 200-299.
* response.headers – Map-like object with HTTP headers.

Methods to get response body:

* response.text() – return the response as text,
* response.json() – parse the response as JSON object,
* response.formData() – return the response as FormData object (form/multipart encoding, see the next chapter),
* response.blob() – return the response as Blob (binary data with type),
* response.arrayBuffer() – return the response as ArrayBuffer (low-level binary data),

Fetch options so far:

* method – HTTP-method,
* headers – an object with request headers (not any header is allowed),
* body – the data to send (request body) as string, FormData, BufferSource, Blob or UrlSearchParams object.

### 2. FormData

FormData objects are used to capture HTML form and submit it using fetch or another network method.

We can either create new FormData(form) from an HTML form, or create a object without a form at all, and then append fields with methods:

* formData.append(name, value)
* formData.append(name, blob, fileName)
* formData.set(name, value)
* formData.set(name, blob, fileName)

Let’s note two peculiarities here:

* The set method removes fields with the same name, append doesn’t. That’s the only difference between them.
* To send a file, 3-argument syntax is needed, the last argument is a file name, that normally is taken from user filesystem for <input type="file">.

Other methods are:

* formData.delete(name)
* formData.get(name)
* formData.has(name)

### 3. Fetch: Download progress

The fetch method allows to track download progress.

To track download progress, we can use response.body property. It’s ReadableStream – a special object that provides body chunk-by-chunk, as it comes.

The result of await reader.read() call is an object with two properties:

* done – true when the reading is complete, otherwise false.
* value – a typed array of bytes: Uint8Array.

### 4. Fetch: Abort
AbortController, that can be used to abort not only fetch, but other asynchronous tasks as well.

The usage is pretty simple:

###### Step 1: create a controller:

`let controller = new AbortController();`

A controller is an extremely simple object.

It has a single method `abort()`, and a single property signal.

When abort() is called:
1. abort event triggers on controller.signal
2. controller.signal.aborted property becomes true.


###### Step 2: pass the signal property to fetch option.

###### Step 3: to abort, call controller.abort().

### 5. Fetch: Cross-Origin Requests
Simple requests must satisfy the following conditions:

Method: GET, POST or HEAD.

Headers – we can set only:
* Accept
* Accept-Language
* Content-Language
* Content-Type to the value application/x-www-form-urlencoded, multipart/form-data or text/plain.

The essential difference is that simple requests were doable since ancient times using `<form>` or `<script>` tags, while non-simple were impossible for browsers for a long time.

So, the practical difference is that simple requests are sent right away, with Origin header, while for the other ones the browser makes a preliminary “preflight” request, asking for permission.

For simple requests:

* → The browser sends Origin header with the origin.
* ← For requests without credentials (not sent default), the server should set:
    * Access-Control-Allow-Origin to * or same value as Origin
* ← For requests with credentials, the server should set:
    * Access-Control-Allow-Origin to same value as Origin
    * Access-Control-Allow-Credentials to true

Additionally, to grant JavaScript access to any response headers except Cache-Control, Content-Language, Content-Type, Expires, Last-Modified or Pragma, the server should list the allowed ones in Access-Control-Expose-Headers header.

For non-simple requests, a preliminary “preflight” request is issued before the requested one:

* → The browser sends OPTIONS request to the same URL, with headers:
    * Access-Control-Request-Method has requested method.
    * Access-Control-Request-Headers lists non-simple requested headers.
* ← The server should respond with status 200 and headers:
    * Access-Control-Allow-Methods with a list of allowed methods,
    * Access-Control-Allow-Headers with a list of allowed headers,
    * Access-Control-Max-Age with a number of seconds to cache permissions.
*  the actual request is sent, the previous “simple” scheme is applied.

### 7. URL Object
The syntax to create a new URL object:

`new URL(url, [base])`
* url – the full URL or only path (if base is set, see below),
* base – an optional base URL: if set and url argument has only path, then the URL is generated relative to base.

###### Search Params
It provides convenient methods for search parameters:

* append(name, value) – add the parameter by name,
* delete(name) – remove the parameter by name,
* get(name) – get the parameter by name,
* getAll(name) – get all parameters with the same name (that’s possible, e.g. ?user=John&user=Pete),
* has(name) – check for the existence of the parameter by name,
* set(name, value) – set/replace the parameter,
* sort() – sort parameters by name, rarely needed,
* …and it’s also iterable, similar to Map.

### 8. XMLHttpRequest
Typical code of the GET-request with XMLHttpRequest:

let xhr = new XMLHttpRequest();

xhr.open('GET', '/my/url');

xhr.send();

xhr.onload = function() {
  if (xhr.status != 200) { // HTTP error?
    // handle error
    alert( 'Error: ' + xhr.status);
    return;
  }

  // get the response from xhr.response
};

xhr.onprogress = function(event) {
  // report progress
  alert(`Loaded ${event.loaded} of ${event.total}`);
};

xhr.onerror = function() {
  // handle non-HTTP error (e.g. network down)
};

There are actually more events, the modern specification lists them (in the lifecycle order):

* loadstart – the request has started.
* progress – a data packet of the response has arrived, the whole response body at the moment is in response.
* abort – the request was canceled by the call xhr.abort().
* error – connection error has occurred, e.g. wrong domain name. Doesn’t happen for HTTP-errors like 404.
* load – the request has finished successfully.
* timeout – the request was canceled due to timeout (only happens if it was set).
* loadend – triggers after load, error, timeout or abort.

The error, abort, timeout, and load events are mutually exclusive. Only one of them may happen.

The most used events are load completion (load), load failure (error), or we can use a single loadend handler and check the properties of the request object xhr to see what happened.

We’ve already seen another event: readystatechange. Historically, it appeared long ago, before the specification settled. Nowadays, there’s no need to use it, we can replace it with newer events, but it can often be found in older scripts.

If we need to track uploading specifically, then we should listen to same events on xhr.upload object.

### 11. WebSocket
WebSocket is a modern way to have persistent browser-server connections.

* WebSockets don’t have cross-origin limitations.
* They are well-supported in browsers.
* Can send/receive strings and binary data.
* The API is simple.

Methods:

* socket.send(data),
* socket.close([code], [reason]).

Events:

* open,
* message,
* error,
* close.
### 12. Server Sent Events
_**EventSource**_ object automatically establishes a persistent connection and allows the server to send messages over it.

It offers:

* Automatic reconnect, with tunable retry timeout.
* Message ids to resume events, the last received identifier is sent in Last-Event-ID header upon reconnection.
* The current state is in the readyState property.
That makes EventSource a viable alternative to WebSocket, as it’s more low-level and lacks such built-in features (though they can be implemented).

In many real-life applications, the power of EventSource is just enough.

Supported in all modern browsers (not IE).

The syntax is:

`let source = new EventSource(url, [credentials]);`
The second argument has only one possible option: { withCredentials: true }, it allows sending cross-origin credentials.

Overall cross-origin security is same as for fetch and other network methods.

###### Properties of an EventSource object
* `readyState`
The current connection state: either EventSource.CONNECTING (=0), EventSource.OPEN (=1) or EventSource.CLOSED (=2).
* `lastEventId`
The last received id. Upon reconnection the browser sends it in the header Last-Event-ID.
###### Methods
* `close()`
Closes the connection.
###### Events
1. `message`
Message received, the data is in event.data.
2. `open`
The connection is established.
3. `error`
In case of an error, including both lost connection (will auto-reconnect) and fatal errors. We can check readyState to see if the reconnection is being attempted.

The server may set a custom event name in event:. Such events should be handled using addEventListener, not `on<event>`.

###### Server response format
The server sends messages, delimited by \n\n.

A message may have following fields:

* data: – message body, a sequence of multiple data is interpreted as a single message, with \n between the parts.
* id: – renews lastEventId, sent in Last-Event-ID on reconnect.
* retry: – recommends a retry delay for reconnections in ms. There’s no way to set it from JavaScript.
* event: – event name, must precede `data:`.

A message may include one or more fields in any order, but id: usually goes the last.