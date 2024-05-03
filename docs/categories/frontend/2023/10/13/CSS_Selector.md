---
title: CSS Selector
author: ChocolateAceCream
date: 2023/10/13 19:00
isTop: false
categories:
 - frontend
tags:
 - HTML
 - CSS
---

# CSS Selector <Badge text="CSS" type="warning" />

1. different between
> .d1 .d2 {} , .d1.d2{} and .d1, .d2 {}
```css
.d1 .d2 {
  /* di is parent class, and then select all its children with class d2 */
}

.d1.d2{
  /* select the element which have directly labeled d1 and d2 class  */
}

.d1, .d2{
  /* select any elements with .d1 or .d2 or both .d1 and .d2 */
}
```

2. adjacent selector (+):
>.item-1 + div {}

select the next element right after element with class .item-1,

3. direct child selector (>):
> .wrapper > .item {}

only select direct child which has class .item within .wrapper class
```html
<div class=".wrapper">
  <div class=".item"> this is selected</div>
  <div>
    <div class=".item"> this is not selected since it's not a direct child of .wrapper class</div>
  </div>
</div>

```

4. bro selector (~):
> .item-1 ~ div {}
select all same level div after the .item-1 element
```html
<div class=".item-6">not selected, since it is before .item-1</div>
<div class=".item-1"></div>
<div class=".item-2">selected</div>
<p>not selected</p>
<div class=".item-3">selected</div>
<div class=".item-3">selected</div>
  <div class=".item-5">not selected, since not the same level
</div>

```

5. owl selector (* + * {}):
select any(*) element which is not the first element in the container (first element does not have a previous brother element). usually used to add margin

6. attribute selector
- [data-text]{}: select any elements with attribute labelled data-text
```html
<div data-text="abc">selected</div>
<div data-text="efg">selected</div>
```

- [data-text="abc"]{}: select elements only with attribute data-text="abc"
```html
<div data-text="abc">selected</div>
<div data-text="efg">not selected</div>
```

-[attribute~="abc"]{}: if multiple attribute values included, as long as it contains abc, select em.
```html
<div data-text="abc cde efg">selected</div>
<div data-text="efg dva ddd">not selected</div>
```

-[attribute*="abc"]{}: if the whole attribute value field contains string abc, select em
```html
<div data-text="111abccccddd">selected</div>
<div data-text="abababab">not selected</div>
```

-[attribute^="abc"]{}: if the whole attribute value field start with string abc, select em
```html
<div data-text="111abccccddd">not selected</div>
<div data-text="abcababab">selected</div>
```


-[attribute$="abc"]{}: if the whole attribute value field ends with string abc, select em
```html
<div data-text="111abccccdddabc"> selected</div>
<div data-text="abcababab">not selected</div>
```

---

## pseudo-element

1. ::before and ::after
used to insert stuff before/after the actual content in a container.
```css
.alert::before {
  content: '✌️';
  margin-right: 0.5px;
}
```

2. ::first-letter and ::first-line
target the first letter/line of inside the block. Only apply when there's an text content
```css
.a1::first-letter{
  color: crimson;
  float:left;
  font-weight:bold;
  font-size:2em;
}
```
3. ::placeholder
used to target placeholder for input or other element which has a placeholder when user input nothing.
```css
input::placeholder {
  font-style: italic;
  color: thistle;
  opacity:0.7;
}
```

4. ::selection
target text that selected (highlight) by user, may imply on title, paragraph, button etc...
```css
h1::selection {
  background: gold;
  color:darkblue;
}
```

5. ::marker
target list marker
```css
li::marker{
  color: LightSeaGreen;
  font-size:1.5em;
  font-weight: bold;
}
```