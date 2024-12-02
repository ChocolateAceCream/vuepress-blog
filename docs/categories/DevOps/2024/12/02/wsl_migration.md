---
title: WSL Migration
author: ChocolateAceCream
date: 2024/12/02 9:50
isTop: false
categories:
 - DevOps
tags:
 - Git
 - WSL
---

# WSL Migration  <Badge text="WSL" type="warning" />
I have been using wsl for years, and that's why I'm not a windows hater anymore. They actually did great on making linux available on windows.
## WHY?
Years ago, like many other apps, wsl can only be installed on the system drive(that's why C drive is so easy to fullfil). Today when I backup my wsl, I found out its size is reaching 60GB! OMG! and my C drive is only have 50GB space left. So I dig a little about how to migrate wsl to other drive and now microsoft enable wsl to be installed on any drive. So, let's do it!
## HOW?
The whole process is not that complicated, just backup and then import the backup, you done!
1. list wsl dist
```wsl -l```
2. check wsl version
```wsl --version```
3. start/stop wsl
```bash
# start wsl
wsl --distribution Ubuntu-22.xx.xx
# or
wsl -d Ubuntu-22.xx.xx

# check running wsl
wsl -l --running

# stop wsl
wsl -t Ubuntu-22.xx.xx
# or
wsl --terminate Ubuntu-22.xx.xx
```

4. export current wsl distribution(must stop it first)
```wsl --export Ubuntu-22.xx.xx c:\temp\Ubuntu.22.xx.xx.tar```

5. delete old dist (optional)
```wsl --unregister Ubuntu-22.xx.xx```

6. import backups into new drive e:\wsl\ubuntu
```wsl --import Ubuntu-22.04-20241201 e:\wsl\ubuntu  f:\wsl-backup\Ubuntu-22.04.tar --version 2```

7. set default wsl
```wsl --set-default Ubuntu-22.xx.xx```
