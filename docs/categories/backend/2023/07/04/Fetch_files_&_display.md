---
title: Fetch files and display
author: ChocolateAceCream
date: 2023/07/04 19:00
isTop: false
categories:
 - backend
tags:
 - Files
 - Go
 - JavaScript
---
# Fetch text file from backend and then display <Badge text="Go" type="warning" />


### Purpose:
Serve static file from golang backend then display file content in frontend vue3 page

```go
//go:embed static/*.md
var f embed.FS
func (a *Api) GetFile(file []byte) (file ) {
	fileBytes, err := f.ReadFile("file-path/filename.txt")
	file = response.File{
		File:    fileBytes,
	}
	return file
}
```

```js
const getDecode = (str) => {
  return decodeURIComponent(atob(str).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
}

const onFetchFile = async() => {
  try {
    const resp = await fetchFile()
    console.log('----res---', resp)
    const { data: res } = resp
    if (res.errorCode === 0) {
      const decStr = getDecode(res.data.file)
      // now decStr is string content
      console.log('----state.text---', decStr)
    }
  } catch (err) {
    console.log('-----form validation err-', err)
  }
}
```