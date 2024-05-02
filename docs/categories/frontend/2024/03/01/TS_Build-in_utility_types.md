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

When a type is broadly applicable, TypeScript integrates it as a built-in utility type.

- **Partial**
```ts
// Partial<Type>: Makes all properties of Type optional.
interface Sticker {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  submitter: undefined | string;
}

type StickerUpdateParam = Partial<Sticker>;
// Now, all fields in Sticker are optional.
```

- **Readonly**
```ts
// Converts all fields in a type to be readonly, which means the value of the field cannot be reassigned after its initialization in the constructor.
type ReadonlySticker = Readonly<Sticker>;

// Normally, you can use it to set a field to be readonly.
class Example {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
}
```

- **Record<param1, param2>**
```ts
// Creates a type using keys from an array (first param) and assigns each key a value from the second param.
```

- **Pick<T, Keys>**
```ts
// Picks properties from T that are specified in Keys.
type StickerSortPreview = Pick<Sticker, "name" | "updatedAt">;
// Using '|' means Keys can be 'name' or 'updatedAt', so both should be included in the type StickerSortPreview.
```

- **Omit<T, Keys>**
```ts
// Omits properties from T that are specified in Keys.
type OmitDemo = Omit<Sticker, "name" | "updatedAt">
// Using '|' to filter out both types.
```

- **Exclude<T1, T2>**
```ts
// Removes properties from T1 that are also included in T2.
```

- **Extract<T1, T2>**
```ts
// Returns the same properties from T1 and T2, if not found, returns never.
```

- **NonNullable<T>**
```ts
// Filters out null and undefined from T.
```

- **Required<T>**
```ts
// Converts all optional properties in T to required.
```

