---
title: Real life example
author: ChocolateAceCream
date: 2025/04/21 10:24
isTop: true
categories:
 - Typescript
tags:
 - Typescript
---

# Real life example <Badge text="Typescript" type="warning" />
Some useful code blocks from real life.

## Build-in Utility Types
TypeScript provides several utility types to facilitate common type transformations. These utilities are available globally.
### Record<Keys, Type>
map the properties of a type to another type.
```ts
type CatName = "miffy" | "boris" | "mordred";

interface CatInfo {
  age: number;
  breed: string;
}

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};

cats.boris;
```

### Required<T>
remove optional field of T
```ts
type Required<T> = {
  [K in keyof T]-?: T[K]
}

//usage
interface Props{
  a?: number,
  b?:string
}
type requiredProps = Required<Props>
const obj: requiredProps = {a:5} // raise error since b is missing
```

### Awaited<Type>
When you use async, then that function always return a promise.
when a promise return a reject, the reject object contains the stack trace info. You can convert it to a string representation to get rid of stack trace info.

Usage: unwrap promise and return the 'return type'
e.g.
```ts
type B = Awaited<Promise<Promise<number>>>;
// now type b = number
```
p.s. It's safe to use with non-promise types
> type T1 = Awaited<string>;  // string


## Dynamic type generation
```ts
//e.g. you want role to be { admin: number, user: number, guest: number }
type Record<T extends keyof any, U> = {
  [K in T]: U
}

const createEnum = <T extends string>(v: T[]): Record<T,number> => {
  const result = {} as Record<T,number>
  values.forEach((val, idx)=>{
    result[v]=i
  })
  return result
}

const roles = createEnum(['admin','user','guest'])
```

Record defined a type so key to be one type and value to be one type.


## JSDoc
special syntax sugar to enable hover-show document effect.
e.g.
```ts
/**
 * If `true`, the component is disabled.
 * @default false
 */
disabled?: boolean;
```
