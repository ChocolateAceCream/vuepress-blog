---
title: strings.Builder
author: ChocolateAceCream
date: 2024/05/11 19:00
isTop: false
categories:
 - backend
tags:
 - Go
---

# strings.Builder <Badge text="Go" type="warning" />
strings.Builder type is a part of the 'strings' package that is used to build strings from multiple pieces on a strings.Builder object.
Use case: construct a large string from many small pieces, as it significantly reduces memory allocation and copying overhead compared to naive string concatenation


### Methods of strings.Builder
Here are some of the key methods provided by strings.Builder:

- Write([]byte) (int, error): Appends the contents of a byte slice to the builder.
- WriteString(string) (int, error): Appends a string to the builder.
- WriteByte(byte) error: Appends a byte to the builder.
- String() string: Returns the accumulated string.
- Len() int: Returns the length of the accumulated string in the builder.
- Reset(): Resets the builder, clearing all content in the buffer.

e.g.
```go
func StringConcatenation() string {
	s := ""
	for i := 0; i < 100000; i++ {
		s += "data "
	}
	return s
}
```