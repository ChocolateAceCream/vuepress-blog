---
title: requestAnimationFrame()
author: ChocolateAceCream
date: 2024/02/14 19:00
isTop: false
categories:
 - frontend
tags:
 - JavaScript
---


# The `window.requestAnimationFrame()` Method <Badge text="JavaScript" type="warning" />

## Syntax

```js
requestAnimationFrame(callback);
```

## Usage

Instructs the browser to execute the specified callback function before the next repaint, optimizing animations by aligning them with the display refresh rate.

## Callback Function

The callback function receives a `DOMHighResTimeStamp` which indicates the end time of the previous frame's rendering (a timestamp in milliseconds).

## Return Value of `requestAnimationFrame()`

The `requestAnimationFrame()` method returns a long integer, the request ID, uniquely identifying the entry in the callback list. This ID can be used with `window.cancelAnimationFrame()` to cancel the scheduled callback.

## Demo

```js
const element = document.getElementById('request-animation-frame-demo');
let start, previousTimeStamp;
let done = false;
let count = 0;

function step(timestamp) {
  if (!done) {
    element.style.transform = `translateX(${count}px)`;
    count += 1;
    if (count > 1200) {
      done = true;
    }
  }
  window.requestAnimationFrame(step);
}

step();  // Initialize animation loop

let zero;
requestAnimationFrame(firstFrame);
function firstFrame(timeStamp) {
  zero = timeStamp;
  animate(timeStamp);
}
function animate(timeStamp) {
  const value = (timeStamp - zero) % 2;
  if (!done) {
    element.style.opacity = value;
    requestAnimationFrame((t) => animate(t));
  }
}
```
