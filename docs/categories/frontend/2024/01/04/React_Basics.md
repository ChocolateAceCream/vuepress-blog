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

## Hooks
### useState
take an initial state value and return two params, one is obj, one is method that can change the state of obj
```js
function ImageGallery() {
  const [index, setIndex] = useState(0);
  // ...
```

### useContext & createContext
use createContext to create a context, which serve as a global state store, any sub nodes of node where context is created can access to that context using useContext() method.
p.s. remember to import the context that created by createContext()
```js
import React, { createContext, useState, useContext } from 'react';

// Create a context
const ThemeContext = createContext();

// Component that provides the theme
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// A component that uses the theme
const Button = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <button onClick={toggleTheme}>
            Current Theme: {theme}
        </button>
    );
};

// App component that uses ThemeProvider
const App = () => {
    return (
        <ThemeProvider>
            <Button />
        </ThemeProvider>
    );
};

export default App;
```

##### Why use context hook
- alternative is passing value through props, but once that prop changed, each component followed that node tree chain all rerendered. However, context hook only rerender components that imported that context.


### Effect hook
like vue's watch
```js
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      console.log('Calling video.play()');
      ref.current.play();
    } else {
      console.log('Calling video.pause()');
      ref.current.pause();
    }
  }, [isPlaying]);

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState('');
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
```