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
Map the properties of a type to another type.

```typescript
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