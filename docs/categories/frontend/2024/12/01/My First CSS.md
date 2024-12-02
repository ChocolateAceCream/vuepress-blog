---
title: My First CSS
author: ChocolateAceCream
date: 2024/12/1 19:00
isTop: false
categories:
 - frontend
tags:
 - CSS
 - React Native
 - Frontend
---

# First thing to know as a frontend developer
### The box model
- box-sizing: content-box (browser default)
The size of an element only includes its content, and not its padding or border.


- box-sizing: border-box
The size of an element is inclusive of its padding and border.
So if you set width to 100%, and the element has border or padding, then it will overflow.
Since border-box makes more sense, it's usually included in reset CSS

### Margin
margin values sometimes collapse with an adjacent element's margin, taking the max between them.
e.g.
if div1 margin-bottom is 20px and div2 margin-top is 30px, then the actual distance between div1 and div2 is 30px.

<span> will not take explicit height and margin-bottom margin-top, since it only take up as much height as their content requires.
```<div style="display:inline">``` will behavior same as <span>

### Layout
- ```display: block```: its child elements will inherit its width by default.
- ```display: inline```: turn the element into a inline element.

### Document Flow and Positioning
By default, elements will have ```position: static``` and so setting z-index will have no effect.

- ```position:fixed```: they appear fixed in place and don't move, even when scrolling. (now the element's layout like top,right,left,bottom is regarding to viewport)

### Best practice:
1. Don't use outer margins. Since margin may collapse and you want to make your component easy to just include in an app without worrying if they break outside of their simple rectangle.