---
title: Go 1.24 updates
author: ChocolateAceCream
date: 2025/02/15 19:00
isTop: false
categories:
 - backend
tags:
 - Go
---

# What's new in Go 1.24  <Badge text="Go" type="warning" />

Recently go1.24 is out, let's see what's new in Go 1.24

## Generic type aliases
A type alias can now be parameterized like a defined type
e.g.
```go
type List[T any] struct {
    Items []T
}
// Alias for better readability in different contexts
type IntList = List[int]
type StringList = List[string]

func main() {
    il := IntList{Items: []int{1, 2, 3}}
    sl := StringList{Items: []string{"A", "B", "C"}}

    PrintList(il) // [1, 2, 3]
    PrintList(sl) // ["A", "B", "C"]
}
```

### Why using it?
- Improves readability
As shown in previous code block, you created IntList and StringList, which is more readable than just using a List[T any]

- Eases migration: Backward compatibility
You can easily transform old non-generic type into a generic type without broking the code
e.g.
```go
// previous non-generic type
type OldBox  struct {
  Value int
}

// introducing a new generic type
type Box[T any] struct {
  Value T
}

// Fixed type alias, OldBox can be used directly, no need to use like this OldBox[int]
type OldBox = Box[int]

//Now your old code using OldBox won't be broken and for new code we can just use Box instead
```

- Reduces redundant wrapping: no duplicate types
Instead of defining duplicated types with same struct body (as different teams may want to use different names) like this
```go
type ErrorWrapper[T any] struct {
    Message string
    Data    T
}

// Another team creates a duplicate type with a different name
type APIErrorWrapper[T any] struct {
    Message string
    Data    T
}
```

Now we can just define a universal type and use type alias

```go
type ErrorWrapper[T any] struct {
    Message string
    Data    T
}

// APIError is still generic, when using, need to pass T like this
// apiErr := APIError[string]{Message: "Failed", Data: "Invalid request"} // ✅ Type must be specified

type APIError[T any] = ErrorWrapper[T]
```