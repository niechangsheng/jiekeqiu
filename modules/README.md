# Utilities

## `utilities.throttle` and `utilities.debounce`

```js
let fn = utilities.throttle(callback,time)
fn()

// for example:

let fn = utilities.throttle(() => {console.log('test message')},1000);

window.onmousemove = function() {
    fn();
}

```