---
title: Go embed pkg
author: ChocolateAceCream
date: 2023/06/07 19:00
isTop: false
categories:
 - backend
tags:
 - Go
 - embed
---


# Go embed pkg <Badge text="Go" type="warning" />
need go1.16+

### Purpose:
Read a file from host machine File System and convert the file to []byte object, so that object can be embedded into a JSON response and served through an API endpoint.

### Usage
```go
// main.go

// declare a variable outside the main function
// p.s.1 no space between // and go
// p.s.2 static is under same folder of main.go

//go:embed static/*.md
var f embed.FS

// then and file match that pattern will be detected by embed pkg, so you can be read the file and convert to a []byte stream

func main() {
  fileBytes, err := f.ReadFile("static/hello.md")
  fmt.Println("---fileBytes-----", fileBytes)
}
// p.s.3 cannot use ../ or absolute path in go:embed pattern match,
// since it's not allowed to visit parent dir for safety concern. So always try to define var in top dir
```

### traps
some dir might be ignored by embed by default:
.git, .svn, .bzr, .hg and and hidden files(start with . or _)

for example,
> //go:embed images

will not match any files inside images dir which start with . or _ , such as .a.png or _b.jpg

however,
> //go:embed images/*

will match .a.png and _b.jpg