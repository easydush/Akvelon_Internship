### 1. Cookies, document.cookie
`document.cookie` provides access to cookies

* write operations modify only cookies mentioned in it.
* name/value must be encoded.
* one cookie up to 4kb, 20+ cookies per site (depends on a browser).

Cookie options:

* `path=/`, by default current path, makes the cookie visible only under that path.
* `domain=site.com`, by default a cookie is visible on current domain only, if set explicitly to the domain, makes the cookie visible on subdomains.
* `expires` or `max-age` sets cookie expiration time, without them the cookie dies when the browser is closed.
* `secure` makes the cookie HTTPS-only.
* `samesite` forbids the browser to send the cookie with requests coming from outside the site, helps to prevent XSRF attacks.

Additionally:

Third-party cookies may be forbidden by the browser, e.g. Safari does that by default.
When setting a tracking cookie for EU citizens, GDPR requires to ask for permission.

### 2. 
Web storage objects localStorage and sessionStorage allow to store key/value in the browser.

* Both key and value must be strings.
* The limit is 5mb+, depends on the browser.
* They do not expire.
* The data is bound to the origin (domain/port/protocol).

###### localStorage	
1. Shared between all tabs and windows with the same origin
2. Survives browser restart	
###### sessionStorage
1. Visible within a browser tab, including iframes from the same origin
2. Survives page refresh (but not tab close)

API:

* `setItem(key, value)` – store key/value pair.
* `getItem(key)` – get the value by key.
* `removeItem(key)` – remove the key with its value.
* `clear()` – delete everything.
* `key(index)` – get the key number index.
* `length` – the number of stored items.
* Use `Object.keys` to get all keys.
* We access keys as object properties, in that case storage event isn’t triggered.

Storage event:

* Triggers on setItem, removeItem, clear calls.
* Contains all the data about the operation (key/oldValue/newValue), the document url and the storage object storageArea.
* Triggers on all window objects that have access to the storage except the one that generated it (within a tab for sessionStorage, globally for localStorage).

### 3. IndexedDB
IndexedDB is a simple key-value database, powerful enough for offline apps, yet simple to use.

The basic usage can be described with a few phrases:

* Get a promise wrapper like idb.
* Open a database: idb.openDb(name, version, onupgradeneeded)
* Create object storages and indexes in onupgradeneeded handler or perform version update if needed.

For requests:
* Create transaction db.transaction('books') (readwrite if needed).
* Get the object store transaction.objectStore('books').
* Then, to search by a key, call methods on the object store directly.
* To search by an object field, create an index.
* If the data does not fit in memory, use a cursor.