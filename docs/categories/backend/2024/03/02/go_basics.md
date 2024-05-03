---
title: Go Basics
author: ChocolateAceCream
date: 2024/03/02 19:00
isTop: false
categories:
 - backend
tags:
 - Go
---

# Go Basics <Badge text="Go" type="warning" />

## Float64, +Inf, -Inf in Go
1. As a type, float64 in go has its upper boundary at math.MaxFloat64, exceeding that limit will result in overflow err.
2. +Inf represent a number that greater than any infinite numbers.
3. +Inf, -Inf can be used as a map key of type float64 or float32 or float, depends on how you come up with the Inf (e.g. float64 1.0 / float64 0 will result in a +Inf of type float64.)
***P.S only works on go1.18 and later***
4. Unlike float64, integer divide by zero will raise error

## String method in Go

1. split a string by given char
```go
s:="a.b.c.d"
result := strings.Split(s, ".")
// result: []string{"a","b","c","d"}
```

2. convert string to int
```go
s :="000123"
n,err := strconv.Atoi(s)
// n: 123
```

3. split by regex
```go
pattern := "[. ,]+"
re := regexp.MustCompile(pattern)
s :="a.b.c.d"
r := re.Split(s, -1)
// r is []string{"a","b","c","d"}
// if the second argument of Split() is negative, it will make  all possible splits. if it's 0, then no split will be made. if it's bigger than 0, then it will split s into n pieces (start from the beginning of the s).
```

4. convert a number to any number based string
```go
num:=64
bits := strconv.FormatUint(uint(num), 16) // convert number to a  based 16 number, then return the result as a string
fmt.Println(bits) //a6
num = 4
bits := strconv.FormatUint(uint(4), 2) // convert number to a   based 2 number, then return the result as a string
fmt.Println(bits) //100
```

5. func strconv.ParseUint(curString string, c, t int) uint64
Given a string input of c based, convert it to t based uint64 number then return the result
```go
num := 4
bits := strconv.FormatUint(uint64(num), 2)
fmt.Println(bits)                 //100
fmt.Println(reflect.TypeOf(bits)) //string
b, _ := strconv.ParseUint(bits, 2, 10) // convert based 2 string 100 to base 10 uint 4
fmt.Println(b) //4, of tyoe uint64
```

6. convert unicode char to the actual string representation of its unicode
```go
char := '干'
unicodeRep := fmt.Sprintf("%U", char)
fmt.Println(unicodeRep) //U+5E72
fmt.Printf("%#U",char) //U+5E72 '干'. The # will adds additional formatting and escape sequences to the string
```

7. printout type of variable
```go
v := 123
fmt.Printf("Type is: %T", v) //int

v2 := true
fmt.Printf("Type is: %t", v2) //print the bool representation of v2, which is true

v3 := 123
fmt.Printf("Type is: %d", v3) //print the decimal representation of v2, which is 123

```

## Bit operation in Go
- & (AND): performs a bitwise AND operation between two integers and returns the result.
- | (OR): performs a bitwise OR operation between two integers and returns the result.
- ^ (XOR): performs a bitwise XOR operation between two integers and returns the result.
- << (left shift): shifts the bits of an integer to the left by a specified number of positions and returns the result.
- \>> (right shift): shifts the bits of an integer to the right by a specified number of positions and returns the result.

e.g.
```go
a := 0b10010 //int representation of a binary number, holding int value 27
b := 0b11011
fmt.Println(reflect.TypeOf(a)) //int
fmt.Println(b)                 //27, as the int value of that binary number
fmt.Printf("a:  \t%08b\n", a)
fmt.Printf("b:  \t%08b\n", b)
// %b: print the binary format of b: 11011
// %8b: the length should be 8, if len(b) < 8, using ' ' as padding value to fullfil the length:    11011
// %08b: fullfil the length with 0: 00011011
fmt.Printf("a|b:\t%08b\n", a|b)
fmt.Printf("a&b:\t%08b\n", a&b)
fmt.Printf("a>>2:\t%08b\n", a>>2)
fmt.Printf("a<<2:\t%08b\n", a<<2)
// a >>= 1
c := a & 1
fmt.Printf("a:%v\n", c)
```

## File IO
### os.Open
```go
f, err := os.Open("Arrays_Slice/Demo.go")
if err != nil {
  fmt.Println("err open the file:", err)
  return
}
defer f.Close()
```

### file reader:
func (*os.File).Read(b []byte) (n int, err error)
usage:
```go
content := make([]byte, 100, 100)
count, err := f.Read(content)
if err != nil {
  fmt.Println("open read err: ", err)
}
fmt.Println("count: ", count)
fmt.Println("content: ", string(content))
for count >= 100 {
  count, err = f.Read(content)
  if err != nil {
    fmt.Println("open read err: ", err)
    break
  }
  fmt.Println("---------count---------", count)
  fmt.Println("content: ", string(content))
}
```
***ps*** everytime f.Read() is called, it read the []byte from file, and next time it continues to read from the previous stop point.

### defer
Deferring a call to a function such as CLose has two advantages:
1. guarantees the file is closed
2. the statement can be as closed as the f.Open().

Caution using defer:
1. defer is like a stack, call sequence is first in last out.
2. if you defer a function, then the argument to that function is evaluated immediately, only the function execution is deferred, in LIFO order.
```go
func trace(s string) string {
    fmt.Println("entering:", s)
    return s
}

func un(s string) {
    fmt.Println("leaving:", s)
}

func a() {
    defer un(trace("a"))
    fmt.Println("in a")
}

func b() {
    defer un(trace("b"))
    fmt.Println("in b")
    a()
}

func main() {
    b()
}
/*
this will print out
entering: b
in b
entering: a
in a
leaving: a
leaving: b
*/
```

### Data

##### new
new(T) return a pointer to a newly allocated zero value of type T. So if the zero value of type T can directly in use, such as bytes.Buffer (which states that "the zero value for Buffer is an empty buffer ready to use"), then you don't really need to provide a constructor or Init method.
***ps*** remember new will always return a pointer.
```go
	a := new(int)
	fmt.Println(reflect.TypeOf(a)) //*int
	var b int
	fmt.Println(reflect.TypeOf(b)) //int
```

### Composite Literals
```go
a := [...]string   {Enone: "no error", Eio: "Eio", Einval: "invalid argument"}
s := []string      {Enone: "no error", Eio: "Eio", Einval: "invalid argument"}
m := map[int]string{Enone: "no error", Eio: "Eio", Einval: "invalid argument"}
```

as long as Enone, Eio, and Einval are distinct, it's valid.

the other use case if constructor function
```go
type Person struct {
	Name  string
	Age   int
	Email string
}

func NewPerson(name, address string, age int) *Person {
	return &Person{name, age, address}
}
```
***ps*** the order of fields matters, the input order should follow the order in the structure.
***ps*** make can only be applied to maps, slices and channels and does not return a pointer.


## Concurrency

***Do not communicate by sharing memory; instead, share memory by communicating.***

### Goroutines
Goroutines are multiplexed onto multiple OS threads so if one should block, such as while waiting for I/O, others continue to run.
e.g.
```go
func main() {
	for i := 0; i < 5; i++ {
		fmt.Println("outside routine", i)
		go func(i int) {
			fmt.Println(i)
		}(i)
	}
}
```
the output could be
>outside routine 0
outside routine 1
outside routine 2
outside routine 3
outside routine 4
1
0

the go func(i int)  might be running 0 or 1,2,3,4 times, since the whole program exit when finished.

**caution** when using goroutine with for loop, keep in mind that the loop variable is resued for each iteration.
```go
func main() {
	for i := 0; i < 10; i++ {
		go func() {
			fmt.Println(i)
		}()
	}
	time.Sleep(5)
	fmt.Println("end")
}
// will always print 10 since i is shared between each goroutine
```

### channel
process queue implementation using channel:
```go
const MAX_NUMBER_OF_THREAD = 5
var pool = make(chan int, MAX_NUMBER_OF_THREAD)
func Serve(queue chan *Request) {
  for req := range queue{
    pool <- 1
    req := req
    go func(r *Request) {
      process(r)
      <-pool
    }(req)
  }
}

// or the other way around
func handle(queue chan *Request) {
  for req := range queue{
    process(req)
  }
}

func Serve(clientRequests chan *Request) {
  for i:=0; i<MAX_NUMBER_OF_THREAD; i++{
    go handle(clientRequests)
  }
}
```

### NumCPU && GOMAXPROCS
```go
// retrieve the number of hardware cpu cores in the machine
var numCPU = runtime.NumCPU()

//retrieve the number of max number of cores can be used by go program can have running simultaneously
var numCPU = runtime.GOMAXPROCS(0)
```


### channel tricks
1. one advantage of using for range loop to read from channel is that for range loop runs until channel is drained.

## Interface and function

### Pointer Method VS. Value Method

1. Value method can be invoked on pointer or value, but pointer method can only be invoked on pointer.
e.g.
```go
type Number []int

func main() {
	var n Number
	n = []int{1, 2, 2, 3, 34, 5, 6, 5, 7}
	count := n.Delete(5)
	fmt.Println(n, count)
	b := &n
	count = b.Delete(2)
	fmt.Println(b, count)
}

func (p Number) Delete(a int) (n int) {
	n = 0
	for i, v := range p {
		if v == a {
			n++
		} else {
			p[i-n] = v
		}
	}
	fmt.Println("p: ", p)
	p = p[0 : len(p)-n]
	fmt.Println("p: ", p)
	return n
}
```

2. as seen in above example, I use value receiver p Number, which indeed is of type []int. That's why the result is not as expected. Since I passed the p as a value and p is a slice, only p[i-n] = v statement modified the original p (since p is a slice indeed). p = p[0 : len(p)-n] statement actually not modify the original p. In order to make it work, should use pointer receiver.
```go
func (p *Number) Delete(a int) (n int) {
	n = 0
	for i, v := range *p {
		if v == a {
			n++
		} else {
			(*p)[i-n] = v
		}
	}
	*p = (*p)[0 : len(*p)-n]
	return n
}

```

```go
// value as receiver method example:
// this
func (slice ByteSlice) Append(data []byte) []byte {
    // Body exactly the same as the Append function defined above.
}

//pointer as receiver method example
func (p *ByteSlice) Append(data []byte) {
    slice := *p
    // Body as above, without the return, since pointer method can override the pointer receiver p
    *p = slice
}
```


###  We can define a method for any type except pointers and interfaces

which means we can define a method for a function

```go
type handleFunc function(int) int

```