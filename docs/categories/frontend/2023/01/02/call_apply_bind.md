---
title: Difference between call, apply & bind
author: ChocolateAceCream
date: 2023/01/02 19:00
isTop: true
categories:
 - frontend
tags:
 - JavaScript
---

# Differences Between `call`, `apply`, and `bind` in JavaScript <Badge text="JavaScript" type="warning" />

In JavaScript, the keywords `call`, `apply`, and `bind` are used to specify the context of `this` within functions. Each of these methods serves to manipulate `this`, but they differ in how they pass arguments and bind context.

- `call`: Passes arguments individually, separated by commas.
- `apply`: Takes arguments as an array.
- `bind`: Returns a new function with `this` bound to a specified object, without immediately invoking the function.

```js
const module = {
  x: 42,
  getX: function() {
    return this.x;
  },
  sum: function(a, b) {
    return a + b + this.x;
  }
};

const gx = module.getX;
console.log(gx()); // Returns undefined since `this` points to the global object

const binded = gx.bind(module);
console.log(binded()); // Returns 42 since `this` is bound to `module`

const module2 = {
  x: 24
};
console.log(gx.call(module2)); // Returns 24 since `this` is set to `module2`

console.log(gx.apply(module2)); // Returns 24, similar to `call` but would accept an array if there were parameters

const s = module.sum;
console.log(s.call(module2, 1, 2)); // Outputs 27
console.log(s.apply(module2, [1, 2])); // Also outputs 27, demonstrating how `apply` takes an array of arguments
