---
title: TS Mapped Types
author: ChocolateAceCream
date: 2024/03/04 19:00
isTop: false
categories:
 - frontend
tags:
 - TypeScript
---

# TS Mapped Types <Badge text="TypeScript" type="warning" />

Mapped Types are a way to create new types based on another type, usually as a transformational type.

Common use case is for partial subsets of existing type

```ts
interface Artist {
  id: number;
  name: string;
}
//if we want to create an UpdateArtist type to send update request with artist as payload, we can use Partial
type UpdateArtistPayload = Partial<Artist> & {id: number}
// or Mapped types
type UpdateArtistPayload2<Type> = {[k in keyof Artist]?: Type[k] } & {id: number}
```