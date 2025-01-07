---
title: JSON in Go World
author: ChocolateAceCream
date: 2025/01/06 19:00
isTop: false
categories:
 - backend
tags:
 - Go
 - JSON
---

# Go JSON parsing: Marshal && Unmarshal <Badge text="Go" type="warning" />

## Overview
Go's encoding/json package has Marshal and Unmarshal function to deal with JSON format data.

## Marshal To JSON
#### Demo 1: General cases
```go
type student struct {
	Name string `json:"naame"`
	sex  int
	Age  int `json:"aggge"`
}

func demo() {
	s := student{
		Name: "zhangsan",
		sex:  1,
		Age:  18,
	}
	json_s, _ := json.Marshal(s)
	fmt.Println(string(json_s))
}
// Result: {"naame":"zhangsan","aggge":18}
```
We can notice that:
1. local field will be exclusive from json result
2. you can use `json:"new_field_name"` like syntax to rename field in result json
3. the marshal result is []byte, so you need to convert it to string when print out.

#### Demo2: function as field type
```go
type student struct {
	GetName func() string
}

func demo2() {
	s := student{
		GetName: func() string {
			return "zhangsan"
		},
	}
	json_s, err := json.Marshal(s)
	if err != nil {
		fmt.Println("json err:", err)
	}
	fmt.Println(string(json_s))
}
// Result: json err: json: unsupported type: func() string
```
The structure that contains function as field cannot be marshalled, result in errors
Similarly, channel, complex cannot be marshalled into JSON as well.

#### Demo3: Pointer as field type
```go
type student struct {
	Class *Class `json:"class"`
}

type Class struct {
	Name string `json:"class_name"`
}

func main() {
	s := student{
		Name: "zhangsan",
		sex:  1,
		Age:  18,
		Class: &Class{
			Name: "class1",
		},
	}
	json_s, err := json.Marshal(s)
	if err != nil {
		fmt.Println("json err:", err)
	}
	fmt.Println(string(json_s))
}
// Result: {"class":{"class_name":"class1"}}
```
We can see that when a field is pointer type, then when marshal it into JSON, go use the value that pointer point to as field value.

**P.S.** you can replace *Class with Class and get the same result. The reason to use pointer here is because pointer is faster.

**P.S.2** Sometime for convenience, we assign interface{} to certain field so it can hold any type of data
```go
type Stu struct {
    Name  interface{} `json:"name"`
    Age   interface{}
    HIgh  interface{}
    sex   interface{}
    Class interface{} `json:"class"`
}
```

#### Demo 4: Slice
```go
func main() {
	s := []int{1, 2, 3, 4, 5}
	json_s, err := json.Marshal(s)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(string(json_s))
}
Result: [1,2,3,4,5]
```
## Unmarshal to struct
Priority of matching:
1. matched tags (`json: xxx`)
2. matched field names (First try case sensitive, if no match, then try case insensitive). When first match happened, assign the value and jump to next field
3. If no matched,

p.s. for each field of JSON, it apply this matching sequence, so later field in JSON may override early matching.

e.g.
```go
type Person struct {
	Name string
	NAmE string
}

func Demo() {
	s := `{"Name":"Name","NAmE":"NAmE","name":"name"}`
	var p Person
	err := json.Unmarshal([]byte(s), &p)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(p)
}

// Result: {name NAmE}
```
Explain about what happened here:
1. first field of JSON 'Name' match the first field of Person struct 'Name', so it assign value to that Person struct field
2. 'NAmE' from JSON find a perfect match in Person struct, so its value is assigned to that field of person struct
3. 'name' from JSON is not matching any field of Person through a case sensitive scan. So retry the case insensitive scan and find the first field that matched from Person struct is 'Name', so it override the origin value of that field and reassign to 'name'

### Special case: interface{}
when a struct field is in interface{} type, unmarshal will parse it into map[string]interface{} by default.

However, if a struct contains multiple field with same json tag, then when a match happened, unmarshal will ignore any of them, start from Priority of matching rule #2. If still no match, raise error.

### json.RawMessage
In some special case where we want to keep the raw message ([]byte) for certain field so we can parse it later into certain struct, we use **json.RawMessage**
**p.s.** otherwise if we use interface{} as field type, then by default data will be convert to map[string]interface{}, which cannot be further  unmarshalled

e.g.
```go
type student struct {
	Class json.RawMessage `json:"class"`
}

type Class struct {
	Name string `json:"class_name"`
}

func main() {
	s := `{"class":{"class_name":"class1"}}`
	st := student{}
	err := json.Unmarshal([]byte(s), &st)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(st.Class)
	c := Class{}
	err = json.Unmarshal(st.Class, &c)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(c)
}
/*
Result:
[123 34 99 108 97 115 115 95 110 97 109 101 34 58 34 99 108 97 115 115 49 34 125]
{class1}
*/
```