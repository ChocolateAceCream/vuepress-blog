---
title: React Basics
author: ChocolateAceCream
date: 2024/01/04 19:00
isTop: false
categories:
 - frontend
tags:
 - React
 - JSX
---

# React Basics <Badge text="React" type="warning" />
## JSX Identifier

#### first lesson: <> & </>
<> and </> are used as shorthand for react fragment.
A react fragment is a way to group multiple elements in JSX without adding an extra DOM wrapper.
e.g.
you don't have to wrap elements in a div, you can do this instead
```html
<>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src={viteLogo} className="logo" alt="Vite logo" />
    </a>
    <a href="https://react.dev" target="_blank">
      <img src={reactLogo} className="logo react" alt="React logo" />
    </a>
  </div>
  <h1>Vite + React</h1>
</>
```
after using <>, the wrapped elements are direct append as child in the parent element.