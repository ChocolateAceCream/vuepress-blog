---
title: panic & recovery
author: ChocolateAceCream
date: 2024/10/09 19:00
isTop: false
categories:
 - backend
tags:
 - Go
---

# panic <Badge text="Go" type="warning" />
panic halts the normal flow of the program (current function's execution), then looking for recovery from deferred function stack (as defer stack is LIFO order), starts from current scope (current function). If no recovery function found, then panic will propagated to the higher scope, keep looking for recovery function from its defer stack. However, if recovery function found, then panic got recovery and higher scope won't be affected.

## Key Points:
- Propagation halts the execution of the current function and moves up the call stack.
- If no recover() is present in the scope, the panic will propagate until it terminates the program.
- once the recover() function is called, only the remaining deferred functions are executed, and the regular code in the function does not resume.

```go
func main() {
	defer func() {
		if r := recover(); r != nil {
			fmt.Println("Recovered from first panic:", r)
		}
	}()

	defer func() {
		if r := recover(); r != nil {
			fmt.Println("Recovered from second panic:", r)
			panic("second panic")
		}
	}()

	fmt.Println("Triggering first panic...")
	panic("First panic")
}
```

# os.Exit(1)
os.Exit() immediately terminates the program, exiting with a specific exit code. It does not run deferred functions and it stops the program abruptly

```go
os.Exit(0) // Program exits successfully.
os.Exit(1) // Program exits with an error (common exit code for errors).
```