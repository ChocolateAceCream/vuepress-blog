---
title: Arrow Functions & Regular Functions
author: ChocolateAceCream
date: 2023/12/31 19:00
isTop: false
categories:
 - frontend
tags:
 - JavaScript
---


# Differences Between Arrow Functions and Regular Functions <Badge text="JavaScript" type="warning" />

In JavaScript, arrow functions and regular functions serve similar but distinct purposes, with notable differences in behavior and capabilities.

### Constructor Usage

- **Regular functions** can be used as constructors.
  ```js
  // Regular function as a constructor
  function Car(color) {
    this.color = color;
  }

  const redCar = new Car('red'); // Creates a new Car object
  ```

- **Arrow functions** cannot be used as constructors and will throw a TypeError if used with `new`.
  ```js
  // Attempting to use an arrow function as a constructor
  const Car = (color) => {
    this.color = color;
  };

  const redCar = new Car('red'); // TypeError: Car is not a constructor
  ```

### `arguments` Object

- **Regular functions** define the `arguments` object, allowing access to all arguments passed to the function.
  ```js
  function Demo() {
    const arrow = () => {
      console.log(arguments); // Logs arguments of Demo
    };
    arrow('c', 'd');
  }

  Demo('a', 'b'); // Logs Arguments(2) ['a', 'b', callee: f, Symbol(Symbol.iterator): f]
  ```

- **Arrow functions** do not have their own `arguments` object; they access the `arguments` from the enclosing function's scope.

### Return Behavior

- **Arrow functions** implicitly return the result of the expression, if there is no block `{}`.
  ```js
  const oneLine = num => num + 2;
  console.log(oneLine(42)); // Returns 44
  ```

- **Regular functions** return `undefined` unless explicitly returning something.
  ```js
  function oneLine() {
    43;
    return;
  }

  console.log(oneLine()); // Returns undefined
  ```

### `this` Value

- **Regular functions**: `this` is dynamic and varies based on how the function is called.
  ```js
  class Demo {
    constructor(name) {
      this.name = name;
    }
    logThis() {
      console.log(this);
    }
  }

  const t = new Demo('demo');
  t.logThis(); // Prints new Demo instance { name: 'demo' }
  setTimeout(t.logThis, 1000); // Prints window or undefined in strict mode

  // Binding `this` to the instance
  setTimeout(t.logThis.bind(t), 1000); // Prints new Demo instance { name: 'demo' }
  ```

- **Arrow functions**: `this` is lexically scoped, meaning it retains the context of where it was created.
  ```js
  class Demo {
    constructor(name) {
      this.name = name;
      this.logThis = () => {
        console.log(this);
      };
    }
  }

  const t = new Demo('demo');
  t.logThis(); // Prints new Demo instance { name: 'demo' }
  setTimeout(t.logThis, 1000); // Consistently prints new Demo instance { name: 'demo' }
  ```

### Constructor Usage and Arrow Functions

When arrow functions are used inside a constructor, they are attached directly to the instance, not to the prototype. Each instance receives its own copy of the arrow function, which can impact memory usage if many instances are created.

## Summary

The `this` value inside a regular function is dynamic and depends on how the function is invoked. In contrast, `this` inside an arrow function is lexically bound and remains consistent with the `this` of the outer function scope. Regular functions feature an `arguments` object, while arrow functions do not, requiring the use of rest parameters to handle arbitrary numbers of arguments.
