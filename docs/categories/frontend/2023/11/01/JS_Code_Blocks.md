---
title: JS Code Blocks
author: ChocolateAceCream
date: 2023/11/01 19:00
isTop: True
categories:
 - frontend
tags:
 - JavaScript
---

# Useful JavaScript Code Blocks <Badge text="JavaScript" type="warning" />

## Deep Copy
```js
const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8]
};
target.target = target;


const deepCopy = (obj, map = new WeakMap)=>{
  if (typeof obj === 'object') {
    const isArr = Array.isArray(obj)
    if (map.get(obj)) {
      return map.get(obj)
    }

    let newObj = isArr ? [] : {}
    map.set(obj, newObj)
    if (isArr) {
      obj.forEach((v, i) => {
        newObj[i]=deepCopy(obj[i],map)
      })
    } else {
      Object.keys(obj).forEach(k => {
        newObj[k] = deepCopy(obj[k], map)
      })
    }
    return newObj
  } else {
    return obj
  }
}

const DeepCopy = (obj, map = new WeakMap()) => {
  if (typeof obj === 'object') {
    const isArray = Array.isArray(obj)
    let newObj = isArray ? [] : {}
    if (map.get(obj)) {
      return map.get(obj)
    }
    map.set(obj, newObj)
    const keys = isArray ? undefined : Object.keys(obj)
    forEach(keys || newObj, (key, value) => {
      if (keys) {
        key = value
      }
      newObj[key] = DeepCopy(obj[key],map)
    })

    return newObj

  } else {
    return obj
  }

}


const forEach = (objs, iterator) => {
  let i= 0
  const l = objs.length
  while (i < l) {
    iterator(i, objs[i])
    i++
  }
  return objs
}


console.time();
const r = deepCopy(target)
console.timeEnd();

console.time();
const r2 = DeepCopy(target)
console.timeEnd();
```

## Prototype calls

```js
let m = [1,2,3,4]
Object.prototype.toString.call(m)
```

## every, some, forEach
every and some were introduced in ES5, because in forEach loop, you can not exit early (have to finish all iterations)
```ts
// some example
function containsEvenNumber(array: number[]): boolean {
  return array.some(element => element % 2 === 0);
}

const numbers = [1, 3, 5, 7, 8];
console.log(containsEvenNumber(numbers)); // Output: true

const oddNumbers = [1, 3, 5, 7];
console.log(containsEvenNumber(oddNumbers)); // Output: false

// every example
function allEvenNumbers(array: number[]): boolean {
  return array.every(element => element % 2 === 0);
}

const allEvens = [2, 4, 6, 8];
console.log(allEvenNumbers(allEvens)); // Output: true

const mixedNumbers = [1, 2, 3, 4];
console.log(allEvenNumbers(mixedNumbers)); // Output: false
```