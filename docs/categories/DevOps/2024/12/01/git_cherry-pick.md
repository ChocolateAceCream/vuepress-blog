---
title: Git cherry-pick
author: ChocolateAceCream
date: 2024/12/01 19:50
isTop: false
categories:
 - DevOps
tags:
 - Git
---

# Git cherry-pick <Badge text="Git" type="warning" />
Use case: grab one or multiple commits from other branch.

### commands
1. cherry pick a single commit:
```bash
git cherry-pick <commit-hash>
```



2. by default, using range cherry-pick will not include its beginning commit
e.g. this only pick commit 2 & 3
```bash
git cherry-pick <commit-hash1>..<commit-hash-3>
```

3. grab multiple commit from [1,3]
so if you want to include the beginning commit, use ***^***
```bash
git cherry-pick <commit-hash1>^..<commit-hash-3>
```

4. when cherry-pick multiple commits, must pick  commits in order of the commit time.
```bash
git cherry-pick <commit-hash1> <commit-hash-3> <commit-hash-5>
# cannot do 5, 3, 1
```

5. By default, cherry-pick will create new commits for each picked commit,
e.g.
```bash
git cherry-pick <commit-hash1> <commit-hash-3> <commit-hash-5>
# will create 3 commits for 1,3,5
```
If you want to avoid that, you can use -n flag
```bash
git cherry-pick -n <commit-hash1> <commit-hash-3> <commit-hash-5>
# will create 3 commits for 1,3,5
```
which will pause all commit after pick, so you need to do it yourself after the cherry-pick.
