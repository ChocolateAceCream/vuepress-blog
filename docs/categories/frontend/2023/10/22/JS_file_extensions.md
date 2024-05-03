---
title: JS File extensions
author: ChocolateAceCream
date: 2023/10/22 19:00
isTop: false
categories:
 - frontend
tags:
 - JavaScript
---

# iife、cmd、cjs、umd、esm in javascript world

## iife
iife stands for Immediately Invoked Function Expression. Usually used as closure.

##### why?
- avoid global variable name conflict. Anything declared inside iife has scope inside iife.
- preserve variables that passed to the iife since those var is not recycled by gc
- better code encapsulation. e.g a classic jQuery function
```js
(function($, window){
     // details...
 })(jQuery, window, undefined)
 ```

## cjs
cjs stands fro commentjs, widely used in nodejs server side. It has to be imported using module.exports or require()

## UMD
Universal Module Definition, compatible with iife and amd
```js
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.NAME = factory());
}(this, (function () {
    //code
    return obj;
})));
```

## ESM
ES2015 official standard, usually cannot run directly in browser until recently. The newer version browser chrome 61+，firefox 60+，safari 11+）can run ESM like this:
```html
<script type="module">
  onst increase = (val, total) => total + val;
  // ... stuff
  export { increase };
</script>
``