---
title: Typescript Basics
author: ChocolateAceCream
date: 2025/04/18 10:24
isTop: true
categories:
 - Typescript
tags:
 - Typescript
---

# Typescript Basics <Badge text="Typescript" type="warning" />

## Basic Types
TS have same primitive types as JS: boolean, bigint, null, number, string, symbol and undefined.
Also, TS extends with more types:
- any: allow anything
- unknown: ensure someone using this type declares what the type is
e.g. when you get resp from api, use unknown will force you to perform type checking before using the value
- never: it's not possible that this type could happen
p.s. never is more like a self-check guard that prevent yourself to make mistake later.(so mistake can be detected at compile time--->fail fast pattern)
- void: a function which returns undefined or has no return value
- tuple: easier way to manage keyed object like data structure.
e.g. const resp: [string,number] = ["{}",200]

## Type VS Interface
Always prefer Interface over Type, unless special features needed.

### Key difference
Interface is open, but type is close
e.g.
```ts
interface Kitten {
  purrs: boolean;
}

interface Kitten {
  color: string;
}

// now Kitten should have two prop: color and purrs

type Puppy = {
  color: string;
};

/* this not gonna work, a type cannot be changed outside of its declaration.
type Puppy = {
  toys: number;
};
*/
```

|Use Case | Prefer
|---|---|
|Object shapes (especially classes) | interface
|Extending and declaration merging | interface
|Union, intersection, primitives | type
|Advanced type composition | type
|Library/public APIs | interface (for extensibility)

### Type can do but interface cant
1. use type operators
```ts
type Status = 'active' | 'inactive';
type ID = string | number;
type Admin = User & { adminLevel: number};
```
2. tuples, primitives and arrays
```ts
type NameTuple = [string, string];
type Age = number;
```

3. Conditional & Mapped Types
```ts
type Nullable<T> = {[P in keyof T]: T[P] | null};
type Response<T> = T extends string ? string[] : T[];
```

### Summary
- Use type to define data and interface to describe object structure.
- Use interface for public-facing, extendable object contracts (like props, API responses, config objects).
- Use type for logic-heavy, custom, composed, or utility-like type definitions.

## Composing Types
You can create complex types by combing simple ones, with unions and generics
### Unions
```ts
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

function getLength(obj: string | string[]) {
  return obj.length;
}
```

To learn the type of a variable, use typeof
|Type|Predicate|
|---|---|
|string	|typeof s === "string"
|number	|typeof n === "number"
|boolean	|typeof b === "boolean"
|undefined	|typeof undefined === "undefined"
|function	|typeof f === "function"
|array	|Array.isArray(a)

### Generics
Pretty much like Go's generics.

## Structural Type ("Duck Typing")
TS can infer the type.
```ts
interface Point {
  x: number;
  y: number;
}

function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

// logs "12, 26"
const point = { x: 12, y: 26 };
logPoint(point);
```

Even though point passed to logPoint function is not declared with Point type, since it contains every prop of Point type, it's inferred by TS to be of the same type as Point since the 'shape' matched, thus no error returns.
P.S. In order for duck typing to work, the shape-matching only requires a subset of the object’s fields to match. e.g. it can still work if point has more fields added, as long as it contains every field of Point.

