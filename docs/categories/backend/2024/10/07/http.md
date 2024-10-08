---
title: http 1.1
author: ChocolateAceCream
date: 2024/10/07 19:00
isTop: false
categories:
 - backend
tags:
 - Go
---

# http 1.1 <Badge text="Go" type="warning" />
a simple http server and client call implement by go is like this
```go
package main

import (
	"fmt"
	"net"
	"net/http"
)

func main() {
	http.Handle("GET /test", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello"))
		w.Write([]byte(" World!"))
	}))
	go http.ListenAndServe(":8000", nil)

	conn, err := net.Dial("tcp", "localhost:8000")
	if err != nil {
		panic(err)
	}
	defer conn.Close()
	_, err = conn.Write([]byte("GET /test HTTP/1.1\r\nHost: localhost:8000\r\n\r\n"))
	if err != nil {
		panic(err)
	}
	buf := make([]byte, 1024)
	n, err := conn.Read(buf)
	if err != nil {
		panic(err)
	}
	fmt.Println(string(buf[:n]))
}

```

which output like this:

***
HTTP/1.1 200 OK
Date: Sun, 06 Oct 2024 14:51:13 GMT
Content-Length: 12
Content-Type: text/plain; charset=utf-8

Hello world!
***

***Several things to notice here***
1. if you want to set customized headers, you have to do it before and w.Write() is called.
e.g.
```go
w.Write([]byte("Hello"))
w.Header().Add("asdasd", "asdfasdf")
w.Write([]byte(" World!"))
```

wont work but
```go
w.Header().Add("asdasd", "asdfasdf")
w.Write([]byte("Hello"))
w.Write([]byte(" World!"))
```
is working

2. if the response is small enough to fit in one "chunking buffer", the length can be calculated and sent all at once. if the response length > buffer size(default 4kb, but you can define yourself), the response is sent in chunks and each chunk length is calculated before writing the chunk into response


3. if you want to add header after response body is written, you can use trailer header
```go
w.Header().Set("Trailer", "my-trailer")
w.Write([]byte("Hello"))
w.Write([]byte(" World!"))
w.Header().Add("my-trailer", "asdfasdf")
```
However, in Go's http handlers, adding trailers will also automatically make the response chunked even if it normally wouldn't be.