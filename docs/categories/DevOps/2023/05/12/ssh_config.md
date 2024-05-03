---
title: SSH config
author: ChocolateAceCream
date: 2023/05/12 19:00
isTop: false
categories:
 - DevOps
tags:
 - SSH
 - Linux
---

# SSH to remote server using ssh config <Badge text="SSH" type="warning" />

## Background
Use ssh config to save host infos, then use that info to ssh to host, avoiding entering password every time.

## Config
1. in local machine, generate pub key and private key
```bash
ssh-keygen -t rsa -b 4096 -C "your@email.com"
# enter file name test
```
this command will generate two files in ~/.ssh/ folder: test and test.pub. (one is private key and .pub is public key)

2. In remote machine, go to ~/.ssh folder, copy test.pub (public key) file to that folder
3. In remote machine, edit ssh config file /etc/ssh/sshd_config
add the following
```ini
PubkeyAuthentication yes
AuthorizedKeysFile  .ssh/test.pub
```

4. back to local .ssh folder, generate a new file named config and fill in the client machine info
```bash
# ~/.ssh/config
Host test_client
  HostName xxx.xx.xx.xx # ip of client machine
  User root # login name of client ssh client
  IdentityFile ~/.ssh/test # path to client private key
  StrictHostKeyChecking no # skip host check, automatically add host to known_hosts file
```

4. Now you can direct ssh to client machine from server machine using
```bash
ssh test_client
```

5. This also works on scp. e.g.
```bash
scp test_client:~/.ssh/test ./
# copy test file from client machine to server machine
```
