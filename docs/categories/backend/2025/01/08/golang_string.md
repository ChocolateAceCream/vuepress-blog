---
title: strings pkg
author: ChocolateAceCream
date: 2025/01/08 19:00
isTop: false
categories:
 - backend
tags:
 - Go
 - strings
---

# Go strings pkg <Badge text="Go" type="warning" />
strings package is very useful when dealing with strings in golang world. In this blog I'm going to introduce some common used functions from strings package. Since strings package documentation are well-written, we only need to know that function exist, and then look up the documentation when using it in coding.

### func strings.Count(s string, substr string) int
count the number of non-overlapping instances of substr in s.
p.s. when substring is "", then result is len(s) + 1
> count := strings.Count(str, "")

### func strings.Split(s string, sep string) []string
Split slices s into all substrings separated by sep and returns a slice of the substrings between those separators.
> s := strings.Split(str, "")

### func strings.Repeat(s string, count int) string
Repeat returns a new string consisting of count copies of the string s.

It panics if count is negative or if the result of (len(s) * count) overflows.

```go
strings.Repeat("", 1) // still ""
strings.Repeat("a", 2) // "aa"
```

### func Compare(a string, b string) int
Compare returns an integer comparing two strings lexicographically. The result will be 0 if a == b, -1 if a < b, and +1 if a > b.

```go
// a function to find min rotate string format of given string
func rotation(s []byte) string {
    min := s
    for i := 0; i < len(s); i++ {
        tmp := append(s[i:],s[:i]...)
        if strings.Compare(string(tmp), string(min)) < 0 {
            min = tmp
        }
    }
    return string(min)
}
```