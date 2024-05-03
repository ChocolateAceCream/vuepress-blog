---
title: Linux set swap memory
author: ChocolateAceCream
date: 2023/04/14 19:00
isTop: false
categories:
 - backend
tags:
 - Linux
---

# Linux set swap memory <Badge text="Linux" type="warning" />

### Reason:
usually cloud server only have limited memory that run out easily, one solution is to set swap memory in linux server.

1. check if system already has swap
```bash
free -h
```
if there's any swap, remove swap so we can add new one
```bash
sudo swapoff /swapfile
sudo rm  /swapfile
```
2. create new swap
```bash
# 4g is the size of swapfile
sudo fallocate -l 4G /swapfile
```
3. assign swap
```bash
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo swapon --show
free -h
```
4. add to start up script, otherwise swap will lost after restart
```bash
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```
5. set swappiness (conditions to trigger swap)
```bash
# enable swap when memory used more than 90%, add to start up script
echo "vm.swappiness=10" >> /etc/sysctl.conf
# check if setting works
sysctl -p
```
