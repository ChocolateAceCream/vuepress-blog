---
title: GO SDK
author: ChocolateAceCream
date: 2024/10/19 16:25
categories:
 - AWS
tags:
 - AWS
 - Go
 - S3
---

# GO SDK <Badge text="Go" type="warning" />
## install
To use go sdk with aws, first install dependency and certain service api clients (s3 here for example)
```bash
go get github.com/aws/aws-sdk-go-v2
go get github.com/aws/aws-sdk-go-v2/config
go get github.com/aws/aws-sdk-go-v2/service/s3
```

## setup credential
you can config aws credential using aws cli
> aws config

which will store access_key and secret in ~/.aws/config

Then your sdk will load the shared aws config from that dir

## Case study: generate presigned url to upload to s3 bucket
### Why?
avoid traffic through backend server. generate a presigned url so frontend can direct upload/download files from s3 and files will not traffic through server.

### How
1. frontend use upload button to read file info, pass the filename to backend so backend can generate a endpoint using filename and username. Ideally, use username/filename to define the hierarchy of the bucket. (even though bucket does not have folder concept, we can still use / to simulate the folder for better access control purpose)
2. use go sdk to create s3 client, then generate presigned url and send back to frontend
3. frontend send put request with the file to the pre-signed url.

P.S.1 enable CORS of bucket
P.S.2 remember to create the bucket in your aws default region. Since when generate presigned url, default config is used (so default region is taken into effect)
p.s.3 don't use session-id as part of the key since it may change frequently. A better approach is to generate a permanent "folder" name for each user to use the s3 bucket.
p.s.4 when upload to s3, the response is only a http 200.
p.s.5 the maximum size of single file upload to s3 using presigned url is 5GB. Use multipart presigned URLS for larger files