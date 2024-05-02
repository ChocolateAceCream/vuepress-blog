---
title: TS Interface
author: ChocolateAceCream
date: 2024/03/03 19:00
isTop: false
categories:
 - frontend
tags:
 - TypeScript
---

# interface <Badge text="TypeScript" type="warning" />

1. basic usage
```ts
interface User{
  name: string
  id: number
}

const newUser: User = {
  name: 'X',
  id: 1
}
```

2. used in class
```ts
interface User{
  name: string
  id: number
}

class UserAccount{
  name: string
  id: number
  constructor(name: string, id: number){
    this.name = name
    this.id = id
  }
}

const user: User = new UserAccount("Y", 2)
```

3. to annotate params
```ts
function Demo(user: User){
  // take User type object as params
}

function Demo2(): User{
  // return User type object
}
```

4. in addition to JS primitive type: boolean, bigint, null. undefined, number, string, symbol.  TS extends this list with more, such as
- any: allow anything
- unknown: the type is unknown until being consumed, such as jsonParser, which don't know the shape of parsed data but once you need to use the data, you need to declare what the type is.
e.g.
```ts
interface User{
  name: string
  id: number
}
const ParserDemo = (data: string): unknown => Json.parse(data)
const newUser = ParserDemo(`{ "name": "Samuel" }`) as User
// then you can use newUser.name
```

- never: it's not possible that this type could happen. usually used to deal with unpredictability of js runtime.

- void: a function which returns undefined or has no return value

5.prefer ```interface``` than ```type``` unless the following features of type are needed
- union and intersection types:
```ts
// union type
type MyType = string | number
const myType: MyType = 123;

// intersection type
type Person = {name: string} & {age: number}
const person: Person = { name: "john", age: 12 };

// in intersection type, if same prop contained by both type, then the optional one will be replaced by the mandatory one
type Person = {name?: string} & {name: string} // person must have name prop
type Person = {name: string} & {name?: string} // same as above, person must have name prop

```

- conditional types:
```ts
type NonNullable<T> = T extends null | undefined ? never : T;
type MyT = NonNullable<string | null>; //MyType is string type
const newMyT: MyT = 123;
console.log("newMyT: ", newMyT);
const newMyT2: MyT = "asdf";
console.log("newMyT2: ", newMyT2);
```

- mapped types:
```ts
type TypeMapper = {
  option1: boolean;
  options2: string;
}

type MyType = {[k in keyof TypeMapper] : boolean | null}
/* [k in keyof TypeMapper] is used to iterate by MyType's keys and assign new value to that key. so MyType after iteration is
{
  option1: boolean | null;
  options2: boolean | null;
}
*/

//one usage of re-assign type is optional props
type Input = {
  name: string
  age: number
}
type OptionalProps = {
  [k in keyof Input]?: Input[k]
}

// Usage
const person1: OptionalProps = {}; // Valid, all properties are optional
const person2: OptionalProps = { name: "Alice" }; // Valid, age is optional
const person3: OptionalProps = { name: "Bob", age: 30 }; // Valid, both properties are provided
const person4: OptionalProps = { age: 25 }; // Valid, name is optional

```

- tuple and array types
```ts
type StringNumberTuple = [string, number]
type MyArray = Array<string>
```

### Composing Types
Create complex types by combining simple ones using union or generics

```ts
//union example
function unionDemo(obj: string | Array) {
  if(typeof obj === 'string') {
    console.log("obj is string")
  }
  if(Array.isArray(obj)) {
    console.log("obj is array")
  }
}
```

```ts
// generic example
type StringArray = Array<string>
type NumberArray = Array<number>
type ObjectWithNameArray = Array<{name: string}>

interface Backpack<T>{
  add: (obj: T) => void;
  get: ()=>T;
}

// if using type
type Backpack2<T> = {
  add: (obj: T) => void;
  get: ()=>T;
}

declare const backpack: Backpack<string>
const obj = backpack.get() // return string
backpack.add(23) // error: cannot assign number to int
```

### Structural Type System
once two obj has same shape, they are considered to be of same type

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

As well as the subset of shape matched, codes are good to go
```ts
interface P2 {
  x:number
  y:number
  z:number
}
const p2 = {x:2,y:3,z:4}
logPoint(p2)
```

### Modules
- When import a module, ts will look for a corresponding type definition file ***(.d.ts)*** to provide type info for the imported module. (e.g. when you import js library, you'd like to provide .d.ts to define types for functions/variables imported)

p.s. ***.d.ts*** file are usually put under @types folder in your root dir

project/
├── @types/
│   └── myLibrary.d.ts
├── src/
│   ├── myLibrary.ts
│   └── main.ts
└── tsconfig.json

p.s.2 you can put multiple .d.ts files in that @types folder. if there's conflict, TypeScript will use a process called "declaration merging" to merge the type definitions together. This allows you to have multiple type definition files for the same module without conflicts. However, if the conflict is about type definitions (same function with different  signatures)

# Structure Type System
```ts
interface Ball {
  diameter: number;
}
interface Sphere {
  diameter: number;
}

// since ball and sphere has same prop, them can be considered as same type and interchangeable

interface Tube {
  diameter: number;
  length: number;
}

// Since Tube has length prop which ball doesn't have, so, you can assign Tube type variable to ball type but not verse vise.
let tube: Tube = { diameter: 12, length: 3 };

ball = tube; // works ok
// tube = ball; not working
```

for functions, the input params type and return value type are like this:
```ts
let A = (a: number, b: number)=>({a})
let B = (a: number) => ({a})
let C = (a: number) => ({a, b: a})
A = B // not working, since A has more input params b doesn't
B = A // working. A has all input params of B
A = C // working, A's return type are all included in C
C = A // not working, C's return type not all included in A
```

### Nominal type system
in contrast with structural, nominal type system compare two types by its name or declaration. One main usage is that a string or number can have special context and you don't want to ever make the values transferrable. By convention, typescript use `& { __brand: "User Input Post Validation" }` to convert type to nominal type
e.g.
```ts
type ValidatedInputString = string & { __brand: "User Input Post Validation" };
const validateUserInput = (input: string) => {
  const simpleValidatedInput = input.replace(/\</g, "≤");
  //globally replace < with ≤
  return simpleValidatedInput as ValidatedInputString;
};

const printName = (name: ValidatedInputString) => {
  console.log(name);
};

const input = "alert('bobby tables<')";
const validatedInput = validateUserInput(input);
printName(validatedInput);

printName(input); // not working since input string type already converted to ValidatedInputString.

```