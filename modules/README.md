# Utilities

## `utilities.throttle`

```js
let fn = utilities.throttle(callback,time)
fn()

// for example:

let fn = utilities.throttle(() => {console.log('test message')},1000);

window.onmousemove = function() {
    fn();
}

```

## `utilities.debounce`

```js
let fn = utilities.debounce(callback,time)
fn()

// for example:

let fn = utilities.debounce(() => {console.log('test message')},500);

window.onmousemove = function() {
    fn();
}
```