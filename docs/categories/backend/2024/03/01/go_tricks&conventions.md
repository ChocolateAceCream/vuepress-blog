---
title: Go Tricks & Conventions
author: ChocolateAceCream
date: 2024/03/01 19:00
isTop: false
categories:
 - backend
tags:
 - Go
---

# Go Tricks & Conventions <Badge text="Go" type="warning" />

## Interface and function tricks

1. Use blank identifier when work in progress, for variable/function/import which is not used in the moment but may use in the future
```go
package main

import (
    "fmt"
    "io"
    "log"
    "os"
)

var _ = fmt.Printf // For debugging; delete when done.
var _ io.Reader    // For debugging; delete when done.

func main() {
    fd, err := os.Open("test.go")
    if err != nil {
        log.Fatal(err)
    }
    // TODO: use fd.
    _ = fd
}
```

2. Import for side effect. e.g.
```go
import _ "net/http/pprof"
```
the only use of this package is its init function, which  registers HTTP handlers that provide debugging information.
This form of import makes clear that the package is being imported for its side effects,

3.check a certain type satisfies an interface without actually using the variable.
```go
var _ json.Marshaler = (*RawMessage)(nil)
```

3. convert []int array into binary representation
usage:
since map key cannot be slice, when you have a slice and want to memorize which element has been used or not, you can convert it to binary representation with its used keys' index.
```go
// bits slice's elements are 0 or 1, stands for whether the index of origin slice element has been used or not.
func convert(bits []int) int{
    num := 0
    for _, v := range bits{
        num << 1
        num |= v
    }
    return num
}

```

## Map trick
1. use map as a map value
```go
m := map[int]map[int]bool{}
// use map[int]bool{} as m's value
```
***Caution:*** when assign new value to the map of value m, you have to init that map first
```go
if len(m[0][1]) == 0 {
  // empty map by default
  m[0][1] = map[int]bool{}
}
m[0][1] = true

// however, you can direct retrieve value of m[0][1], which return false, without init map
```

## Array tricks
an array variable denotes the entire array, not some pointer that point to the first element of array (like c).
This means when you assign or pass around an array value you will make a copy of its contents.
e.g.
copy an array means copy the entire content of that array
```go
//init an array
b := [2]string{"Penn", "Teller"}
//or
b := [...]string("a", "b")
```

## Slice tricks
capacity of slice: the maximum number of element a slice can hold without allocating more memory. If omit during init, then use length of slice as default val
```go
//init an slice
s := []int{1,2,3,4}
//or
len := 4 // length of slice
cap := 4 // capacity of slice.
s2 := make([]int, len, cap)

// omit cap, then use len as default cap val
s3 := make([]int, len)
fmt.Println(cap(s)) // omit cap, then use len as default cap val

```

### double the capacity of current slice
```go
s := make([]int, 4) // init cap of s is 4
t := make([]int, 4, len(s)*2) // double cap
number_of_element_copied := copy(t, s) // func copy(dst, src []T) int
fmt.Println(number_of_element_copied) // 4
s = t
fmt.Println(cap(s)) // 8
```

### convert array to slice:
```go
x := [3]int{1,2,3}
y := x[:]
fmt.Println(reflect.TypeOf(x)) // [3]int
fmt.Println(reflect.TypeOf(y)) // []int
```

### append to slice and control the slice cap increase
```go
func AppendByte(slice []byte, data ...byte) []byte {
    m := len(slice)
    n := m + len(data)
    if n > cap(slice) { // if necessary, reallocate
        // allocate double what's needed, for future growth.
        newSlice := make([]byte, (n+1)*2)
        copy(newSlice, slice)
        slice = newSlice
    }
    slice = slice[0:n]
    copy(slice[m:n], data)
    return slice
}
```

### General Filter function
```go
// Filter returns a new slice holding only
// the elements of s that satisfy fn()
func Filter(s []int, fn func(int) bool) []int {
    var p []int // == nil
    for _, v := range s {
        if fn(v) {
            p = append(p, v)
        }
    }
    return p
}
```

## Case study: memory leaks
as long as the slice is still used as a referenced by any other running codes, the slice will be stored in memory because GC cannot release the slice.

So, for example, if an []uint8 slice A return by ioutil.ReadFile contains the data of a whole article file, then you apply regex to this big slice and return the matched data in the other slice B. As long as B is still in use, the big A slice will be keep in memory, which consumes alot of memory.

```go
//original implementation:
var digitRegexp = regexp.MustCompile("[0-9]+")

func FindDigits(filename string) []byte {
    b, _ := ioutil.ReadFile(filename)
    return digitRegexp.Find(b)
}

//modified implementation:
func FindDigits(filename string) []byte {
    b, _ := ioutil.ReadFile(filename)
    b = digitRegexp.Find(b)
    new := make([]byte, len(b))
    copy(new, b)
    return new
}

```

***p.s*** filename string can be
- "example.txt" : an example.txt file from the current dir
- "/root/current/example.txt": an absolute path
- "folder/example.txt": folder is under current dir, then read example.txt from that folder.

## Pointer Usage Tricks
when using pointer of slice to get an element from that slice, you need to use (*pts)[i] syntax where *ptr is the pointer name and i is the index of element you want to retrieve.

## package naming convention
The package name is the base name of its source directory:
the package in src/encoding/base64 is imported as "encoding/base64" but has name base64, not encoding_base64 and not encodingBase64.

## setter and getter convention
For getter and setter function, getter function is just named after the field name, and setter function is Set+field name:
if you have a field named owner, then getter and setter will be like:
```go
owner := obj.Owner()
if owner != user {
  obj.SetOwner(user)
}
```

## Interface Naming convention
One-method interfaces are named by the method name plus an -er suffix: Reader, Writer, Formatter, CloseNotifier etc.

## switch convention
-  cases can be presented in comma-separated lists.
```go
func shouleEscape(c byte) bool {
  switch c {
  case ' ', '?', '=', '#':
    return true
  }
  return false
}
```

- The break keyword in Go is used to exit the nearest enclosing loop or switch statement, so if a switch is inside for loop, break will only break the switch and for loop continues

- Type switch: use the syntax of type assertion to find the type of target
```go
var t interface{}
t = functionOfSomeType()
switch t := t.(type) {
default:
    fmt.Printf("unexpected type %T\n", t)     // %T prints whatever type t has
case bool:
    fmt.Printf("boolean %t\n", t)             // t has type bool
case int:
    fmt.Printf("integer %d\n", t)             // t has type int
case *bool:
    fmt.Printf("pointer to boolean %t\n", *t) // t has type *bool
case *int:
    fmt.Printf("pointer to integer %d\n", *t) // t has type *int
}
```
***ps*** .(type) syntax can only be used in type switch



