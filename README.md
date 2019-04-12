# simple-firebase
Firebase realtime database with much simpler syntax.

## Functions:

#### `firebase - require("simple-firebase")`

```js
firebase.initializeApp(config)
```
Returns: promise - database.

```js
firebase.get(uri)
```
Returns: promise - the value

```js
firebase.set(uri, value)
```
Returns: promise

```js
firebase.increment(uri, number)
```
Returns: promise

```js
firebase.delete(uri)
```
Returns: promise