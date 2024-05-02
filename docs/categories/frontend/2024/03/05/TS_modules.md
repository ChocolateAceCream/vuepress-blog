---
title: TS Module
author: ChocolateAceCream
date: 2024/03/05 19:00
isTop: false
categories:
 - frontend
tags:
 - TypeScript
---

# Module in TypeScript <Badge text="TypeScript" type="warning" />

Here are some basic concepts about module systems in JavaScript and how TypeScript handles them:

- **ESModule**: Primarily for running in browsers.
- **CommonJS**: Used mainly in backend Node.js environments.
- **Node 16+ Support for ESModule**: Starting with Node version 16, ESModule is supported. Prior to version 16, only CommonJS was supported.
- **Purpose of TypeScript Compiler**: The TypeScript compiler aims to detect errors before the code is executed at runtime. It requires information about the runtime environment where the compiled code will run.
- **File Extensions in TypeScript**:
  - `.mts` and `.cts` files let the TypeScript compiler know the compiled code should be in `.mjs` (ES Module) and `.cjs` (CommonJS) formats, respectively.
  - For `.js` files, the TypeScript compiler will look up the module setting in `package.json`. If `"type": "module"` is found, it outputs `.mjs`; otherwise, it defaults to `.cjs`.

### ES Module Details:

#### ES2015:
- Introduced `import` and `export` syntax to the language.

#### ES2020:
- Adds features like `import.meta` and `export * as ns from "mod"` to the previous standards.
- Example:
  ```javascript
  import * as utils from './utils';
  // You can export all functions in a namespaced module called utils, then use them like `utils.func1()`, `utils.func2()`.
  ```
- Supports export default for exporting a single default function or variable from a module.
  ```js
  export default function func1() {}
  // This can be imported and aliased as desired:
  import defaultFunc from 'utils';
  // `defaultFunc` refers to `func1`.
  ```

  Note: import * will ignore the default export in the target file.

#### ES2022:
Adds support for top-level await to ES2020, allowing await to be used outside of async functions.