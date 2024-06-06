---
title: File IO in GO
author: ChocolateAceCream
date: 2024/06/01 19:00
isTop: false
categories:
 - backend
tags:
 - Go
---

# File IO in GO <Badge text="Go" type="warning" />

### ReadFile
read entire file into memory as byte slice, suitable for reading small files fast and easy
e.g.
```go
data, err := os.ReadFile("example.txt")
if err != nil {
  log.Fatal(err)
}

fmt.Println(string(data))
```
### os.Open
- only open the file for reading purpose.
open a file to read. return a *os.File object so you can call its read method to read certain length of file
```go
file, err := os.Open("sample.csv")
if err != nil {
  log.Fatal(err)
}
defer file.Close()


reader := csv.NewReader(file)
count := 0

// first line is header, so we deal it specially
header, err := reader.Read()
if err != nil {
  log.Fatal(err)
}
fmt.Println("header: ", header)
for {
  line, err := reader.Read()

  if err != nil {
    if err == io.EOF {
      break
    }
    log.Fatal(err)
  }
}
```

### os.OpenFile
Since os.Open can only open a file to read, when we want to write to a file, we use os.OpenFile
```go
os.OpenFile(filename, os.O_RDWR|os.O_CREATE, 0644)
```
- first param is filename
- second param & third param:  to indicate the file is opened under which flag. os.O_RDWR|os.O_CREATE means open the file with read and write, if file is not exist, then create the file with permission 0644


### CSV
if file is csv type, after open file to read/write, we can use csv lib to perform demand operations.
e.g. read csv
```go
reader := csv.NewReader(file) //file is  *os.File type returned by os.Open or os.OpenFile
for str,err := reader.Read(); err != io.EOF {
  fmt.Println(str)
}
//p.s. when read csv, first time it read the header, so don't forget to deal with it separately
```
e.g.2 write csv
```go
func InitFileData(file *os.File, RecordCount int) error {
	writer := csv.NewWriter(file)
	defer writer.Flush()
	header := []string{"ID", "Name", "Age", "Email", "Address"}
	if err := writer.Write(header); err != nil {
		return err
	}
	for i := 0; i < RecordCount; i++ {
		fake := faker.New()
		row := []string{strconv.Itoa(i), fake.Person().Name(), strconv.Itoa(fake.RandomNumber(40) + 10), fake.Person().Contact().Email, fake.Address().Address()}
		if err := writer.Write(row); err != nil {
			return err
		}
	}
	return nil
}

```

