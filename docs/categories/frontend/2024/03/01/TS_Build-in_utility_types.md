---
title: TS Utility Types
author: ChocolateAceCream
date: 2024/03/01 19:00
isTop: false
categories:
 - frontend
tags:
 - TypeScript
---


# Build-in Utility Types <Badge text="TypeScript" type="warning" />

when a type feels like can be widely used in many cases. Typescript integrate the type as built-in types

- Partial
```ts
// Partial<Type>: make Type params all optional
interface Sticker {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  submitter: undefined | string;
}

type StickerUpdateParam = Partial<Sticker>;
// now all fields in Sticker is optional
```

- Readonly: convert all fields in a type to be readonly, which means the value of field cannot be re-assigned after its initialization in constructor
```ts
type Readonly = Readonly<Sticker>

// normally you can use to set a field to be readonly
class Example {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
}
```

- Record<param1, param2>: create a type using keys from an array (first param) and give each key the value from second param

- Pick<T, Keys>: pick types from T which has key in Keys.
e.g.

```ts
type StickerSortPreview = Pick<Sticker, "name" | "updatedAt">;
// use | means Keys can be name or updatedAt. So both should be included in type StickerSortPreview
```

- `Omit<T, Keys>`: same as above, filter out T's types which key in Keys.

> type OmitDemo = Omit<Sticker, "name" | "updatedAt">

use `|` to filter out both types

- `Exclude<T1, T2>`: remove props from T1 which is also included in T2

- `Extract<T1, T2>`: return same props from T1 and T2, if not found, return never

- `NonNullable<T>`: filter out null and undefined from T

- `Required<T>`: convert all optional props in T to required