---
title: TS Module
author: ChocolateAceCream
date: 2024/05/13 19:00
isTop: false
categories:
 - frontend
tags:
 - TypeScript
 - React Native
 - Expo
 - WSL2
---

# React Native Beginner Guide <Badge text="React Native" type="warning" />

## Setup React Native in WSL2 with Expo
- pre-requirement:
1. install android studio in windows
2. install android sdk in windows
3. install node in wsl
4. install java in wsl

then you ready to go for the actual steps
##### point ANDROID_HOME to sdk location
in you .bashrc, add ANDROID_HOME that point to your windows sdk install dir
> export ANDROID_HOME='/mnt/d/android_sdk'

p.s.1 you need to change your adb.exe to adb in your sdk install location /mnt/d/android_sdk/platform-tools/
npx create-expo-app AwesomeProject

p.s.2 in order to debug expo app, wsl2 will launch a chrome browser, but since expo detect wsl2 as a windows setup, we need to modify the node_module/@expo to set expo to launch linux setup instead.
- search and modify the createLaunchBrowser in node_modules
> grep -nr createLaunchBrowser node_modules/

locate the file where this function shows and modify t he code
>    } else if (_os().default.platform() === "win32" || IS_WSL) {
        launchBrowser = new _launchBrowserImplWindows.default();
    } else if (_os().default.platform() === "linux" ) {
        launchBrowser = new _launchBrowserImplLinux.default();

to
>    } else if (_os().default.platform() === "win32" ) {
        launchBrowser = new _launchBrowserImplWindows.default();
    } else if (_os().default.platform() === "linux" || IS_WSL) {
        launchBrowser = new _launchBrowserImplLinux.default();

now expo will try to call google-chrome in bash shell. So we need to link google-chrome executable to windows' chrome install location
> mv /usr/bin/google-chrome /usr/bin/google-chrome_bk
sudo ln -s /mnt/c/'Program Files'/Google/Chrome/Application/chrome.exe /usr/bin/google-chrome

Now we can start project, but since expo host server default ip using wsl private ip, which cannot connected from windows, so we start app through a tunnel
```bash
cd AwesomeProject
npx expo start --tunnel
```