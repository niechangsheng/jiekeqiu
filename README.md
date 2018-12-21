# jiekeqiu

jiekeqiu(杰客求) is an attempt to recreate jQuery thru native JS...

(www.jiekeqiu.com is still under construction...)

## JKQ API

### `$_$` and `$Q`

use `$_$(selector, scope)` or `$Q(selector, scope)` to create new JKQ object;

```js
 $_$('div');
```

### `$_$.jsonp()` and `$Q.jsonp()` `$_$.J_P()` `$Q.J_P()`

`$_$.J_P(url, data, keyword)` returns a Promise object,
use `.then(fn(resp))` or `.done(fn(resp))` to handle the response when the promise is resolved,
use `.catch(fn(error))` or `.then(fn(error))` to handle the error;

```js
$_$.J_P('https://url', {key: value}, 'keyword')
    .done(resp => {})
    .catch(error => {})
```

### `.T_T()` and `.html()`

```js

```

### `.V_V()` and `.val()`

```js

```

### `.S_S()` and `.css()`

```js

```

### `.P_P()` and `.prop()`

```js

```

### `.R_R()` and `.attr()`

```js

```

### `.A_C()` and `.addClass()`

```js

```

### `.R_C()` and `.removeClass()`

```js

```

### `.T_C()` and `.toggleClass()`

```js

```